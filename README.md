# SPlaying
SPlaying: Spotify now Playing, get your current playing song easily!

New feature: Get your top artists or tracks too!

**API URL:** [splaying.sohamsen.workers.dev](https://splaying.sohamsen.workers.dev) (Yes, the homepage will just redirect to here)

## Registration

Go to [registration page](https://splaying.sohamsen.workers.dev/register) and login with your Spotify OAuth.

**Remember to save the user ID you get during registration since there is no way to get it back if lost!**
I don't save any identifying information (except IP address, for blocking spam).

## API Reference

To get the response format, either check the code or just try it out. It's too big to neatly fit in here.

### Get Current Playing Song

**URL:** `/api/nowplaying/<token>`

`<token>` is the token you got during registration.

**Method:** `GET`

**URL Params:**

| Parameter | Description | Required | Allowed Values |
| --- | --- | --- | --- |
| `full` | Whether to return the full response (as obtained from Spotify, excluding some privacy-violating information) or a shortened version | No | `false` (default), `true` |

### Get Top Artists or Tracks

**URL:** `/api/top/<token>`

`<token>` is the token you got during registration.

**Method:** `GET`

**URL Params:**

| Parameter | Description | Required | Allowed Values |
| --- | --- | --- | --- |
| `type` | Whether to return the top artists or tracks | Yes | `artists`, `tracks` |
| `full` | Whether to return the full response (as obtained from Spotify, excluding some privacy-violating information) or a shortened version | No | `false` (default), `true` |
| `limit` | Number of results to return | No | Any integer between 1 and 50 (default: 20) |
| `time_range` | Time range for the results | No | `long_term`, `medium_term` (default), `short_term` |
| `offset` | Index of the first result to return | No | Any integer >= 0 (default: 0) |

## Live Example

Shameless self promotion of my site: [sohamsen.me](https://sohamsen.me/)

## Why?

Why not?

---

Thanks to [Aadi Bajpai's University Worker](https://github.com/aadibajpai/university) which made me think "why not make a useless but cool looking thingie using cloudflare workers too?"`
