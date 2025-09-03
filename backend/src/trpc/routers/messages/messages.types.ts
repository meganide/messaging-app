import { z } from "zod";

export const sendMessageSchema = z.object({
  content: z
    .string()
    .min(1, "Message cannot be empty")
    .max(1000, "Message too long"),
  threadId: z.number(),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;

export const listMessagesByThreadIdSchema = z.object({
  threadId: z.number(),
});

export type ListMessagesByThreadIdInput = z.infer<
  typeof listMessagesByThreadIdSchema
>;

export const createNewThreadSchema = z.object({
  participants: z
    .array(z.string())
    .min(1, "At least 1 participant is required"),
});

export type CreateNewThreadInput = z.infer<typeof createNewThreadSchema>;
