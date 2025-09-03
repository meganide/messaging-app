"use client";

import { Loader2 } from "lucide-react";
import { useThreads } from "../_hooks/use-threads";
import { useThreadStore } from "@/stores/thread-store";
import { cn } from "@/lib/utils";

export function ThreadList() {
  const { data: threads, isPending } = useThreads();
  const threadId = useThreadStore((state) => state.threadId);
  const setThreadId = useThreadStore((state) => state.setThreadId);

  if (isPending) {
    return <Loader2 className="animate-spin" />;
  }

  if (!threads || threads.length === 0) {
    return (
      <section className="flex flex-col gap-2 mt-4">
        <p className="text-gray-500 text-center py-4">No threads found</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-2 mt-4">
      {threads.map((thread) => (
        <article
          key={thread.id}
          className={cn(
            "bg-zinc-700 p-2 rounded-md py-3 cursor-pointer hover:bg-zinc-600 transition-colors",
            threadId === thread.id && "bg-zinc-300 text-zinc-900"
          )}
          onClick={() => setThreadId(thread.id)}
        >
          <p className="text-sm mb-1">
            {thread.participants.length > 1 ? "Group chat" : "Direct message"}
          </p>
          <p className="font-medium">
            {thread.participants
              .map((participant) => participant.user.name)
              .join(", ")}
          </p>
        </article>
      ))}
    </section>
  );
}
