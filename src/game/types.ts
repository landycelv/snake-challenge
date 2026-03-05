/**
 * 游戏配置常量
 */
export const GRID_SIZE = 20
export const CELL_SIZE = 20
export const INITIAL_SPEED = 150
export const SPEED_INCREMENT = 5
export const MIN_SPEED = 50

/**
 * 方向枚举
 */
export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

/**
 * 位置接口
 */
export interface Position {
  x: number
  y: number
}

/**
 * 游戏状态
 */
export enum GameState {
  IDLE = 'IDLE',
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  GAME_OVER = 'GAME_OVER'
}
