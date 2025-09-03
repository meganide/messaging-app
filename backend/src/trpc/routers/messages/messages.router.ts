import { on } from "events";
import { protectedProcedure, router } from "../../trpc";
import {
  createNewThreadSchema,
  listMessagesByThreadIdSchema,
  onNewMessageSchema,
  sendMessageSchema,
} from "./messages.types";
import { messageService, messageEventEmitter } from "./service/message.service";
import { tracked } from "@trpc/server";
import { z } from "zod";

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
  onNewMessage: protectedProcedure
    .input(onNewMessageSchema)
    .subscription(async function* (opts) {
      const { threadId } = opts.input;
      const userId = opts.ctx.user.id;

      const threads = await messageService.listThreads(userId);

      try {
        for await (const [eventData] of on(messageEventEmitter, "newMessage", {
          signal: opts.signal,
        })) {
          const message = eventData as any;

          if (message.threadId === threadId) {
            yield tracked(message.id.toString(), {
              ...message,
              type: "message",
            });
          }
        }
      } catch (error) {
        console.error("Subscription error:", error);
        throw error;
      }
    }),
});
