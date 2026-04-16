interface DeckCardProps {
  currentCard: string | null;
  onDrawCard: () => void;
}

export function DeckCard({ currentCard, onDrawCard }: DeckCardProps) {
  return (
    <div className="rounded-[2rem] border border-emerald-500/15 bg-[#06120b]/95 p-6 shadow-2xl shadow-emerald-500/10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/80">
            Card Deck Shuffle
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-emerald-100">
            Tap the card
          </h2>
        </div>
        <div className="rounded-3xl border border-emerald-500/30 bg-emerald-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-100">
          Shuffle
        </div>
      </div>

      <button
        type="button"
        onClick={onDrawCard}
        className="mt-8 w-full rounded-[1.75rem] border border-emerald-500/10 bg-[#05120a]/95 p-8 text-left shadow-inner transition hover:border-emerald-400/40 hover:bg-[#081b13]/95"
      >
        <p className="text-sm uppercase tracking-[0.35em] text-emerald-300/80">
          Current question
        </p>
        <p className="mt-5 min-h-[7rem] text-lg font-semibold leading-8 text-emerald-100">
          {currentCard ?? 'Tap to reveal a creative prompt and keep the energy rolling.'}
        </p>
      </button>

      <div className="mt-6 rounded-3xl border border-emerald-500/10 bg-[#04110b]/95 p-4 text-sm text-emerald-200/70">
        Tap the card again to draw a new creative prompt for the next player.
      </div>
    </div>
  );
}
