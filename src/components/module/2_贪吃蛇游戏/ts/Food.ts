interface Foods {
  element: HTMLElement
  X: number
  Y: number
  postion: number[]
  changePostion(): void
}

/**
 * 食物类
 */
class Food implements Foods {
  element: HTMLElement

  constructor(element: HTMLElement) {
    this.element = element
    this.changePostion()
  }
  /**
   * X坐标属性
   */
  get X(): number {
    return this.element.offsetLeft
  }

  /**
   * Y坐标属性
   */
  get Y(): number {
    return this.element.offsetTop
  }

  /**
   * 坐标[x,y]属性
   */
  get postion(): number[] {
    return [this.element.offsetLeft, this.element.offsetTop]
  }

  /**
   * 改变食物位置
   */
  changePostion(): void {
    const randomX: number = Math.round(Math.random() * 29) * 10
    const randomY: number = Math.round(Math.random() * 29) * 10
    this.element.style.left = randomX + 'px'
    this.element.style.top = randomY + 'px'
  }
}

export default Food
