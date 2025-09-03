import { useTRPC } from "@/lib/trpc";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export function useNewThread() {
  const [username, setUsername] = React.useState("");

  const trpc = useTRPC();
  const createThreadMutation = useMutation(
    trpc.message.createNewThread.mutationOptions()
  );

  const createThread = React.useCallback(() => {
    createThreadMutation.mutate({ participants: [username] });
  }, [createThreadMutation, username]);

  return { username, setUsername, createThread };
}
