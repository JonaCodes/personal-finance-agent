import { useState, useRef } from 'react';
import { ActionIcon, useComputedColorScheme, useMantineColorScheme, Container, Flex, Loader, Text, Title } from '@mantine/core';
import { Moon, Sun } from 'lucide-react';
import FinanceInput, { FinanceInputRef } from './components/FinanceInput';
import GuidingQuestions from './components/GuidingQuestions';

const GUIDING_QUESTIONS = [
  "What did I spend on groceries last month?",
  "Show me all my expenses from September",
  "What expenses did I have over $200?",
  "What's my average dining expense?",
  "Show me my spending by category for last month",
  "Were there any unusual expenses in October?",
  "What's the total I spent on entertainment last month?",
  "Compare my grocery spending in September vs October",
  "What's my median dining expense, excluding outliers?",
  "Show me my top 3 spending categories last month",
  "What were my highest grocery purchases in October?",
  "Compare my average entertainment spending this month vs last month",
  "Show me my top 5 spending categories last month, excluding any weird outliers",
  "What's the median amount I spend on groceries over $50, compared to last month?",
  "Were there unusual dining expenses last month, and what was the average of the normal ones?",
  "Show me groceries over $100 from last month, but exclude any one-time weird purchases",
  "What's my weekly spending pattern for dining, excluding outliers?",
  "Compare my total spending by category between September and October"
];

function App() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const inputRef = useRef<FinanceInputRef>(null);

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  const handleQuestionSubmit = async (question: string) => {
    setIsLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/ask_finance_assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        throw new Error('Failed to send question');
      }

      const data = await res.json();
      setResponse(data.answer || 'No response received');
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred while processing your question.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuidingQuestionClick = (selectedQuestion: string) => {
    setQuestion(selectedQuestion);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <div style={{ position: 'relative' }}>
      <ActionIcon
        onClick={toggleColorScheme}
        variant="default"
        size="lg"
        aria-label="Toggle color scheme"
        style={{ position: 'absolute', top: 10, right: 10 }}
      >
        {computedColorScheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </ActionIcon>

      <Container size="sm" pt="xl">
        <Flex direction="column" gap="md">
          <FinanceInput
            ref={inputRef}
            value={question}
            onChange={setQuestion}
            onSubmit={handleQuestionSubmit}
          />
          <GuidingQuestions questions={GUIDING_QUESTIONS} onQuestionClick={handleGuidingQuestionClick} />

          {isLoading && (
            <Flex align="center" gap="sm" mt="md">
              <Loader size="sm" />
              <Text size="sm" c="dimmed">Processing your question...</Text>
            </Flex>
          )}

          {response && !isLoading && (
            <Flex direction={'column'} gap={'xs'}>
              <Title order={4}>Answer</Title>
              <Text size="sm">{response}</Text>
            </Flex>

          )}
        </Flex>
      </Container>
    </div>
  );
}

export default App;
