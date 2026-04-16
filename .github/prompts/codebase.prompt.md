---
agent: agent
description: Help with the Bingo Mixer React/Tailwind app
tools: ['read','search','edit','execute/runInTerminal','todo']
---

Your goal is to answer questions and support development for the Social Bingo app in this repository.

## Project Overview
- This is a React + TypeScript + Vite app named `Bingo Mixer`.
- It is a social icebreaker bingo game that generates a bingo board of questions and tracks marked squares.
- Styling uses Tailwind CSS v4.

## Key Files
- `src/main.tsx` — app bootstrap
- `src/App.tsx` — high-level app state and routing
- `src/components/StartScreen.tsx` — game start UI
- `src/components/GameScreen.tsx` — main gameplay view
- `src/components/BingoBoard.tsx` — visual bingo board
- `src/components/BingoSquare.tsx` — individual square component
- `src/components/BingoModal.tsx` — bingo win modal
- `src/hooks/useBingoGame.ts` — gameplay state and actions
- `src/utils/bingoLogic.ts` — board generation and bingo detection
- `src/utils/bingoLogic.test.ts` — unit tests for core logic
- `src/data/questions.ts` — question pool for boards

## Development Workflow
- Install dependencies from `package.json`.
- Run `npm run dev` for local development.
- Build with `npm run build`.
- Lint with `npm run lint`.
- Test with `npm run test`.

## Guidance
- Prefer functional React components and hooks.
- Keep state immutable and update board state through helper functions.
- Preserve the free center square behavior.
- Add or update tests in `src/utils/bingoLogic.test.ts` when changing game logic.
- Use Tailwind classes consistently and keep UI changes cohesive.
- When giving feedback or making changes, be concise and actionable.

## Useful Notes
- The local app runs at `http://localhost:5173` when `npm run dev` is active.
- There is workshop guidance in `workshop/` for onboarding and feature design.
