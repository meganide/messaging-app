"use client"

import { useTRPC } from "@/lib/trpc";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const trpc = useTRPC();

  const { data,isLoading } = useQuery(trpc.message.list.queryOptions())

  return (
    <section>
      <p>{isLoading ? "Loading..." : data?.message}</p>
    </section>
  );
}
