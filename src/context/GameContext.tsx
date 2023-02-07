import { createContext, useContext, ReactNode, useState } from "react";
import { Position, pacmanStartPosition } from "../types/position";
import { GAME_STATUS, GameStatus } from "../types/gameStatus";

interface GhostPositions {
  [key: string]: Position;
}

type GameContextType = {
  foodAmount: number;
  gameEnded: boolean | undefined;
  gameStatus: GameStatus;
  ghostPositions: GhostPositions;
  pacmanPosition: Position;
  points: number;
  setFoodAmount: (foodAmount: number) => void;
  setPacmanPosition: (position: Position) => void;
  setPoints: (points: number) => void;
  setGameEnded: (gameEnded: boolean) => void;
  setGameStatus: (gameStatus: GameStatus) => void;
  setGhostPosition: (name: string, ghostPositions: Position) => void;
  restartGame: () => void;
};

const contextDefaultValues: GameContextType = {
  foodAmount: 0,
  gameEnded: false,
  gameStatus: GAME_STATUS.IN_PROGRESS,
  ghostPositions: {},
  pacmanPosition: { top: 0, left: 0 },
  points: 0,
  setFoodAmount: () => {},
  setPacmanPosition: () => {},
  setPoints: () => {},
  setGameEnded: () => {},
  setGameStatus: () => {},
  setGhostPosition: () => {},
  restartGame: () => {},
};

const GameContext = createContext<GameContextType>(contextDefaultValues);

export function useGameContext() {
  return useContext(GameContext);
}

type Props = {
  children: ReactNode;
};

export function GameProvider({ children }: Props) {
  const [pacmanPosition, _setPacmanPosition] = useState<Position>(
    contextDefaultValues.pacmanPosition
  );
  const [points, _setPoints] = useState<number>(contextDefaultValues.points);
  const [foodAmount, _setFoodAmount] = useState<number>(
    contextDefaultValues.foodAmount
  );

  const [gameEnded, _setGameEnded] = useState<boolean | undefined>(
    contextDefaultValues.gameEnded
  );
  const [gameStatus, _setGameStatus] = useState<GameStatus>(
    contextDefaultValues.gameStatus
  );

  const [ghostPositions, _setGhostPosition] = useState<GhostPositions>(
    contextDefaultValues.ghostPositions
  );

  const setFoodAmount = (foodAmount: number) => {
    _setFoodAmount(foodAmount);
  };
  const setGameEnded = (gameEnded: boolean) => {
    _setGameEnded(gameEnded);
  };
  const setGameStatus = (gameStatus: GameStatus) => {
    _setGameStatus(gameStatus);
  };
  const setGhostPosition = (name: string, ghostNewPosition: Position) => {
    _setGhostPosition({ ...ghostPositions, name: ghostNewPosition });
  };
  const setPacmanPosition = (pacmanPosition: Position) => {
    _setPacmanPosition(pacmanPosition);
  };
  const setPoints = (points: number) => {
    _setPoints(points);
  };

  const restartGame = () => {
    _setPoints(0);
    _setGameEnded(false);
    _setGameStatus(GAME_STATUS.IN_PROGRESS);
    _setPacmanPosition(pacmanStartPosition);

    const event = new Event("restart-game");
    document.dispatchEvent(event);
  };

  const value = {
    foodAmount,
    gameEnded,
    gameStatus,
    ghostPositions,
    pacmanPosition,
    points,
    restartGame,
    setFoodAmount,
    setGameEnded,
    setGameStatus,
    setGhostPosition,
    setPacmanPosition,
    setPoints,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
