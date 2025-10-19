import { useEffect, useRef } from 'react';
import { ScrollArea } from '@mantine/core';
import ChatBubble from './ChatBubble';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatContainerProps {
  messages: Message[];
}

export default function ChatContainer({ messages }: ChatContainerProps) {
  const viewport = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (viewport.current) {
      viewport.current.scrollTo({
        top: viewport.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <ScrollArea
      viewportRef={viewport}
      style={{ flex: 1, height: 0 }}
      type="auto"
    >
      {messages.map((message, index) => (
        <ChatBubble key={index} role={message.role} content={message.content} />
      ))}
    </ScrollArea>

  );
}
