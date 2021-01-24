# SPlaying
SPlaying: Spotify now Playing, get your current playing song easily!

**API URL:** [splaying.sohamsen.workers.dev](https://splaying.sohamsen.workers.dev) (Yes, the homepage will just redirect to here)

## Registration

Go to [registration page](https://splaying.sohamsen.workers.dev/register/) and login with your Spotify OAuth.

**Remember to save the user ID you get during registration since there is no way to get it back if lost!**

## Usage

```
GET https://splaying.sohamsen.workers.dev/np/?uid=<UID GENERATED IN LAST STEP>
```

Example output:
```json
{
  "spotify_running": true,
  "timestamp": 1611507165310,
  "progress_ms": 179278,
  "is_playing": true,
  "item": {
    "album": {
      "album_type": "album",
      "artists": [
        {
          "external_urls": {
            "spotify": "https://open.spotify.com/artist/6XyY86QOPPrYVGvF9ch6wz"
          },
          "href": "https://api.spotify.com/v1/artists/6XyY86QOPPrYVGvF9ch6wz",
          "id": "6XyY86QOPPrYVGvF9ch6wz",
          "name": "Linkin Park",
          "type": "artist",
          "uri": "spotify:artist:6XyY86QOPPrYVGvF9ch6wz"
        }
      ],
      "external_urls": {
        "spotify": "https://open.spotify.com/album/5Eevxp2BCbWq25ZdiXRwYd"
      },
      "href": "https://api.spotify.com/v1/albums/5Eevxp2BCbWq25ZdiXRwYd",
      "id": "5Eevxp2BCbWq25ZdiXRwYd",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/ab67616d0000b273145e1cf12538f5666511237d",
          "width": 640
        },
        {
          "height": 300,
          "url": "https://i.scdn.co/image/ab67616d00001e02145e1cf12538f5666511237d",
          "width": 300
        },
        {
          "height": 64,
          "url": "https://i.scdn.co/image/ab67616d00004851145e1cf12538f5666511237d",
          "width": 64
        }
      ],
      "name": "One More Light",
      "release_date": "2017-05-19",
      "release_date_precision": "day",
      "total_tracks": 10,
      "type": "album",
      "uri": "spotify:album:5Eevxp2BCbWq25ZdiXRwYd"
    },
    "artists": [
      {
        "external_urls": {
          "spotify": "https://open.spotify.com/artist/6XyY86QOPPrYVGvF9ch6wz"
        },
        "href": "https://api.spotify.com/v1/artists/6XyY86QOPPrYVGvF9ch6wz",
        "id": "6XyY86QOPPrYVGvF9ch6wz",
        "name": "Linkin Park",
        "type": "artist",
        "uri": "spotify:artist:6XyY86QOPPrYVGvF9ch6wz"
      }
    ],
    "disc_number": 1,
    "duration_ms": 217066,
    "explicit": false,
    "external_ids": {
      "isrc": "USWB11700224"
    },
    "external_urls": {
      "spotify": "https://open.spotify.com/track/1KvyBpAxgllKW7bQb0GYCR"
    },
    "href": "https://api.spotify.com/v1/tracks/1KvyBpAxgllKW7bQb0GYCR",
    "id": "1KvyBpAxgllKW7bQb0GYCR",
    "is_local": false,
    "is_playable": true,
    "name": "Halfway Right",
    "popularity": 55,
    "preview_url": "https://p.scdn.co/mp3-preview/780aca82ee9a9152fbd1a2c7f6a78bb2b2aef7ef?cid=9d1c097cd6db4d9984cfea4b72e8e4ee",
    "track_number": 8,
    "type": "track",
    "uri": "spotify:track:1KvyBpAxgllKW7bQb0GYCR"
  }
}
```

Returns `{"spotify_running": true}` if nothing is being played.

## Example Usage

Shameless self promotion of my site: [sohamsen.me](https://sohamsen.me/)

## Why?

Why not?

---

Thanks to [Aadi Bajpai's University Worker](https://github.com/aadibajpai/university) which made me think "why not make a useless but cool looking thingie using cloudflare workers too?"`
