export enum GAME_STATUS {
  IN_PROGRESS = "in_progress",
  PAUSED = "paused",
  LOST = "lost",
  WON = "won",
}

export type GameStatus =
  | GAME_STATUS.IN_PROGRESS
  | GAME_STATUS.LOST
  | GAME_STATUS.WON
  | GAME_STATUS.PAUSED;
