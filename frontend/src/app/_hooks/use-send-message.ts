import { useTRPC } from "@/lib/trpc";
import { useThreadStore } from "@/stores/thread-store";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export function useSendMessage() {
  const [message, setMessage] = React.useState("");

  const trpc = useTRPC();
  const sendMessageMutation = useMutation({
    ...trpc.message.send.mutationOptions(),
    onSuccess: () => {
      setMessage("");
    },
  });

  const threadId = useThreadStore((state) => state.threadId);

  const sendMessage = React.useCallback(() => {
    if (!threadId || !message.trim()) return;

    sendMessageMutation.mutate({
      content: message.trim(),
      threadId,
    });
  }, [message, sendMessageMutation, threadId]);

  const handleKeyPress = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage]
  );

  return {
    message,
    setMessage,
    sendMessage,
    sendMessageMutation,
    handleKeyPress,
  };
}
