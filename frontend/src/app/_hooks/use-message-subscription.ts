import { useTRPC } from "@/lib/trpc";
import { useThreadStore } from "@/stores/thread-store";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type Message = {
  data?: {
    id: number;
    content: string;
    threadId: number;
    senderId: number;
    createdAt: Date;
    type: "message";
  };
};

export function useMessageSubscription() {
  const threadId = useThreadStore((state) => state.threadId);
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!threadId) return;

    const subscription = trpc.message.onNewMessage
      .subscriptionOptions({ threadId })
      .subscribe({
        onData({ data }: Message) {
          const currentMessage = data;
          queryClient.setQueryData(
            [...trpc.message.listByThreadId.queryKey({ threadId })],
            (oldMessages: Message[] | undefined) => {
              if (!oldMessages) return [currentMessage];

              const isDuplicate = oldMessages.some(
                (msg) => msg.data?.id === currentMessage?.id
              );

              if (isDuplicate) {
                return oldMessages;
              }

              return [...oldMessages, currentMessage];
            }
          );
        },
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [
    queryClient,
    threadId,
    trpc.message.listByThreadId,
    trpc.message.onNewMessage,
  ]);
}
