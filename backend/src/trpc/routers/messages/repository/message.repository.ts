import { asc, desc, eq, inArray } from "drizzle-orm";
import { db } from "../../../../db";
import {
  messagesTable,
  threadParticipantsTable,
  threadsTable,
} from "../../../../db/schema";
import {
  CreateNewThreadInput,
  ListMessagesByThreadIdInput,
  SendMessageInput,
} from "../messages.types";
import { CreateNewThreadParticipantsInput } from "./message.repository.types";

class MessageRepository {
  public async saveMessage(input: SendMessageInput, userId: number) {
    return await db
      .insert(messagesTable)
      .values({
        content: input.content,
        threadId: input.threadId,
        senderId: userId,
      })
      .returning();
  }

  public async listByThreadId(input: ListMessagesByThreadIdInput) {
    return await db
      .select()
      .from(messagesTable)
      .where(eq(messagesTable.threadId, input.threadId))
      .orderBy(asc(messagesTable.createdAt));
  }

  public async listThreads(userId: number) {
    const userThreads = await db
      .select({ threadId: threadParticipantsTable.threadId })
      .from(threadParticipantsTable)
      .where(eq(threadParticipantsTable.userId, userId));

    if (userThreads.length === 0) {
      return [];
    }

    const threadIds = userThreads.map((t) => t.threadId);

    return await db.query.threadsTable.findMany({
      where: (threads) => inArray(threads.id, threadIds),
      with: {
        participants: {
          with: {
            user: {
              columns: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  public async createNewThread() {
    const result = await db.insert(threadsTable).values({}).returning();
    return result[0];
  }

  public async createNewThreadParticipants(
    input: CreateNewThreadParticipantsInput
  ) {
    return await db.insert(threadParticipantsTable).values(
      input.participantIds.map((participantId) => ({
        userId: participantId,
        threadId: input.threadId,
      }))
    );
  }
}

export const messageRepository = new MessageRepository();
