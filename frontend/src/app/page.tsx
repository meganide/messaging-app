import { RequireAuth } from "@/components/require-auth";

export default function Home() {return (
    <section className="flex flex-col items-center justify-center h-screen">
      <RequireAuth>
        <p>Authenticated</p>
      </RequireAuth>
    </section>
  );
}
