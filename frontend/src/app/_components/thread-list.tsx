"use client";

import { useThreads } from "../_hooks/use-threads";

export function ThreadList() {
  const { data: threads } = useThreads();

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
          className="bg-zinc-700 p-2 rounded-md py-3 cursor-pointer hover:bg-zinc-600 transition-colors"
        >
          <p className="text-sm text-gray-300 mb-1">
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
