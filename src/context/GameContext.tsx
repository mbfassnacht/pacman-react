import { createContext, useContext, ReactNode, useState } from "react";
import { Position, pacmanStartPosition } from "../types/position";
import { GAME_STATUS, GameStatus } from "../types/gameStatus";
import { DIFFICULTY, Difficulty } from "../types/difficulty";

type GameContextType = {
  foodAmount: number;
  gameStatus: GameStatus;
  pacmanPosition: Position;
  points: number;
  difficulty: Difficulty;
  setFoodAmount: (foodAmount: number) => void;
  setPacmanPosition: (position: Position) => void;
  setPoints: (points: number) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setGameStatus: (gameStatus: GameStatus) => void;
  restartGame: () => void;
};

const contextDefaultValues: GameContextType = {
  foodAmount: 0,
  gameStatus: GAME_STATUS.PAUSED,
  pacmanPosition: { top: 0, left: 0 },
  points: 0,
  difficulty: DIFFICULTY.MEDIUM,
  setFoodAmount: () => {},
  setPacmanPosition: () => {},
  setPoints: () => {},
  setGameStatus: () => {},
  restartGame: () => {},
  setDifficulty: () => {},
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

  const [difficulty, _setDifficulty] = useState<Difficulty>(
    contextDefaultValues.difficulty
  );

  const [gameStatus, _setGameStatus] = useState<GameStatus>(
    contextDefaultValues.gameStatus
  );

  const setFoodAmount = (foodAmount: number) => {
    _setFoodAmount(foodAmount);
  };

  const setGameStatus = (gameStatus: GameStatus) => {
    _setGameStatus(gameStatus);
  };

  const setPacmanPosition = (pacmanPosition: Position) => {
    _setPacmanPosition(pacmanPosition);
  };
  const setPoints = (points: number) => {
    _setPoints(points);
  };

  const setDifficulty = (difficulty: Difficulty) => {
    _setDifficulty(difficulty);
  };

  const restartGame = () => {
    _setPoints(0);
    _setGameStatus(GAME_STATUS.IN_PROGRESS);
    _setPacmanPosition(pacmanStartPosition);

    const event = new Event("restart-game");
    document.dispatchEvent(event);
  };

  const value = {
    foodAmount,
    gameStatus,
    pacmanPosition,
    points,
    difficulty,
    restartGame,
    setFoodAmount,
    setGameStatus,
    setPacmanPosition,
    setPoints,
    setDifficulty,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
