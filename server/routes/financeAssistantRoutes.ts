import { Router } from 'express';
import { askFinanceAssistant } from '../controllers/financeAssistantController';

const router = Router();

router.post('/ask_finance_assistant', askFinanceAssistant);

export default router;
