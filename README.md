# Running the Project

- Run `npm i` in both root and `/server` directories
- Create a `.env` file in `/server` with your Gemini API key: `GOOGLE_GENERATIVE_AI_API_KEY=your_key_here`
  - Get a free API key from: https://aistudio.google.com/app/apikey
- Run `npm run dev` from root - runs frontend and backend concurrently with HMR
- Open [http://localhost:5173/](http://localhost:5173/)

**Note:** Use `GOOGLE_GENERATIVE_AI_API_KEY` not `GEMINI_API_KEY` (AI SDK requirement)

---

# Exercise: Conversational Finance Agent

## Overview

You are building a **conversational AI agent** that analyzes personal expense data through natural dialogue.

**Example conversation:**
```
User: "How much did I spend on groceries last month?"
Agent: "You spent $253.19 on groceries in September 2024."

User: "What about the month before?"
Agent: "In August, you spent $198.45 on groceries."

User: "So I spent more in September?"
Agent: "Yes, you spent $54.74 more in September compared to August."

User: "Exclude outliers from both"
Agent: "With outliers excluded: September was $241.30, August was $187.20."
```

The agent **remembers** previous queries and can refine/compare without asking the user to repeat themselves.

---

## What you're building

### The Agent (`/server/agent/index.ts`)

A **stateful conversational agent** that:
- Maintains memory across multiple user messages
- Calls tools when it needs to run analyses
- Understands follow-up questions

### The Tools (`/server/tools/`)

**You** will decide which tools to build.
To guide you, look at the `GUIDING_QUESTIONS` in `public/src/App.tsx`
Part of your task is to build the right tools that can answer all these questions.

Note that you will have to detect anomalies as part of the exercise. Use the `anomaly-helper.ts` for the anomaly detection logic. You also have other helpers (array, date, and math) that you can use.

- [Hint 0](https://gist.githubusercontent.com/JonaCodes/10e112c6daa80173cf99480ff56fa7e2/raw/5fa08adefd24b18125c74a7b9fe3013145098734/hint-0.txt)
- [Hint 1](https://gist.githubusercontent.com/JonaCodes/10e112c6daa80173cf99480ff56fa7e2/raw/5fa08adefd24b18125c74a7b9fe3013145098734/hint-1.txt)
- [Hint 2](https://gist.github.com/JonaCodes/10e112c6daa80173cf99480ff56fa7e2#file-hint-2-md)

#### Building tools correctly
Use `zod` to create a proper schema for your tools. Example:
```js
export const tools = {
  my_tool: tool({
    description: `The best tool for tooling`,
    inputSchema: z.object({name: z.string().describe('A param for the tool')})
  }),
  ...
}
```

Then you can pass all your tools using vercel's SDK easily:
```js
const result = await generateText({
  model: google('gemini-2.5-flash'),
  messages: [...],
  tools // <-- now the agent knows which tools are available to it, but it *won't* run them for you
});
```

If the LLM decides it wants to run tools, the `finishReason` will be `tool-calls`:
```js
if(result.finishReason === 'tool-calls') {
  ...
}
```

Inside the result, you'll see a `toolCalls` array:
```js
result.toolCalls
```

Each tool inside `toolCalls` call will have a `toolCallId` and a `toolName`

### Memory Management

**DO NOT** store the entire expenses dataset in memory
1. It will bloat your context
2. It will burn tokens
3. It might confuse the model later on in the conversation

*Also*, pay attention to which tool-call results you store in memory. Some can be quite big - watch out!

---

## Where to Start

All the UI is already implemented - you do not have to change anything there - just make sure the AI returns either simple strings or *markdown* formatted text.

Your entry point to the project is `server/agent/index.ts`, in the `run` function. The setup already handles the statefulness of the app, that is: we only create one instane of the agent, which stays alive so long as the server is running.

---

## Validating your answers:
*Note*: to get these results, you have to tell your LLM that today is December 30th, 2025 - otherwise relative dates like "last month" will work differently

- Groceries last month: $288.75 
- Average dining expense (all time): $161.16
- Spending by categories last month
    - Groceries: 288.75
    - Utilities: 148.90
    - Entertainment: 79.41
    - Dining: 72.69
    - Transportation: 34.94
    - Subscriptions: 27.03
- Median dining expense, excluding outliers (all time): $81.16
- Median groceries > $50 vs last month: $60.70 vs $91.41 

---

What you're aiming for:
<img width="969" height="924" alt="image" src="https://github.com/user-attachments/assets/ab386f2a-dbff-4ffb-90b7-5240fa6b81fe" />