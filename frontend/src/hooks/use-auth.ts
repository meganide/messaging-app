"use client";

import { useTRPC } from "@/lib/trpc";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const trpc = useTRPC();
  const meQuery = useQuery(trpc.auth.me.queryOptions());

  return {
    user: meQuery.data?.user || null,
    isAuthenticated: !!meQuery.data?.user,
    isLoading: meQuery.isLoading,
  };
}
