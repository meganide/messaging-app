import EventEmitter from "events";
import { on } from "events";
import { tracked } from "@trpc/server";
import { userService } from "../../user/service/user.service";
import {
  CreateNewThreadInput,
  ListMessagesByThreadIdInput,
  OnNewMessageInput,
  SendMessageInput,
} from "../messages.types";
import { messageRepository } from "../repository/message.repository";

export const messageEventEmitter = new EventEmitter();

class MessageService {
  public async send(input: SendMessageInput, userId: number) {
    const optimisticMessage = {
      id: Date.now(), // temporary ID until DB save
      content: input.content,
      threadId: input.threadId,
      senderId: userId,
      createdAt: new Date(),
    };

    messageEventEmitter.emit("newMessage", optimisticMessage);
    void messageRepository.saveMessage(input, userId);

    return optimisticMessage;
  }

  public async listByThreadId(input: ListMessagesByThreadIdInput) {
    return await messageRepository.listByThreadId(input);
  }

  public async listThreads(userId: number) {
    const threads = await messageRepository.listThreads(userId);

    const threadsWithoutOwnUserId = threads.map((thread) => {
      thread.participants = thread.participants.filter(
        (participant) => participant.user.id !== userId
      );
      return thread;
    });

    return threadsWithoutOwnUserId;
  }

  public async createNewThread(input: CreateNewThreadInput, userId: number) {
    const participantIds = await this.getParticipantIds(input.participants);
    participantIds.push(userId);
    const thread = await messageRepository.createNewThread();

    await messageRepository.createNewThreadParticipants({
      participantIds,
      threadId: thread.id,
    });

    return thread;
  }

  public async *subscribeToNewMessages(
    input: OnNewMessageInput,
    signal: AbortSignal
  ) {
    const { threadId } = input;

    try {
      for await (const [eventData] of on(messageEventEmitter, "newMessage", {
        signal,
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
  }

  private async getParticipantIds(participants: string[]) {
    return (
      await Promise.all(
        participants.map((participant) => userService.getUserId(participant))
      )
    ).flat();
  }
}

export const messageService = new MessageService();
