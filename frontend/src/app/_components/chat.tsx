"use client";

import React from "react";
import { ChatFooter } from "./chat-footer";
import { ChatMessages } from "./chat-messages";

export function Chat() {
  return (
    <main className="flex-3 bg-zinc-800 p-4 h-full justify-between flex flex-col">
      <ChatMessages />
      <ChatFooter />
    </main>
  );
}
