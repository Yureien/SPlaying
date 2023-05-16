import { IRequest } from "itty-router";
import { error, missing } from "itty-router-extras";

import Env from "../env";

export async function validateToken(req: IRequest, env: Env) {
  const { token } = req.params;

  if (!token) return error(400, "Please supply GET parameter: token");

  let jsonData = await env.TOKENS.get(token);
  if (jsonData === null) return missing("Token not found");
  let data = JSON.parse(jsonData);

  const currentTime = new Date().getTime();

  if (!data.expires_at || data.expires_at < currentTime) {
    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: data.refresh_token,
    });
    const authCode = btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`);
    const response: any = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${authCode}`,
      },
      body: body.toString(),
    }).then((resp) => resp.json());

    if (response.error !== undefined)
      return error(403, {
        message: "Could not refresh token",
        error: response.error,
      });

    data = {
      ...data,
      ...response,
      expires_at: currentTime + response.expires_in * 1000,
    };

    await env.TOKENS.put(token, JSON.stringify(data));
  }
  
  req.data = data;
}
