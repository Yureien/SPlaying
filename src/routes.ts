import type { Request } from "@cloudflare/workers-types";
import { Router, IRequest } from "itty-router";
import Env from "./env";
import { generateUserToken } from "./utils";
import apiHandler from "./api";

const router = Router();

router.all("/api/*", apiHandler);

router.get("/", async () => {
  return Response.redirect("https://github.com/Yureien/SPlaying", 301);
});

router.get("/register", async (req: IRequest, env: Env) => {
  const params = new URLSearchParams({
    client_id: env.SPOTIFY_CLIENT_ID,
    response_type: "code",
    redirect_uri: `${env.URL}/callback`,
    scope: "user-read-currently-playing user-top-read",
  });
  const oAuthURL = `https://accounts.spotify.com/authorize?${params}`;

  return new Response(`Click here to register: <a href="${oAuthURL}">${oAuthURL}</a>`, {
    status: 200,
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  });
});

// Combine with Request type to get the request headers
// @ts-expect-error eslint-disable-line @typescript-eslint/ban-ts-comment
router.get("/callback", async (req: IRequest & Request, env: Env) => {
  if (req.query.error || !req.query.code) {
    return new Response(`Could not register. Error: ${req.query.error}`, {
      status: 403,
      headers: {
        "content-type": "text/plain;charset=UTF-8",
      },
    });
  }

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    redirect_uri: `${env.URL}/callback`,
    code: req.query.code as string,
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
    return new Response(`Could not register. Error: ${response.error}`, {
      status: 403,
      headers: {
        "content-type": "text/plain;charset=UTF-8",
      },
    });

  const token = generateUserToken();
  const clientIP = req.headers.get("x-lookup-ip") || req.headers.get("CF-Connecting-IP");
  const currentTime = new Date().getTime();

  const data = {
    ...response,
    client_ip: clientIP,
    expires_at: currentTime + response.expires_in * 1000,
  };

  await env.TOKENS.put(token, JSON.stringify(data));

  return new Response(
    `Your account has been registered! Your user ID is <b>${token}</b>
    <br><br>
    <b>Please keep this safe as it cannot be obtained again!</b>
    <br><br>
    Now Playing API: <a href="${env.URL}/api/np/${token}">${env.URL}/api/np/${token}</a>
    <br>
    Top Tracks API: <a href="${env.URL}/api/top/${token}?type=tracks">${env.URL}/api/top/${token}?type=tracks</a>
    <br>
    Top Artists API: <a href="${env.URL}/api/top/${token}?type=artists">${env.URL}/api/top/${token}?type=artists</a>`,
    {
      status: 200,
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    }
  );
});

router.get("/*", async () => new Response("Not found", { status: 404 }));

export default router;
