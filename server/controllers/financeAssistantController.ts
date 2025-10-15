import { processFinanceQuestion } from '../services/financeAssistantService';

export const askFinanceAssistant = async (req: any, res: any) => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Question is required' });
    }

    const answer = await processFinanceQuestion(question);
    res.json({ answer });
  } catch (error) {
    console.error('Error in askFinanceAssistant:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
