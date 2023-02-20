import Snake from "./Snake"
import Food from "./Food"
import ScorePanel from "./ScorePanel"
import EventBus from "./EventBus"


// 游戏控制器初始化参数
interface GameOption {
  snakeEl: HTMLElement;
  foodEl: HTMLElement;
  scoreboard: Scoreboard;
  speed?: number;
  maxLevel?: number;
  upScore?: number;
}

// 响应式记分牌和蛇状态
interface Scoreboard {
  status: string,
  score: number,
  level: number
}

// 方向键按键
const horizontalKeyboard: string[] = ['ArrowLeft', 'ArrowRight', 'Left', 'Right']
const verticalKeyboard: string[] = ['ArrowUp', 'ArrowDown', 'Up', 'Down']
const keyboard: string[] = horizontalKeyboard.concat(verticalKeyboard)

interface GameInterface {
  init: () => void;
  keydownHandler: (event: KeyboardEvent) => void;
  gameReset: () => void;
  gamePause: () => void;
  run: () => void;
  cantTurnBack: (event: KeyboardEvent) => void;
  snakeMove: () => void;
  snakeEat: () => void;
}

/**
 * 贪吃蛇游戏控制类
 */
class GameController implements GameInterface {
  private _snake: Snake;
  private _food: Food;
  private _scorePanel: ScorePanel;
  // 响应式记分牌和蛇状态
  private _scoreboard: Scoreboard;
  private _speed: number;
  // 游戏是否结束
  private _isEnd: boolean = false;
  // 游戏是否暂停
  private _isPause: boolean = false;
  /**
   * 方向按键队列数组，里面存放蛇移动方向顺序。优化蛇转向问题
   * 
   * 使用队列数组目的是快速按下键盘转向时，记录按下的方向顺序，等待蛇移动一格后换方向。
   */
  private _direction: string[] = [];

  constructor({ snakeEl, foodEl, scoreboard, speed = 200, maxLevel = 5, upScore }: GameOption) {
    this._snake = new Snake(snakeEl)
    this._food = new Food(foodEl)
    this._scoreboard = scoreboard
    this._speed = speed
    this._scorePanel = new ScorePanel({
      maxLevel: maxLevel,
      upScore: upScore
    })

    this.init()
  }

  /**
   * 游戏初始化
   */
  init(): void {
    // 监听键盘按键
    document.addEventListener('keydown', this.keydownHandler.bind(this))

    // 监听蛇存活动态
    EventBus.on('onEnd', (msg) => {
      this._isEnd = true
      this._scoreboard.status = msg + '游戏结束。'
      setTimeout(() => {
        // 结束弹框
        let isReStart = confirm(msg + '游戏结束。\n\n是否重新开始？')
        if (isReStart) {
          // 点击确定，继续游戏
          this._scoreboard.status = '请按方向键开始…'
          this.gameReset()
        } else {
          this._scoreboard.status = '请按回车键开始…'
        }
      }, 50);

    })

    // 初始化游戏开始运行
    this.gameReset()
  }

  /**
   * 控制器键盘按下事件
   * @param event 键盘按下事件
   */
  keydownHandler(event: KeyboardEvent): void {

    if (this._isEnd) {
      if (event.code !== 'Enter') {
        return
      } else {
        event.preventDefault()
        this.gameReset()
      }
    } else {
      if (event.code === 'Space') {
        event.preventDefault()
        // 空格键，游戏暂停与继续
        this.gamePause()
      } else if (keyboard.includes(event.key) && !this._isPause) {
        // 方向键，蛇不能回头
        this.cantTurnBack(event)
      }
    }
  }

  /**
   * 游戏重置
   */
  gameReset(): void {
    this._isEnd = false
    this._direction = []
    this._scoreboard.status = ''
    this._snake.reset()
    this._scorePanel.reset()
    this._food.changePostion()
  }

  /**
   * 游戏暂停
   */
  gamePause(): void {
    this._isPause = !this._isPause
    if (this._isPause) {
      this._scoreboard.status = '游戏暂停中……'
    } else {
      this.run()
      this._scoreboard.status = ''
    }
  }

  /**
   * 游戏开始，蛇开始移动
   */
  run(): void {
    this.snakeMove()
    this.snakeEat()

    console.log('===========>运行');


    !(this._isEnd || this._isPause) && setTimeout(
      this.run.bind(this), this._speed - (this._scorePanel.level - 1) * Math.floor(this._speed / this._scorePanel.maxLevel)
    );
  }


  /**
   * 蛇不能反向
   * @param nowPress 当前按下按键
   */
  cantTurnBack(event: KeyboardEvent): void {
    // 阻止默认按键冒泡
    event.preventDefault()
    let nowPress = event.key

    if (this._direction.length === 0) {
      this._direction.push(nowPress)
      this.run()
      return
    }

    // 之前按键队列的最后一个元素
    let last: string = this._direction[this._direction.length - 1]
    if (
      (horizontalKeyboard.includes(last) && verticalKeyboard.includes(nowPress)) ||
      (verticalKeyboard.includes(last) && horizontalKeyboard.includes(nowPress))
    ) {
      this._direction.push(nowPress)
    }
  }

  /**
   * 蛇移动，根据按键队列移动
   */
  snakeMove(): void {
    this._snake.move(this._direction[0])

    if (this._direction.length > 1) {
      this._direction.shift()
    }
  }

  /**
   * 蛇吃食物事件
   */
  snakeEat(): void {
    // 检测蛇是否吃到食物
    if (this._snake.X === this._food.X && this._snake.Y === this._food.Y) {
      // 添加蛇身
      this._snake.addBody()
      // 改变食物位置
      this._food.changePostion()
      // 修改记分牌
      this._scorePanel.addScore()
      this._scoreboard.score = this._scorePanel.score
      this._scoreboard.level = this._scorePanel.level
    }
  }

}

export default GameController