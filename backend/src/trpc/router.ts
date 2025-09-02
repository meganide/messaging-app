import { router } from "./trpc";
import { messageRouter } from "./routers/messages/messages.router";
import { authRouter } from "./routers/auth/auth.router";

export const appRouter = router({
    message: messageRouter,
    auth: authRouter,
  });
  
export type AppRouter = typeof appRouter;