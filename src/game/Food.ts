import { Position } from './types'
import { Snake } from './Snake'

/**
 * 食物类 - 管理食物生成
 */
export class Food {
  private position: Position
  private gridWidth: number
  private gridHeight: number

  constructor(gridWidth: number, gridHeight: number) {
    this.gridWidth = gridWidth
    this.gridHeight = gridHeight
    this.position = { x: 0, y: 0 }
  }

  /**
   * 获取食物位置
   */
  getPosition(): Position {
    return { ...this.position }
  }

  /**
   * 生成新食物位置
   */
  spawn(snake: Snake): void {
    let newPosition: Position
    
    do {
      newPosition = {
        x: Math.floor(Math.random() * this.gridWidth),
        y: Math.floor(Math.random() * this.gridHeight)
      }
    } while (snake.occupies(newPosition))

    this.position = newPosition
  }

  /**
   * 检查位置是否是食物
   */
  isAt(position: Position): boolean {
    return this.position.x === position.x && this.position.y === position.y
  }
}
