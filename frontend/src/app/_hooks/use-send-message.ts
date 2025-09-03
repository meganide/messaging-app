import { useTRPC } from "@/lib/trpc";
import { useThreadStore } from "@/stores/thread-store";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export function useSendMessage() {
  const [message, setMessage] = React.useState("");

  const trpc = useTRPC();
  const sendMessageMutation = useMutation(trpc.message.send.mutationOptions());
  const threadId = useThreadStore((state) => state.threadId);

  const sendMessage = React.useCallback(() => {
    if (!threadId) return;
    sendMessageMutation.mutate({ content: message, threadId });
  }, [message, sendMessageMutation, threadId]);

  return { message, setMessage, sendMessage, sendMessageMutation };
}
