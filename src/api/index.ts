import { RequestLike, Router } from "itty-router";

import { validateToken } from "./middlewares";
import nowPlaying from "./nowplaying";
import top from "./top";

const router = Router({
  base: "/api",
});

router.get("/nowplaying/:token", validateToken, nowPlaying);
router.get("/top/:token", validateToken, top);

// Manually add CORS headers
export default (request: RequestLike, ...extra: any) =>
  router
    .handle(request, ...extra)
    .then((response) => {
      if (!response.headers.has("Content-Type")) {
        response.headers.set("Content-Type", "application/json;charset=UTF-8");
      }
      if (!response.headers.has("Access-Control-Allow-Methods")) {
        response.headers.set("Access-Control-Allow-Methods", "GET");
      }
      response.headers.set("Access-Control-Allow-Origin", "*");
      response.headers.set("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Origin");
      return response;
    })
    .catch((err) => {
      console.error(err);
    });
