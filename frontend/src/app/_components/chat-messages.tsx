import { useThreadStore } from "@/stores/thread-store";
import { useMessages } from "../_hooks/use-messages";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

export function ChatMessages() {
  const threadId = useThreadStore((state) => state.threadId);
  const { user } = useAuth();
  const { data: messages } = useMessages();

  if (!threadId) {
    return (
      <article className="flex flex-col gap-2 h-full overflow-y-auto">
        <p className="text-gray-500 text-center py-4">
          Select a thread to start chatting
        </p>
      </article>
    );
  }

  function isOwnMessage(senderId: number) {
    return senderId === user?.id;
  }

  return (
    <article className="flex flex-col gap-2 h-full overflow-y-auto">
      {messages?.map((message) => (
        <p
          className={cn(
            "w-fit bg-zinc-700 p-2 rounded-md",
            isOwnMessage(message.senderId) ? "self-start" : "self-end"
          )}
          key={message.id}
        >
          {message.content}
        </p>
      ))}
    </article>
  );
}
