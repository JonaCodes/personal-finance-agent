import { Box, Text, useMantineColorScheme } from '@mantine/core';

interface ChatBubbleProps {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatBubble({ role, content }: ChatBubbleProps) {
  const isUser = role === 'user';
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '12px',
      }}
      pr={isUser ? 'md' : 0}
      pl={isUser ? 0 : 'md'}
    >
      <Box
        style={{
          maxWidth: '70%',
          padding: '12px 16px',
          borderRadius: '16px',
          backgroundColor: isUser
            ? 'var(--mantine-color-blue-6)'
            : isDark
              ? 'var(--mantine-color-dark-5)'
              : 'var(--mantine-color-gray-1)',
        }}
      >
        <Text
          size="sm"
          style={{
            color: isUser ? 'white' : isDark ? 'var(--mantine-color-gray-3)' : 'var(--mantine-color-gray-9)',
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Text>
      </Box>
    </Box>
  );
}
