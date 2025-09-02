import { RequireAuth } from "@/components/require-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {return (
    <section className="flex flex-col items-center justify-center h-screen text-zinc-100">
      <RequireAuth>
        <section className="flex flex-row h-full w-full">
          <aside className="flex-1 bg-zinc-900 p-4 flex flex-col gap-2 min-w-[300px]">
            <h1 className="text-lg font-bold">Chats</h1>
            <header className="flex flex-row gap-2">
              <Input placeholder="Search username" />
              <Button variant="secondary">New Chat</Button>
            </header>
            <section className="flex flex-col gap-2 mt-4">
              <p className="bg-zinc-700 p-2 rounded-md py-3">User 1</p>
              <p className="bg-zinc-700 p-2 rounded-md py-3">User 2</p>
              <p className="bg-zinc-700 p-2 rounded-md py-3">User 3</p>
              <p className="bg-zinc-700 p-2 rounded-md py-3">User 4</p>
              <p className="bg-zinc-700 p-2 rounded-md py-3">User 5</p>
              <p className="bg-zinc-700 p-2 rounded-md py-3">User 6</p>
              <p className="bg-zinc-700 p-2 rounded-md py-3">User 7</p>
            </section>
          </aside>
          <main className="flex-3 bg-zinc-800 p-4 h-full justify-between flex flex-col">
            <section className="flex flex-col gap-2 h-full overflow-y-auto">
              <p className="text-left w-fit bg-zinc-700 p-2 rounded-md">User 1</p>
              <p className="text-left w-fit bg-zinc-700 p-2 rounded-md">User 1</p>
              <p className="self-end w-fit bg-zinc-700 p-2 rounded-md">User 2</p>
              <p className="self-end w-fit bg-zinc-700 p-2 rounded-md">User 2</p>
              <p className="self-end w-fit bg-zinc-700 p-2 rounded-md">User 2</p>
              <p className="text-left w-fit bg-zinc-700 p-2 rounded-md">User 1</p>
              <p className="self-end w-fit bg-zinc-700 p-2 rounded-md">User 2</p>
            </section>
            <footer className="flex flex-row gap-2">
              <Input placeholder="Type your message" />
              <Button variant="secondary">Send</Button>
            </footer>
          </main>
        </section>
      </RequireAuth>
    </section>
  );
}
