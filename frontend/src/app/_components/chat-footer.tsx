"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSendMessage } from "../_hooks/use-send-message";

type ChatFooterProps = {
  threadId: number;
};

export function ChatFooter({ threadId }: ChatFooterProps) {
  const { message, setMessage, sendMessage, sendMessageMutation } =
    useSendMessage(threadId);

  return (
    <footer className="flex flex-row gap-2">
      <Input
        placeholder="Type your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button disabled={sendMessageMutation.isPending} onClick={sendMessage}>
        {sendMessageMutation.isPending ? "Sending..." : "Send"}
      </Button>
    </footer>
  );
}
