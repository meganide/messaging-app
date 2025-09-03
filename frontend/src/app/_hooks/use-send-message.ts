import { useTRPC } from "@/lib/trpc";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export function useSendMessage(threadId: number) {
  const [message, setMessage] = React.useState("");

  const trpc = useTRPC();
  const sendMessageMutation = useMutation(trpc.message.send.mutationOptions());

  const sendMessage = React.useCallback(() => {
    sendMessageMutation.mutate({ content: message, threadId });
  }, [message, sendMessageMutation, threadId]);

  return { message, setMessage, sendMessage, sendMessageMutation };
}
