# Personal Finance Agent

A conversational expense analysis app built with React, Express, and the Vercel
AI SDK. It uses Gemini to select tools for filtering expenses, aggregating
spending, and calculating statistics over a local CSV dataset.

The chat supports follow-up questions, category comparisons, and analysis with
outliers excluded. Example queries include “What did I spend on groceries last
month?” and “What's my median dining expense, excluding outliers?”

## Local development

Prerequisites: Node.js and npm, plus a Google Gemini API key.

- Install the workspace dependencies from the repository root with `npm ci`
- Create a `.env` file in `/server` with your Gemini API key:
  `GOOGLE_GENERATIVE_AI_API_KEY=your_key_here`
  - Get a free API key from: https://aistudio.google.com/app/apikey

Start both services from the repository root with `npm run dev`

Open [http://localhost:5173/](http://localhost:5173/). The Express API runs on
port 3000; Vite proxies `/api` requests to it.

## Example run

To ensure setup works, send the chat "How much did I spend on groceries last
month?" It should respond with $288.75

## Gemini API

If you run out of Flash-Lite usage, you can also try `gemini-3.8-flash`, but it
can be slower and account/model usage limits still apply.
