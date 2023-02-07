export enum DIRECTION {
  LEFT = "left",
  RIGHT = "right",
  UP = "up",
  DOWN = "down",
}

export type Direction =
  | DIRECTION.LEFT
  | DIRECTION.RIGHT
  | DIRECTION.UP
  | DIRECTION.DOWN;

export enum ARROW {
  LEFT = 37,
  RIGHT = 39,
  UP = 38,
  DOWN = 40,
}
