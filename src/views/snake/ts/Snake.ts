import EventBus from "../../../components/mitt/EventBus";

interface Position {
  x: number;
  y: number;
}

/**
 * 蛇
 */
class Snake {

  // 蛇组成Dom节点
  element: HTMLElement;
  head: HTMLElement;
  bodies: HTMLElement[];
  bodiesPosition: Position[] = [];

  constructor(element: HTMLElement) {
    this.element = element
    this.head = this.element.firstElementChild as HTMLElement
    this.bodies = [this.head]
  }

  /**
   * 获取蛇头X坐标
   */
  get X(): number {
    return this.head.offsetLeft
  }

  /**
   * 获取蛇头Y坐标
   */
  get Y(): number {
    return this.head.offsetTop
  }

  /**
   * 设置蛇头X坐标
   */
  set X(value: number) {
    if (this.X === value) {
      return
    }

    // 蛇撞墙检测
    if (value < 0 || value > 290) {
      EventBus.emit('onEnd', '蛇撞墙啦！')
      return
    }
    this.moveBody()
    this.head.style.left = value + 'px'
    this.checkHitBody()
  }

  /**
   * 设置蛇头Y坐标
   */
  set Y(value: number) {
    if (this.Y === value) {
      return
    }

    // 蛇撞墙检测
    if (value < 0 || value > 290) {
      EventBus.emit('onEnd', '蛇撞墙啦！')
      return
    }
    this.moveBody()
    this.head.style.top = value + 'px'
    this.checkHitBody()
  }

  /**
   * 重置蛇定位
   */
  reset(): void {
    this.X = 140
    this.Y = 140
    this.bodiesPosition = [{ x: this.X, y: this.Y }]
    // 删除除了头的所有身体
    for (let i = 0; i < this.bodies.length; i++) {
      if (i > 0) {
        this.element.removeChild(this.bodies[i])
      }
    }
    this.bodies = [this.head]
  }

  /**
   * 添加蛇身
   */
  addBody(): void {
    let el = this.element.appendChild(document.createElement('div'))
    el.style.left = this.X + 'px'
    el.style.top = this.Y + 'px'
    this.bodies.push(el)
  }

  /**
   * 蛇移动
   * @param direction 方向按键事件
   */
  move(direction: string): void {

    let x = this.X
    let y = this.Y
    switch (direction) {
      case 'ArrowUp':
      case 'Up':
        // 蛇向上移动10
        y -= 10
        break;
      case 'ArrowDown':
      case 'Down':
        // 蛇向下移动10
        y += 10
        break;
      case 'ArrowLeft':
      case 'Left':
        // 蛇向左移动10
        x -= 10
        break;
      case 'ArrowRight':
      case 'Right':
        // 蛇向右移动10
        x += 10
        break;
    }
    this.X = x
    this.Y = y
  }

  /**
   * 移动身体
   */
  moveBody(): void {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      let x = this.bodies[i - 1].offsetLeft;
      let y = this.bodies[i - 1].offsetTop;
      this.bodies[i].style.left = x + 'px';
      this.bodies[i].style.top = y + 'px';
    }
  }

  /**
   * 检查是否撞到自己身体
   */
  checkHitBody() {
    for (let i = 3; i < this.bodies.length; i++) {
      if (this.X === this.bodies[i].offsetLeft && this.Y === this.bodies[i].offsetTop) {
        EventBus.emit('onEnd', '蛇撞到自己啦！')
        return
      }
    }
  }

}

export default Snake