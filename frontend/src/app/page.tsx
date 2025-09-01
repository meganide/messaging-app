"use client"

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/lib/trpc";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function Home() {
  const trpc = useTRPC();

  const { data,isLoading } = useQuery(trpc.message.list.queryOptions())

  const { mutate: createUser } = useMutation(trpc.message.create.mutationOptions())

  return (
    <section>
      <p>{isLoading ? "Loading..." : data?.message}</p>
      <Button onClick={() => createUser({ name: "John", age: 20, email: "john2@example.com", password: "123456" })}>Create User</Button>
    </section>
  );
}
