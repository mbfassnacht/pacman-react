export enum DIFFICULTY {
  EASY = "easy",
  MEDIUM = "medium",
  ADVANCED = "advanced",
}

export type Difficulty =
  | DIFFICULTY.EASY
  | DIFFICULTY.MEDIUM
  | DIFFICULTY.ADVANCED;
