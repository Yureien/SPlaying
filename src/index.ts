import router from "./routes";
import Env from "./env";

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    return await router.handle(request, env);
  },
};
