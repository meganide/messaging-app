import { useTRPC } from "@/lib/trpc";
import { useQuery } from "@tanstack/react-query";

export function useThreads() {
  const trpc = useTRPC();
  return useQuery(trpc.message.listThreads.queryOptions());
}
