import express from 'express';
import { getDummyData } from '../controllers/dataController';

const router = express.Router();

router.get('/', getDummyData);

export default router;
