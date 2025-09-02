import { ListMessagesByThreadIdInput, SendMessageInput } from "../messages.types";
import { messageRepository } from "../repository/message.repository";

class MessageService {
    public async send(input: SendMessageInput, userId: number) {
        return await messageRepository.saveMessage(input, userId);
    }

    public async listByThreadId(input: ListMessagesByThreadIdInput) {
        return await messageRepository.listByThreadId(input);
    }
}

export const messageService = new MessageService();