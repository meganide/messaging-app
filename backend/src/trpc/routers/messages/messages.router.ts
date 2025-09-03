import { protectedProcedure, router } from "../../trpc";
import {
  createNewThreadSchema,
  listMessagesByThreadIdSchema,
  sendMessageSchema,
} from "./messages.types";
import { messageService } from "./service/message.service";

export const messageRouter = router({
  send: protectedProcedure
    .input(sendMessageSchema)
    .mutation(async ({ input, ctx }) => {
      return await messageService.send(input, ctx.user.id);
    }),
  listThreads: protectedProcedure.query(async ({ ctx }) => {
    return await messageService.listThreads(ctx.user.id);
  }),
  listByThreadId: protectedProcedure
    .input(listMessagesByThreadIdSchema)
    .query(async ({ input }) => {
      return await messageService.listByThreadId(input);
    }),
  createNewThread: protectedProcedure
    .input(createNewThreadSchema)
    .mutation(async ({ input, ctx }) => {
      return await messageService.createNewThread(input, ctx.user.id);
    }),
});
