"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useNewThread } from "../_hooks/use-new-thread";

export function NewThread() {
  const { username, setUsername, createThread } = useNewThread();

  return (
    <header className="flex flex-row gap-2">
      <Input
        placeholder="Search username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button variant="secondary" onClick={createThread}>
        New Chat
      </Button>
    </header>
  );
}
