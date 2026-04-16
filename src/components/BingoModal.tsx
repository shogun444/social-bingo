interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020401]/90 backdrop-blur-sm px-4 py-6">
      <div className="w-full max-w-sm rounded-[2rem] border border-emerald-500/15 bg-[#031007]/95 p-7 text-center shadow-2xl shadow-emerald-500/20">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-5xl text-emerald-200 shadow-lg shadow-emerald-500/20">
          🎉
        </div>
        <h2 className="text-4xl font-black tracking-tight text-emerald-100">
          BINGO!
        </h2>
        <p className="mt-3 text-sm leading-6 text-emerald-200/80">
          You completed a winning line. Keep playing to explore the rest of the
          board.
        </p>

        <button
          onClick={onDismiss}
          className="mt-6 inline-flex w-full items-center justify-center rounded-3xl border border-emerald-500/25 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
        >
          Keep Playing
        </button>
      </div>
    </div>
  );
}
