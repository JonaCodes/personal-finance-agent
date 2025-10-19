`npm run dev` to run locally - runs FE and BE concurrently with HMR and auto
server reload

NOTE: GOOGLE_GENERATIVE_AI_API_KEY, not GEMINI_API_KEY

# Agent Exercise: Log Triage & Investigation Agent

## Overview
Build an autonomous agent that analyzes production logs, investigates issues by following contextual breadcrumbs (user IDs, request IDs, etc.), and determines root causes through multi-step reasoning.

## Learning Objectives
- Understand when agentic loops are necessary vs. simple workflows
- Implement ReAct pattern with genuine exploration
- Build tools that enable investigation rather than just data retrieval
- Handle variable-depth reasoning (investigation might take 3 steps or 8 steps depending on findings)

## The Problem
Traditional monitoring alerts when specific thresholds are hit, but can't connect the dots between seemingly unrelated errors. This agent autonomously:
1. Analyzes logs for error patterns
2. Extracts contextual identifiers (user_id, request_id, session_id, etc.)
3. Traces those identifiers through the system to understand full flow
4. Correlates with recent system changes
5. Determines root cause and severity
6. Takes appropriate action (alert team or create ticket)

## Why This Needs An Agent
The investigation path cannot be predetermined:
- You don't know which identifiers matter until you analyze the errors
- You don't know how many log searches are needed to trace the issue
- You don't know when you've found root cause vs. just symptoms
- The branching depends entirely on what each step reveals

**Example:** Initial logs show "payment failed" → extract user_id → search that user's journey → discover auth timeout → search for auth timeouts → find widespread pattern → correlate with recent deployment → identify root cause

## Tools to Implement

### 1. `analyze_logs(last_n_lines: number)`
**Purpose:** Initial sweep of recent logs  
**Returns:** 
```typescript
{
  error_patterns: Array<{
    error_type: string,
    count: number,
    sample_log: string,
    severity: "critical" | "warning" | "info"
  }>,
  summary: string
}
```

### 2. `extract_context_identifiers(log_entry: string)`
**Purpose:** Pull out identifiers from a specific log entry  
**Returns:**
```typescript
{
  user_id?: string,
  request_id?: string,
  session_id?: string,
  order_id?: string,
  timestamp: string
}
```

### 3. `search_logs_by_identifier(identifier_type: string, identifier_value: string, time_window: string)`
**Purpose:** Core investigation tool - search all logs for a specific identifier  
**Parameters:**
- `identifier_type`: "user_id" | "request_id" | "session_id" | "order_id" | "error_type"
- `identifier_value`: the actual ID to search for
- `time_window`: "5min" | "10min" | "30min" | "1h"

**Returns:**
```typescript
{
  logs: Array<{
    timestamp: string,
    service: string,
    level: "error" | "warn" | "info",
    message: string
  }>,
  total_count: number
}
```

### 4. `get_recent_changes(time_window: string)`
**Purpose:** Check what changed in the system recently  
**Returns:**
```typescript
{
  changes: Array<{
    timestamp: string,
    type: "deployment" | "config_change" | "migration" | "scaling",
    description: string,
    service: string
  }>
}
```

### 5. `create_ticket(title: string, description: string, priority: "P0" | "P1" | "P2")`
**Purpose:** Create issue ticket for non-urgent problems  
**Returns:** `{ ticket_id: string, created_at: string }`

### 6. `alert_team(severity: "critical" | "warning", message: string)`
**Purpose:** Immediately notify team for urgent issues  
**Returns:** `{ alerted: boolean, channel: string }`

## Example Investigation Flow

**Scenario:** Payment service showing errors

```
Step 1: analyze_logs(500)
→ Agent finds: "Payment processing failed" x 47 times, "Database timeout" x 12 times

Step 2: Agent picks payment error, extracts context
→ extract_context_identifiers(sample_error)
→ Gets: {user_id: "user_789", request_id: "req_abc", order_id: "order_456"}

Step 3: Agent traces user's journey
→ search_logs_by_identifier("user_id", "user_789", "10min")
→ Sees: login → cart → checkout → payment timeout → retry → fail

Step 4: Agent notices "payment timeout" consistently at 5s
→ search_logs_by_identifier("error_type", "payment timeout", "1h")
→ Finds: 200+ occurrences across many users

Step 5: Agent checks recent changes
→ get_recent_changes("2h")
→ Finds: "Payment service timeout reduced from 30s → 5s" (1h ago)

Step 6: Agent connects the dots
→ create_ticket("Payment failures due to timeout config change", "P0")
→ alert_team("critical", "200+ payment failures after timeout reduction...")
```

## What You'll Provide Students

1. **Mock log file** (500+ lines)
   - Mix of normal operations and planted issues
   - Multiple services (auth, api, payment, database)
   - Scattered user_ids, request_ids throughout
   - Temporal patterns (errors spike after certain timestamp)

2. **Mock recent changes JSON**
   - 3-5 recent deployments/config changes
   - One of them is the culprit

3. **Starter code structure**
   - Agent loop scaffold
   - Tool function stubs
   - Type definitions
   - Helper utilities (log parsing, date handling)

## What Students Implement

1. **Six tool functions** (with TODO comments)
   - Simple string parsing and filtering
   - Focus is on logic, not complex implementations

2. **Agent reasoning loop**
   - Call LLM with tools
   - Execute tool calls
   - Add results to memory
   - Loop until investigation complete

3. **Memory management**
   - Add tool results to agent memory
   - Keep summaries, not full log dumps

## Success Criteria

The agent should:
- ✅ Start with broad analysis (`analyze_logs`)
- ✅ Extract relevant identifiers from errors
- ✅ Follow those identifiers through system (`search_logs_by_identifier`)
- ✅ Identify patterns across multiple occurrences
- ✅ Correlate with recent changes
- ✅ Determine appropriate action (alert vs ticket)
- ✅ Explain its reasoning in final response

The investigation path should be **data-driven**, not hardcoded.

## Key Teaching Moments

1. **When agents are needed**: Show how predetermined workflows fail when investigation depth varies
2. **Tool design**: Tools enable exploration, not just retrieval
3. **Memory efficiency**: Store summaries of tool results, not massive log dumps
4. **Reasoning visibility**: Agent should explain why it's calling each tool

## Extensions (Optional)

For advanced students:
- Handle multiple simultaneous issues in logs
- Prioritize which issue to investigate first
- Propose specific fixes based on root cause
- Query external services (database health checks, API status)

---

## Technical Stack
- Node.js + TypeScript
- Vercel AI SDK with Gemini
- Same project structure as finance agent exercise
- No external dependencies for tools (just string parsing)

## Estimated Scope
- **Setup:** 1 hour (tools stubs, mock data)
- **Implementation:** 3-4 hours (tool logic + agent loop)
- **Testing:** 1 hour (run through scenarios)
- **Total:** ~5-6 hours

---

**This exercise teaches the core value of agents: autonomous investigation through multi-step reasoning where the path cannot be predetermined.**