import { useThreadStore } from "@/stores/thread-store";

export function ChatMessages() {
  const threadId = useThreadStore((state) => state.threadId);

  if (!threadId) {
    return (
      <article className="flex flex-col gap-2 h-full overflow-y-auto">
        <p className="text-gray-500 text-center py-4">
          Select a thread to start chatting
        </p>
      </article>
    );
  }

  return (
    <article className="flex flex-col gap-2 h-full overflow-y-auto">
      <p className="text-left w-fit bg-zinc-700 p-2 rounded-md">User 1</p>
      <p className="text-left w-fit bg-zinc-700 p-2 rounded-md">User 1</p>
      <p className="self-end w-fit bg-zinc-700 p-2 rounded-md">User 2</p>
      <p className="self-end w-fit bg-zinc-700 p-2 rounded-md">User 2</p>
      <p className="self-end w-fit bg-zinc-700 p-2 rounded-md">User 2</p>
      <p className="text-left w-fit bg-zinc-700 p-2 rounded-md">User 1</p>
      <p className="self-end w-fit bg-zinc-700 p-2 rounded-md">User 2</p>
    </article>
  );
}
