import { router } from "./trpc";
import { messageRouter } from "./routers/messages.router";

export const appRouter = router({
    message: messageRouter,
  });
  
export type AppRouter = typeof appRouter;