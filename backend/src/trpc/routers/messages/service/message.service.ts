import { userService } from "../../user/service/user.service";
import {
  CreateNewThreadInput,
  ListMessagesByThreadIdInput,
  SendMessageInput,
} from "../messages.types";
import { messageRepository } from "../repository/message.repository";

class MessageService {
  public async send(input: SendMessageInput, userId: number) {
    return await messageRepository.saveMessage(input, userId);
  }

  public async listByThreadId(input: ListMessagesByThreadIdInput) {
    return await messageRepository.listByThreadId(input);
  }

  public async listThreads(userId: number) {
    return await messageRepository.listThreads(userId);
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

  private async getParticipantIds(participants: string[]) {
    return (
      await Promise.all(
        participants.map((participant) => userService.getUserId(participant))
      )
    ).flat();
  }
}

export const messageService = new MessageService();
