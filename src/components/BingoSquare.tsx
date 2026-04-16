import type { BingoSquareData } from "../types";

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const baseClasses =
    "group relative flex aspect-square items-center justify-center rounded-3xl border p-4 text-center text-sm leading-tight transition duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/80";

  const stateClasses = square.isFreeSpace
    ? "bg-[#0b1f0c] border-emerald-400/30 text-emerald-100 font-semibold shadow-inner shadow-emerald-500/10"
    : square.isMarked
      ? isWinning
        ? "bg-[#d4ffe0] border-emerald-200 text-slate-950 shadow-inner shadow-emerald-300/20"
        : "bg-[#0d1f10] border-emerald-500/20 text-emerald-200 shadow-inner shadow-emerald-500/10"
      : "bg-[#020501] border-emerald-500/20 text-emerald-200 hover:border-emerald-300 hover:bg-[#082012] active:ring-2 active:ring-emerald-400/30";

  const labelClasses = square.isFreeSpace
    ? "font-semibold uppercase tracking-[0.12em] text-emerald-100"
    : "";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={square.isFreeSpace}
      className={`${baseClasses} ${stateClasses}`}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? "Free space" : square.text}
    >
      <span className={labelClasses}>{square.text}</span>
      {square.isMarked && !square.isFreeSpace && (
        <span className="absolute right-3 top-3 rounded-full bg-slate-900/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-100">
          ✓
        </span>
      )}
    </button>
  );
}
