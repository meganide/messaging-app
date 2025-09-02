import { protectedProcedure,  router } from "../../trpc";
import { listMessagesByThreadIdSchema, sendMessageSchema } from "./messages.types";
import { messageService } from "./service/message.service";

export const messageRouter = router({
    send: protectedProcedure.input(sendMessageSchema)
    .mutation(async ({ input, ctx }) => {
        return await messageService.send(input, ctx.user.id);
    }),
    listByThreadId: protectedProcedure.input(listMessagesByThreadIdSchema)
    .query(async ({ input }) => {
        return await messageService.listByThreadId(input);
    }),
});
  