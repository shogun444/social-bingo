import { useBingoGame } from "./hooks/useBingoGame";
import { StartScreen } from "./components/StartScreen";
import { GameScreen } from "./components/GameScreen";
import { BingoModal } from "./components/BingoModal";

function App() {
  const {
    gameState,
    board,
    winningSquareIds,
    showBingoModal,
    startGame,
    handleSquareClick,
    resetGame,
    dismissModal,
  } = useBingoGame();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020401] text-emerald-300">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.12),_transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.08),_transparent_24%)]" />
      <div className="relative z-10">
        {gameState === "start" ? (
          <StartScreen onStart={startGame} />
        ) : (
          <GameScreen
            board={board}
            winningSquareIds={winningSquareIds}
            hasBingo={gameState === "bingo"}
            onSquareClick={handleSquareClick}
            onReset={resetGame}
          />
        )}

        {showBingoModal && <BingoModal onDismiss={dismissModal} />}
      </div>
    </div>
  );
}

export default App;
