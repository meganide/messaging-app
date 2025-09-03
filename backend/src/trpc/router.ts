import { router } from "./trpc";
import { messageRouter } from "./routers/messages/messages.router";
import { authRouter } from "./routers/auth/auth.router";

export const appRouter = router({
  auth: authRouter,
  message: messageRouter,
});

export type AppRouter = typeof appRouter;
