import type { BingoSquareData } from "../types";
import { BingoBoard } from "./BingoBoard";

interface GameScreenProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  hasBingo: boolean;
  onSquareClick: (squareId: number) => void;
  onReset: () => void;
}

export function GameScreen({
  board,
  winningSquareIds,
  hasBingo,
  onSquareClick,
  onReset,
}: GameScreenProps) {
  const markedCount = board.filter((square) => square.isMarked).length;

  return (
    <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-emerald-500/15 bg-[#04100a]/95 p-6 shadow-2xl shadow-emerald-500/10 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-300/80">
              Retro Terminal Green
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-emerald-200 sm:text-5xl">
              Bingo Mixer
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-emerald-200/70 sm:text-base">
              A crisp terminal-style board with glowing green highlights and a
              bold retro feel.
            </p>
          </div>

          <button
            onClick={onReset}
            className="inline-flex items-center justify-center rounded-3xl border border-emerald-500/30 bg-emerald-400/5 px-5 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            Reset Game
          </button>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-[1.75rem] bg-[#06120b]/95 p-5 shadow-inner border border-emerald-500/10">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300/80">
              Progress
            </p>
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="rounded-3xl bg-[#05120a]/95 p-4 text-emerald-100 shadow-lg shadow-emerald-500/10">
                <p className="text-sm text-emerald-200/70">Squares marked</p>
                <p className="mt-2 text-3xl font-semibold text-emerald-100">
                  {markedCount}/24
                </p>
              </div>
              <div className="rounded-3xl bg-[#05120a]/95 p-4 text-emerald-100 shadow-lg shadow-emerald-500/10">
                <p className="text-sm text-emerald-200/70">Status</p>
                <p className="mt-2 text-xl font-semibold text-emerald-100">
                  {hasBingo ? "Bingo achieved" : "Keep going"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.75rem] border border-emerald-500/10 bg-[#06120b]/95 p-5 shadow-inner">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-300/80">
                How to play
              </p>
              <ul className="mt-4 space-y-3 text-sm text-emerald-200/70">
                <li>• Tap a square when you meet someone who matches it.</li>
                <li>• The center space is free and already counts.</li>
                <li>• Aim for a row, column, or diagonal to win.</li>
              </ul>
            </div>
            <div className="rounded-[1.75rem] border border-emerald-500/10 bg-[#06120b]/95 p-5 shadow-inner">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-300/80">
                Quick tip
              </p>
              <p className="mt-3 text-sm text-emerald-200/70">
                Focus on the easiest prompts first, then weave in the more
                surprising ones.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.95fr]">
        <section className="rounded-[2rem] border border-emerald-500/10 bg-[#04100a]/95 p-6 shadow-2xl">
          <BingoBoard
            board={board}
            winningSquareIds={winningSquareIds}
            onSquareClick={onSquareClick}
          />
        </section>

        <aside className="space-y-6">
          {hasBingo && (
            <div className="rounded-[1.75rem] border border-slate-700/60 bg-slate-900/85 p-6 shadow-lg shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                Victory
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white">
                Bingo! 🎉
              </h2>
              <p className="mt-3 text-sm text-slate-300">
                Your winning line is locked in. Keep playing and see how many
                patterns you can complete.
              </p>
            </div>
          )}

          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-6 shadow-inner">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
              Board rules
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p>• The free center square is pre-marked.</p>
              <p>• Mark or unmark squares as you meet people.</p>
              <p>• Progress is saved automatically in local storage.</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
