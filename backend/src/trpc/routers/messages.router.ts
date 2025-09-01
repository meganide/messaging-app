import { publicProcedure, router } from "../trpc";

export const messageRouter = router({
    list: publicProcedure.query(() => {
        return { message: "hello" }
    }),
});
  