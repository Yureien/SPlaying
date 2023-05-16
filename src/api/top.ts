import { IRequest } from "itty-router";
import { error, json } from "itty-router-extras";

async function top(req: IRequest) {
  const type = req.query.type as string | undefined;
  let { limit: _limit, offset: _offset, time_range, full } = req.query;
  let limit = _limit ? parseInt(_limit as string) : 20;
  let offset = _offset ? parseInt(_offset as string) : 0;
  limit = Math.max(1, Math.min(50, limit ? limit : 20));
  offset = Math.max(0, offset ? offset : 0);
  time_range = time_range ? (time_range as string) : "medium_term";

  if (!type) return error(400, "Please supply GET parameter: type");
  if (!["artists", "tracks"].includes(type)) return error(400, "Please supply a valid type: artists or tracks");

  if (!["long_term", "medium_term", "short_term"].includes(time_range as string))
    return error(400, "Please supply a valid time_range: long_term, medium_term or short_term");

  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
    time_range: time_range,
  });

  let apiResp = await fetch(`https://api.spotify.com/v1/me/top/${type}?${params}`, {
    headers: { Authorization: `Bearer ${req.data.access_token}` },
  });
  let data: any = await apiResp.json();
  if (apiResp.status !== 200) return error(apiResp.status, data?.error?.message);

  const { items, limit: response_limit, offset: response_offset, total } = data;

  let response: any = {
    limit: response_limit,
    offset: response_offset,
    total: total,
  };

  if (full === "true") {
    response.items = items;
    return json(response);
  }

  if (type === "artists") {
    response.items = items.map((artist: any) => ({
      id: artist.id,
      name: artist.name,
      link: artist.external_urls.spotify,
      images: artist.images,
      genres: artist.genres,
      popularity: artist.popularity,
    }));
  } else if (type === "tracks") {
    response.items = items.map((track: any) => ({
      id: track.id,
      name: track.name,
      is_local: track.is_local,
      link: track.external_urls.spotify,
      duration_ms: track.duration_ms,
      explicit: track.explicit,
      popularity: track.popularity,
      preview_url: track.preview_url,
      album: {
        id: track.album.id,
        name: track.album.name,
        type: track.album.album_type,
        images: track.album.images,
        link: track.album.external_urls.spotify,
        total_tracks: track.album.total_tracks,
        release_date: track.album.release_date,
      },
      artists: track.artists.map((artist: any) => ({
        id: artist.id,
        name: artist.name,
        link: artist.external_urls.spotify,
      })),
    }));
  }

  return json(response);
}

export default top;
