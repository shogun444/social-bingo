# Bingo Mixer Workspace Instructions

[ ] `npm install`
[ ] `npm run build`
[ ] `npm run test`

This file helps Copilot and workspace agents understand the repository at a glance.

## What this repo is

- A React + TypeScript + Vite app called **Bingo Mixer**.
- A social icebreaker bingo game that generates a 5×5 board of questions and tracks marked squares.
- Styling uses **Tailwind CSS v4**.
- App state is persisted in `localStorage` so players can continue games.

## Run / build / test

- `npm install`
- `npm run dev` — start Vite local dev server
- `npm run build` — compile TypeScript and build production assets
- `npm run lint` — run ESLint across the repo
- `npm run test` — run Vitest unit tests

Local app URL when running: `http://localhost:5173`

## Key files

- `src/App.tsx` — app-level state routing between start/play screens
- `src/hooks/useBingoGame.ts` — game state, persistence, bingo detection
- `src/components/StartScreen.tsx` — launch screen UI
- `src/components/GameScreen.tsx` — gameplay UI and controls
- `src/components/BingoBoard.tsx` — board rendering
- `src/components/BingoSquare.tsx` — individual square UI and logic
- `src/components/BingoModal.tsx` — bingo win modal
- `src/utils/bingoLogic.ts` — board generation, toggling, bingo rules
- `src/utils/bingoLogic.test.ts` — core logic tests
- `src/data/questions.ts` — bingo question pool

## Conventions and guidance

- Prefer functional React components and hooks.
- Keep state updates immutable and use helper functions from `src/utils/bingoLogic.ts`.
- Preserve the free center square behavior.
- Update or add tests in `src/utils/bingoLogic.test.ts` when changing game logic.
- Keep Tailwind utility classes consistent and UI changes cohesive.
- Use the workshop docs for context, not as a replacement for the code itself.

## Design guide
- The current theme is Retro Terminal Green with dark terminal tones, neon green accents, and monospace styling.
- Use bold contrast for board squares and subtle glow/border details rather than vibrant gradients.
- Preserve readability by keeping text crisp and spacing generous inside squares.
- Avoid overly colorful or soft pastel styling; favor a focused terminal-inspired interface.

## Useful repo notes

- Existing AI agent customizations live in `.github/agents/`.
- Workshop docs are in `workshop/`, especially `workshop/GUIDE.md` and `workshop/01-setup.md`.
- The repo supports a dev container via `.devcontainer/devcontainer.json`.

## Links

- `README.md` — repo overview and run/build instructions
- `workshop/GUIDE.md` — lab guide and task roadmap
- `workshop/01-setup.md` — setup and context engineering guidance
- `.github/agents/` — existing agent workflows
- `.github/prompts/` — reusable prompt definitions
