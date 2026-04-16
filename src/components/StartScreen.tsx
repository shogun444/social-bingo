import { useState } from 'react';
import type { GameMode } from '../types';

interface StartScreenProps {
  onStart: (mode: GameMode) => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [selectedMode, setSelectedMode] = useState<GameMode>('board');

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-[2rem] border border-emerald-500/20 bg-[#041006]/95 p-8 shadow-[0_30px_80px_-40px_rgba(16,185,129,0.7)] backdrop-blur sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">
              Retro Terminal Green
            </p>
            <h1 className="text-5xl font-black tracking-tight text-emerald-200 sm:text-6xl">
              Bingo Mixer
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-emerald-200/80">
              Play a retro terminal-backed bingo game with sharp green accents,
              glowing lines, and a fast, focused board experience.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-emerald-500/10 bg-[#09140a]/95 p-5 text-emerald-200/80">
                <p className="text-xs uppercase tracking-[0.35em] text-emerald-300/80">
                  Fast start
                </p>
                <p className="mt-3 text-slate-300">
                  Launch a fresh board instantly and begin marking matches.
                </p>
              </div>
              <div className="rounded-3xl border border-emerald-500/10 bg-[#09140a]/95 p-5 text-emerald-200/80">
                <p className="text-xs uppercase tracking-[0.35em] text-emerald-300/80">
                  Deck shuffle
                </p>
                <p className="mt-3 text-slate-300">
                  Tap the card to reveal a random creative prompt and keep the fun moving.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-emerald-500/15 bg-[#06100a]/95 p-8 shadow-xl shadow-slate-950/40">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/80">
                The game
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-emerald-100">
                Choose your mode
              </h2>
              <p className="mt-3 text-sm leading-6 text-emerald-200/70">
                Pick either classic Bingo or Card Deck Shuffle for a single-question flow.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setSelectedMode('board')}
                  className={`rounded-3xl border px-4 py-4 text-left text-sm transition ${
                    selectedMode === 'board'
                      ? 'border-emerald-400/80 bg-emerald-400/10 text-emerald-100'
                      : 'border-emerald-500/10 bg-[#04110b]/95 text-emerald-200/80'
                  }`}
                >
                  <p className="uppercase tracking-[0.3em] text-emerald-300/80">
                    Board mode
                  </p>
                  <p className="mt-2 font-semibold">Classic bingo</p>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMode('deck')}
                  className={`rounded-3xl border px-4 py-4 text-left text-sm transition ${
                    selectedMode === 'deck'
                      ? 'border-emerald-400/80 bg-emerald-400/10 text-emerald-100'
                      : 'border-emerald-500/10 bg-[#04110b]/95 text-emerald-200/80'
                  }`}
                >
                  <p className="uppercase tracking-[0.3em] text-emerald-300/80">
                    Deck shuffle
                  </p>
                  <p className="mt-2 font-semibold">One question at a time</p>
                </button>
              </div>

              <div className="rounded-3xl bg-[#04110b]/95 p-5 text-left border border-emerald-500/10">
                <p className="text-xs uppercase tracking-[0.35em] text-emerald-300/80">
                  How to play
                </p>
                <p className="mt-3 text-emerald-200/80">
                  {selectedMode === 'board'
                    ? 'Spot a matching person, then tap the square to mark it.'
                    : 'Open the card and tap it again to shuffle a new creative prompt.'}
                </p>
              </div>
              <button
                onClick={() => onStart(selectedMode)}
                className="inline-flex w-full justify-center rounded-3xl border border-emerald-400/40 bg-emerald-400/5 px-6 py-4 text-lg font-semibold text-emerald-100 transition hover:bg-emerald-400/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                Start Game
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
