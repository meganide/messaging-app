import { NewThread } from "./new-thread";
import { ThreadList } from "./thread-list";

export function ChatSidebar() {
  return (
    <aside className="flex-1 bg-zinc-900 p-4 flex flex-col gap-2 min-w-[300px]">
      <h1 className="text-lg font-bold">Chats</h1>
      <NewThread />
      <ThreadList />
    </aside>
  );
}
