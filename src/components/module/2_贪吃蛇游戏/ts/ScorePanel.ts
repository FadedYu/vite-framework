/**
 * 计分盘
 */
interface Score {
  addScore(): void
  levelUP(): void
  reset(): void
}

interface ScoreRulesType {
  maxLevel: number
  upScore?: number
}

/**
 * 记分牌
 */
class ScorePanel implements Score {
  private _score = 0
  private _level = 1
  private _maxLevel: number
  private _upScore: number

  constructor(scoreRulesType?: ScoreRulesType) {
    this._maxLevel = scoreRulesType?.maxLevel ?? 5
    this._upScore = scoreRulesType?.upScore || this._maxLevel
  }

  /**
   * 获取分数
   */
  get score(): number {
    return this._score
  }

  /**
   * 获取等级
   */
  get level(): number {
    return this._level
  }

  /**
   * 获取最高等级
   */
  get maxLevel(): number {
    return this._maxLevel
  }

  /**
   * 吃食物加分
   * @returns 分数和等级
   */
  addScore(): void {
    this._score++
    if (this._score % this._upScore === 0) {
      this.levelUP()
    }
  }

  /**
   * 加特定分后，增加等级
   */
  levelUP(): void {
    if (this._level === this._maxLevel) {
      return
    }
    this._level++
  }

  /**
   * 重置记分牌
   */
  reset(): void {
    this._score = 0
    this._level = 1
  }
}

export default ScorePanel
