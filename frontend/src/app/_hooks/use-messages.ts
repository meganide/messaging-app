import { useTRPC } from "@/lib/trpc";
import { useThreadStore } from "@/stores/thread-store";
import { useQuery } from "@tanstack/react-query";

export function useMessages() {
  const threadId = useThreadStore((state) => state.threadId);
  const trpc = useTRPC();

  return useQuery(
    trpc.message.listByThreadId.queryOptions(
      { threadId: threadId! },
      { enabled: !!threadId }
    )
  );
}
