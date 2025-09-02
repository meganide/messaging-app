import { eq } from "drizzle-orm";
import { db } from "../../../../db";
import { messagesTable } from "../../../../db/schema";
import { ListMessagesByThreadIdInput, SendMessageInput } from "../messages.types";

class MessageRepository {
    public async saveMessage(input: SendMessageInput, userId: number) {
        return await db.insert(messagesTable).values({
            content: input.content,
            threadId: input.threadId,
            senderId: userId,
        }).returning();
    }

    public async listByThreadId(input: ListMessagesByThreadIdInput) {
        return await db.select().from(messagesTable).where(eq(messagesTable.threadId, input.threadId));
    }
}

export const messageRepository = new MessageRepository();