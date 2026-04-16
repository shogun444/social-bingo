import type { BingoSquareData } from "../types";
import { BingoSquare } from "./BingoSquare";

interface BingoBoardProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  onSquareClick: (squareId: number) => void;
}

export function BingoBoard({
  board,
  winningSquareIds,
  onSquareClick,
}: BingoBoardProps) {
  return (
    <div className="grid grid-cols-5 gap-3 w-full max-w-4xl mx-auto aspect-square px-1 sm:px-2">
      {board.map((square) => (
        <BingoSquare
          key={square.id}
          square={square}
          isWinning={winningSquareIds.has(square.id)}
          onClick={() => onSquareClick(square.id)}
        />
      ))}
    </div>
  );
}
