import { IRequest } from "itty-router";
import { error, json } from "itty-router-extras";

async function nowPlaying(req: IRequest) {
  let apiResp = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: { Authorization: `Bearer ${req.data.access_token}` },
  });
  let data: any = await apiResp.json();
  if (apiResp.status !== 200) return error(apiResp.status, data?.error?.message);

  let response: any;

  if (data === null) {
    response = { spotify_running: false };
    return json(response);
  }

  const { is_playing, timestamp, progress_ms, currently_playing_type, item } = data;

  response = {
    spotify_running: true,
    is_playing,
    timestamp,
    progress_ms,
    currently_playing_type,
  };

  if (req.query.full === "true") {
    response.item = item;
    return json(response);
  }

  if (currently_playing_type === "track") {
    response.item = {
      id: item.id,
      name: item.name,
      is_local: item.is_local,
      link: item.external_urls.spotify,
      duration_ms: item.duration_ms,
      explicit: item.explicit,
      album: {
        id: item.album.id,
        name: item.album.name,
        type: item.album.album_type,
        images: item.album.images,
        link: item.album.external_urls.spotify,
        total_tracks: item.album.total_tracks,
        release_date: item.album.release_date,
      },
      artists: item.artists.map((artist: any) => ({
        id: artist.id,
        name: artist.name,
        link: artist.external_urls.spotify,
        images: artist.images,
      })),
    };
  } else {
    response.item = item;
  }

  return json(response);
}

export default nowPlaying;
