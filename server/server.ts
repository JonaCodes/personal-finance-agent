import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import financeAssistantRoutes from './routes/financeAssistantRoutes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', financeAssistantRoutes);

app.use(express.static(path.join(__dirname, '../public/dist')));

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../public/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
