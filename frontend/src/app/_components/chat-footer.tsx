"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSendMessage } from "../_hooks/use-send-message";
import { useThreadStore } from "@/stores/thread-store";

export function ChatFooter() {
  const {
    message,
    setMessage,
    sendMessage,
    sendMessageMutation,
    handleKeyPress,
  } = useSendMessage();
  const threadId = useThreadStore((state) => state.threadId);

  return (
    <footer className="flex flex-row gap-2">
      <Input
        placeholder="Type your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        disabled={!threadId}
      />
      <Button
        disabled={sendMessageMutation.isPending || !threadId || !message.trim()}
        onClick={sendMessage}
      >
        Send
      </Button>
    </footer>
  );
}
