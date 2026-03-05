import { GameState, Direction, CELL_SIZE, INITIAL_SPEED, SPEED_INCREMENT, MIN_SPEED } from './types'
import { Snake } from './Snake'
import { Food } from './Food'

/**
 * 贪吃蛇游戏主类
 */
export class SnakeGame {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private snake: Snake
  private food: Food
  private state: GameState
  private score: number
  private highScore: number
  private level: number
  private speed: number
  private gameLoop: number | null
  private gridWidth: number
  private gridHeight: number

  public onGameOver: ((score: number) => void) | null = null
  public onScoreUpdate: ((score: number) => void) | null = null
  public onLevelUpdate: ((level: number) => void) | null = null

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    
    this.gridWidth = Math.floor(canvas.width / CELL_SIZE)
    this.gridHeight = Math.floor(canvas.height / CELL_SIZE)
    
    this.snake = new Snake(5, 5)
    this.food = new Food(this.gridWidth, this.gridHeight)
    
    this.state = GameState.IDLE
    this.score = 0
    this.highScore = parseInt(localStorage.getItem('snakeHighScore') || '0')
    this.level = 1
    this.speed = INITIAL_SPEED
    this.gameLoop = null
    
    this.bindControls()
    this.updateUI()
  }

  /**
   * 绑定键盘控制
   */
  private bindControls(): void {
    document.addEventListener('keydown', (e) => {
      if (this.state !== GameState.PLAYING) return
      
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault()
          this.snake.setDirection(Direction.UP)
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault()
          this.snake.setDirection(Direction.DOWN)
          break
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault()
          this.snake.setDirection(Direction.LEFT)
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault()
          this.snake.setDirection(Direction.RIGHT)
          break
        case ' ':
          e.preventDefault()
          this.togglePause()
          break
      }
    })
  }

  /**
   * 开始游戏
   */
  start(): void {
    if (this.state === GameState.PLAYING) return
    
    this.reset()
    this.state = GameState.PLAYING
    this.food.spawn(this.snake)
    this.runGameLoop()
  }

  /**
   * 游戏主循环
   */
  private runGameLoop(): void {
    if (this.state !== GameState.PLAYING) return
    
    this.update()
    this.render()
    
    this.gameLoop = window.setTimeout(() => {
      this.runGameLoop()
    }, this.speed)
  }

  /**
   * 更新游戏状态
   */
  private update(): void {
    const newHead = this.snake.move()
    
    // 检查边界碰撞
    if (newHead.x < 0 || newHead.x >= this.gridWidth || 
        newHead.y < 0 || newHead.y >= this.gridHeight) {
      this.gameOver()
      return
    }
    
    // 检查自撞
    if (this.snake.checkSelfCollision()) {
      this.gameOver()
      return
    }
    
    // 检查吃食物
    if (this.food.isAt(newHead)) {
      this.snake.grow()
      this.score += 10 * this.level
      this.updateUI()
      
      // 每吃5个食物升级
      if (this.score % 50 === 0) {
        this.level++
        this.speed = Math.max(MIN_SPEED, this.speed - SPEED_INCREMENT)
        this.updateUI()
      }
      
      this.food.spawn(this.snake)
    }
  }

  /**
   * 渲染游戏画面
   */
  private render(): void {
    // 清空画布
    this.ctx.fillStyle = '#1a1a2e'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    
    // 绘制网格
    this.ctx.strokeStyle = '#16213e'
    this.ctx.lineWidth = 0.5
    for (let x = 0; x <= this.canvas.width; x += CELL_SIZE) {
      this.ctx.beginPath()
      this.ctx.moveTo(x, 0)
      this.ctx.lineTo(x, this.canvas.height)
      this.ctx.stroke()
    }
    for (let y = 0; y <= this.canvas.height; y += CELL_SIZE) {
      this.ctx.beginPath()
      this.ctx.moveTo(0, y)
      this.ctx.lineTo(this.canvas.width, y)
      this.ctx.stroke()
    }
    
    // 绘制食物
    const foodPos = this.food.getPosition()
    this.ctx.fillStyle = '#e94560'
    this.ctx.beginPath()
    this.ctx.arc(
      foodPos.x * CELL_SIZE + CELL_SIZE / 2,
      foodPos.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2,
      0,
      Math.PI * 2
    )
    this.ctx.fill()
    
    // 绘制蛇
    const body = this.snake.getBody()
    body.forEach((segment, index) => {
      const gradient = this.ctx.createRadialGradient(
        segment.x * CELL_SIZE + CELL_SIZE / 2,
        segment.y * CELL_SIZE + CELL_SIZE / 2,
        0,
        segment.x * CELL_SIZE + CELL_SIZE / 2,
        segment.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2
      )
      
      if (index === 0) {
        // 蛇头
        gradient.addColorStop(0, '#00ff88')
        gradient.addColorStop(1, '#00cc66')
      } else {
        // 蛇身渐变
        const alpha = 1 - (index / body.length) * 0.5
        gradient.addColorStop(0, `rgba(0, 200, 100, ${alpha})`)
        gradient.addColorStop(1, `rgba(0, 150, 75, ${alpha})`)
      }
      
      this.ctx.fillStyle = gradient
      this.ctx.beginPath()
      this.ctx.roundRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2,
        4
      )
      this.ctx.fill()
    })
  }

  /**
   * 暂停游戏
   */
  pause(): void {
    if (this.state !== GameState.PLAYING) return
    this.state = GameState.PAUSED
    if (this.gameLoop) {
      clearTimeout(this.gameLoop)
      this.gameLoop = null
    }
  }

  /**
   * 继续游戏
   */
  resume(): void {
    if (this.state !== GameState.PAUSED) return
    this.state = GameState.PLAYING
    this.runGameLoop()
  }

  /**
   * 切换暂停状态
   */
  togglePause(): void {
    if (this.state === GameState.PLAYING) {
      this.pause()
    } else if (this.state === GameState.PAUSED) {
      this.resume()
    }
  }

  /**
   * 游戏结束
   */
  private gameOver(): void {
    this.state = GameState.GAME_OVER
    if (this.gameLoop) {
      clearTimeout(this.gameLoop)
      this.gameLoop = null
    }
    
    if (this.score > this.highScore) {
      this.highScore = this.score
      localStorage.setItem('snakeHighScore', this.highScore.toString())
    }
    
    this.updateUI()
    
    if (this.onGameOver) {
      this.onGameOver(this.score)
    }
  }

  /**
   * 重置游戏
   */
  reset(): void {
    if (this.gameLoop) {
      clearTimeout(this.gameLoop)
      this.gameLoop = null
    }
    
    this.snake.reset(5, 5)
    this.score = 0
    this.level = 1
    this.speed = INITIAL_SPEED
    this.state = GameState.IDLE
    this.updateUI()
    this.render()
  }

  /**
   * 更新UI
   */
  private updateUI(): void {
    const scoreEl = document.getElementById('score')
    const highScoreEl = document.getElementById('high-score')
    const levelEl = document.getElementById('level')
    
    if (scoreEl) scoreEl.textContent = this.score.toString()
    if (highScoreEl) highScoreEl.textContent = this.highScore.toString()
    if (levelEl) levelEl.textContent = this.level.toString()
    
    if (this.onScoreUpdate) this.onScoreUpdate(this.score)
    if (this.onLevelUpdate) this.onLevelUpdate(this.level)
  }

  /**
   * 检查是否暂停
   */
  isPaused(): boolean {
    return this.state === GameState.PAUSED
  }

  /**
   * 获取游戏状态
   */
  getState(): GameState {
    return this.state
  }
}
