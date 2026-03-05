import { Position, Direction, GRID_SIZE } from './types'

/**
 * 蛇类 - 管理蛇的状态和移动
 */
export class Snake {
  private body: Position[]
  private direction: Direction
  private nextDirection: Direction
  private growthPending: number

  constructor(startX: number = 5, startY: number = 5) {
    this.body = [
      { x: startX, y: startY },
      { x: startX - 1, y: startY },
      { x: startX - 2, y: startY }
    ]
    this.direction = Direction.RIGHT
    this.nextDirection = Direction.RIGHT
    this.growthPending = 0
  }

  /**
   * 获取蛇身（头部是第一个元素）
   */
  getBody(): Position[] {
    return [...this.body]
  }

  /**
   * 获取蛇头位置
   */
  getHead(): Position {
    return { ...this.body[0] }
  }

  /**
   * 获取当前方向
   */
  getDirection(): Direction {
    return this.direction
  }

  /**
   * 设置方向（防止180度转向）
   */
  setDirection(newDirection: Direction): void {
    const opposites: Record<Direction, Direction> = {
      [Direction.UP]: Direction.DOWN,
      [Direction.DOWN]: Direction.UP,
      [Direction.LEFT]: Direction.RIGHT,
      [Direction.RIGHT]: Direction.LEFT
    }

    if (opposites[newDirection] !== this.direction) {
      this.nextDirection = newDirection
    }
  }

  /**
   * 移动蛇
   * @returns 新的头部位置
   */
  move(): Position {
    this.direction = this.nextDirection

    const head = this.getHead()
    let newHead: Position

    switch (this.direction) {
      case Direction.UP:
        newHead = { x: head.x, y: head.y - 1 }
        break
      case Direction.DOWN:
        newHead = { x: head.x, y: head.y + 1 }
        break
      case Direction.LEFT:
        newHead = { x: head.x - 1, y: head.y }
        break
      case Direction.RIGHT:
        newHead = { x: head.x + 1, y: head.y }
        break
    }

    this.body.unshift(newHead)

    if (this.growthPending > 0) {
      this.growthPending--
    } else {
      this.body.pop()
    }

    return newHead
  }

  /**
   * 增长蛇身
   */
  grow(amount: number = 1): void {
    this.growthPending += amount
  }

  /**
   * 检查是否自撞
   */
  checkSelfCollision(): boolean {
    const head = this.getHead()
    return this.body.slice(1).some(segment => 
      segment.x === head.x && segment.y === head.y
    )
  }

  /**
   * 检查蛇是否占据某个位置
   */
  occupies(position: Position): boolean {
    return this.body.some(segment => 
      segment.x === position.x && segment.y === position.y
    )
  }

  /**
   * 重置蛇
   */
  reset(startX: number = 5, startY: number = 5): void {
    this.body = [
      { x: startX, y: startY },
      { x: startX - 1, y: startY },
      { x: startX - 2, y: startY }
    ]
    this.direction = Direction.RIGHT
    this.nextDirection = Direction.RIGHT
    this.growthPending = 0
  }
}
