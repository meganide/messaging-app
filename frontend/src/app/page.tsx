import { RequireAuth } from "@/components/require-auth";
import { ChatSidebar } from "./_components/chat-sidebar";
import { Chat } from "./_components/chat";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center h-screen text-zinc-100">
      <RequireAuth>
        <section className="flex flex-row h-full w-full">
          <ChatSidebar />
          <Chat />
        </section>
      </RequireAuth>
    </section>
  );
}
