import { useState, useRef } from 'react';
import { ActionIcon, useComputedColorScheme, useMantineColorScheme, Container, Flex, Loader, Text } from '@mantine/core';
import { Moon, Sun } from 'lucide-react';
import FinanceInput, { FinanceInputRef } from './components/FinanceInput';
import GuidingQuestions from './components/GuidingQuestions';
import ChatContainer from './components/ChatContainer';

const GUIDING_QUESTIONS = [
  "What did I spend on groceries last month?",
  "Show me all my expenses from September",
  "What expenses did I have over $200?",
  "What's my average dining expense?",
  "Show me my spending by category for last month",
  "What's the total I spent on entertainment last month?",
  "Compare my grocery spending in September vs October",
  "What's my median dining expense, excluding outliers?",
  "Show me my top 3 spending categories last month",
  "Compare my average entertainment spending this month vs last month",
  "What's the median amount I spend on groceries over $50, compared to last month?",
  "Show me groceries over $100 from last month, but exclude any one-time weird purchases",
  "Compare my total spending by category between September and October"
];

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function App() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<FinanceInputRef>(null);

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  const handleQuestionSubmit = async (question: string) => {
    // Add user message to chat
    const userMessage: Message = { role: 'user', content: question };
    setMessages((prev) => [...prev, userMessage]);

    setIsLoading(true);

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
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.answer || 'No response received',
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'An error occurred while processing your question.',
      };
      setMessages((prev) => [...prev, errorMessage]);
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
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <ActionIcon
        onClick={toggleColorScheme}
        variant="default"
        size="lg"
        aria-label="Toggle color scheme"
        style={{ position: 'absolute', top: 10, right: 10, zIndex: 100 }}
      >
        {computedColorScheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </ActionIcon>

      <Flex direction={'column'} w={'100%'} align={'center'} p={'xs'} bg={computedColorScheme === 'dark' ? 'dark.7' : 'white'} style={{ position: 'fixed', alignSelf: 'center', zIndex: 2 }}>
        <Text fw={'bold'} c={'green.5'} fz={'xl'}>Finance Agent</Text>
      </Flex>

      <Container size={'80%'} style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, height: '100%' }}>
        <Flex direction="column" style={{ height: '100%' }} justify={'end'}>
          <Flex direction="column" style={{ overflow: 'auto' }} >
            <ChatContainer messages={messages} />
          </Flex>

          {isLoading && (
            <Flex align="center" gap="sm" p="md">
              <Loader size="sm" />
              <Text size="sm" c="dimmed">Processing your question...</Text>
            </Flex>
          )}

          <Flex direction="column" gap={'xs'} align={'center'} p="md" mb={'xl'}>
            <GuidingQuestions questions={GUIDING_QUESTIONS} onQuestionClick={handleGuidingQuestionClick} />
            <FinanceInput
              ref={inputRef}
              value={question}
              onChange={setQuestion}
              onSubmit={handleQuestionSubmit}
            />
          </Flex>
        </Flex>
      </Container>
    </div >
  );
}

export default App;
