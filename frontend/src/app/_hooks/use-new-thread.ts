import { useTRPC } from "@/lib/trpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

export function useNewThread() {
  const [username, setUsername] = React.useState("");
  const queryClient = useQueryClient();

  const trpc = useTRPC();
  const createThreadMutation = useMutation(
    trpc.message.createNewThread.mutationOptions({
      onSuccess: () => {
        setUsername("");
        queryClient.invalidateQueries(trpc.message.listThreads.queryOptions());
      },
    })
  );

  const createThread = React.useCallback(() => {
    createThreadMutation.mutate({ participants: [username] });
  }, [createThreadMutation, username]);

  return { username, setUsername, createThread };
}
