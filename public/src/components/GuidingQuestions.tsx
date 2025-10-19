import { Text, Group, ScrollArea, Flex } from '@mantine/core';

interface GuidingQuestionsProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
}

export default function GuidingQuestions({ questions, onQuestionClick }: GuidingQuestionsProps) {
  return (
    <Flex maw={'95%'}>
      <ScrollArea type="never" offsetScrollbars={false}>
        <Group gap="md" wrap="nowrap">
          {questions.map((question, index) => (
            <Text
              key={index}
              size="sm"
              style={{
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--mantine-color-green-4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '';
              }}
              onClick={() => onQuestionClick(question)}
            >
              {question}
            </Text>
          ))}
        </Group>
      </ScrollArea>
    </Flex>
  );
}
