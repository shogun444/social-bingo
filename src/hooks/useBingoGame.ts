import { useState, useCallback, useMemo, useEffect } from 'react';
import type { BingoSquareData, BingoLine, GameState, GameMode } from '../types';
import { questions } from '../data/questions';
import {
  generateBoard,
  toggleSquare,
  checkBingo,
  getWinningSquareIds,
} from '../utils/bingoLogic';

export interface BingoGameState {
  gameState: GameState;
  gameMode: GameMode;
  board: BingoSquareData[];
  currentCard: string | null;
  winningLine: BingoLine | null;
  winningSquareIds: Set<number>;
  showBingoModal: boolean;
}

export interface BingoGameActions {
  startGame: (mode: GameMode) => void;
  drawCard: () => void;
  handleSquareClick: (squareId: number) => void;
  resetGame: () => void;
  dismissModal: () => void;
}

const STORAGE_KEY = 'bingo-game-state';
const STORAGE_VERSION = 1;

interface StoredGameData {
  version: number;
  gameState: GameState;
  gameMode?: GameMode;
  board: BingoSquareData[];
  currentCard?: string | null;
  winningLine: BingoLine | null;
}

function validateStoredData(data: unknown): data is StoredGameData {
  if (!data || typeof data !== 'object') {
    return false;
  }
  
  const obj = data as Record<string, unknown>;
  
  if (obj.version !== STORAGE_VERSION) {
    return false;
  }
  
  if (typeof obj.gameState !== 'string' || !['start', 'playing', 'bingo'].includes(obj.gameState)) {
    return false;
  }
  
  if (
    obj.gameMode !== undefined &&
    (typeof obj.gameMode !== 'string' || !['board', 'deck'].includes(obj.gameMode))
  ) {
    return false;
  }
  
  if (!Array.isArray(obj.board) || (obj.board.length !== 0 && obj.board.length !== 25)) {
    return false;
  }
  
  const validSquares = obj.board.every((sq: unknown) => {
    if (!sq || typeof sq !== 'object') return false;
    const square = sq as Record<string, unknown>;
    return (
      typeof square.id === 'number' &&
      typeof square.text === 'string' &&
      typeof square.isMarked === 'boolean' &&
      typeof square.isFreeSpace === 'boolean'
    );
  });
  
  if (!validSquares) {
    return false;
  }
  
  if (obj.winningLine !== null) {
    if (typeof obj.winningLine !== 'object') {
      return false;
    }
    const line = obj.winningLine as Record<string, unknown>;
    if (
      typeof line.type !== 'string' ||
      !['row', 'column', 'diagonal'].includes(line.type) ||
      typeof line.index !== 'number' ||
      !Array.isArray(line.squares)
    ) {
      return false;
    }
  }

  if (obj.currentCard !== undefined && obj.currentCard !== null && typeof obj.currentCard !== 'string') {
    return false;
  }
  
  return true;
}

function loadGameState(): Pick<BingoGameState, 'gameState' | 'gameMode' | 'board' | 'currentCard' | 'winningLine'> | null {
  // SSR guard
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return null;
    }

    const parsed = JSON.parse(saved);
    
    if (validateStoredData(parsed)) {
      return {
        gameState: parsed.gameState,
        gameMode: (parsed.gameMode as GameMode) || 'board',
        board: parsed.board,
        currentCard: parsed.currentCard ?? null,
        winningLine: parsed.winningLine,
      };
    } else {
      console.warn('Invalid game state data in localStorage, clearing...');
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.warn('Failed to load game state:', error);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return null;
}

function saveGameState(
  gameState: GameState,
  gameMode: GameMode,
  board: BingoSquareData[],
  currentCard: string | null,
  winningLine: BingoLine | null
): void {
  // SSR guard
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const data: StoredGameData = {
      version: STORAGE_VERSION,
      gameState,
      gameMode,
      board,
      currentCard,
      winningLine,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save game state:', error);
  }
}

export function useBingoGame(): BingoGameState & BingoGameActions {
  const loadedState = useMemo(() => loadGameState(), []);

  const [gameState, setGameState] = useState<GameState>(
    () => loadedState?.gameState || 'start'
  );
  const [gameMode, setGameMode] = useState<GameMode>(
    () => loadedState?.gameMode || 'board'
  );
  const [board, setBoard] = useState<BingoSquareData[]>(
    () => loadedState?.board || []
  );
  const [currentCard, setCurrentCard] = useState<string | null>(
    () => loadedState?.currentCard || null
  );
  const [winningLine, setWinningLine] = useState<BingoLine | null>(
    () => loadedState?.winningLine || null
  );
  const [showBingoModal, setShowBingoModal] = useState(false);

  const winningSquareIds = useMemo(
    () => getWinningSquareIds(winningLine),
    [winningLine]
  );

  const getRandomQuestion = useCallback(
    (exclude?: string | null) => {
      const pool = questions.filter((question) => question !== exclude);
      return pool[Math.floor(Math.random() * pool.length)];
    },
    []
  );

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    saveGameState(gameState, gameMode, board, currentCard, winningLine);
  }, [gameState, gameMode, board, currentCard, winningLine]);

  const startGame = useCallback((mode: GameMode) => {
    setGameMode(mode);
    if (mode === 'board') {
      setBoard(generateBoard());
      setCurrentCard(null);
    } else {
      setBoard([]);
      setCurrentCard(getRandomQuestion(null));
    }
    setWinningLine(null);
    setShowBingoModal(false);
    setGameState('playing');
  }, [getRandomQuestion]);

  const drawCard = useCallback(() => {
    setCurrentCard((current) => getRandomQuestion(current));
  }, [getRandomQuestion]);

  const handleSquareClick = useCallback((squareId: number) => {
    setBoard((currentBoard) => {
      const newBoard = toggleSquare(currentBoard, squareId);
      
      // Check for bingo after toggling
      const bingo = checkBingo(newBoard);
      if (bingo && !winningLine) {
        // Schedule state updates to avoid synchronous setState in effect
        queueMicrotask(() => {
          setWinningLine(bingo);
          setGameState('bingo');
          setShowBingoModal(true);
        });
      }
      
      return newBoard;
    });
  }, [winningLine]);

  const resetGame = useCallback(() => {
    setGameState('start');
    setBoard([]);
    setCurrentCard(null);
    setWinningLine(null);
    setShowBingoModal(false);
  }, []);

  const dismissModal = useCallback(() => {
    setShowBingoModal(false);
  }, []);

  return {
    gameState,
    gameMode,
    board,
    currentCard,
    winningLine,
    winningSquareIds,
    showBingoModal,
    startGame,
    drawCard,
    handleSquareClick,
    resetGame,
    dismissModal,
  };
}
