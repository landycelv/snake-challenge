import './style.css'
import { SnakeGame } from './game/SnakeGame'

// 游戏初始化
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement
  const game = new SnakeGame(canvas)
  
  // UI 元素
  const startBtn = document.getElementById('start-btn') as HTMLButtonElement
  const pauseBtn = document.getElementById('pause-btn') as HTMLButtonElement
  const resetBtn = document.getElementById('reset-btn') as HTMLButtonElement
  const overlay = document.getElementById('game-overlay') as HTMLDivElement
  const overlayTitle = document.getElementById('overlay-title') as HTMLHeadingElement
  const overlayDesc = document.getElementById('overlay-desc') as HTMLParagraphElement
  
  // 开始游戏
  startBtn.addEventListener('click', () => {
    game.start()
    overlay.classList.remove('active')
    pauseBtn.disabled = false
    pauseBtn.textContent = '暂停'
  })
  
  // 暂停/继续
  pauseBtn.addEventListener('click', () => {
    if (game.isPaused()) {
      game.resume()
      pauseBtn.textContent = '暂停'
    } else {
      game.pause()
      pauseBtn.textContent = '继续'
    }
  })
  
  // 重置游戏
  resetBtn.addEventListener('click', () => {
    game.reset()
    overlayTitle.textContent = '准备开始'
    overlayDesc.textContent = '使用方向键或 WASD 控制蛇移动'
    startBtn.textContent = '开始游戏'
    overlay.classList.add('active')
    pauseBtn.disabled = true
    pauseBtn.textContent = '暂停'
  })
  
  // 游戏结束回调
  game.onGameOver = (score: number) => {
    overlayTitle.textContent = '游戏结束'
    overlayDesc.textContent = `最终得分: ${score} 分`
    startBtn.textContent = '重新开始'
    overlay.classList.add('active')
    pauseBtn.disabled = true
  }
  
  // 显示开始界面
  overlay.classList.add('active')
})
