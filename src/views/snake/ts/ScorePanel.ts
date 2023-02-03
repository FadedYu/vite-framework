/**
 * 计分盘
 */

interface Score {
  addScore(): void;
  levelUP(): void;
}

class ScorePanel implements Score {
  private _score: number = 0;
  private _level: number = 1;
  private _maxLevel: number;
  private _upScore: number;

  constructor(maxLevel: number = 5, upScore?: number) {
    this._maxLevel = maxLevel
    this._upScore = upScore ? upScore : maxLevel
  }

  // 获取分数
  get score(): number {
    return this._score
  }

  // 获取等级
  get level(): number {
    return this._level
  }


  // 吃食物加分
  addScore(): void {
    this._score++
    if (this._score % this._maxLevel === 0) {
      this.levelUP()
    }
  }

  // 加特定分后，增加等级
  levelUP(): void {
    if (this._level === this._maxLevel) {
      return
    }
  }

}


export { ScorePanel }