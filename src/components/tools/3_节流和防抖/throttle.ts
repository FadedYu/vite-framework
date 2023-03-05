/**
 * 函数节流,n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效
 * @param handle 要节流的函数，回调
 * @param wait 需要节流的毫秒
 * @param immediate 是否立刻执行
 * @returns
 */
function throttle(handle: () => void, wait?: number | boolean, immediate?: boolean) {
  if (typeof handle !== 'function') throw new Error('handle must be an function')
  if (typeof wait === 'undefined') wait = 1000
  //如果只传入 handle 和 immediate
  if (typeof wait === 'boolean') {
    immediate = wait
    wait = 1000
  }
  //immediate默认为flase
  if (typeof immediate !== 'boolean') immediate = false
  //定义变量记录上一次执行的时间
  let previous = 0
  let timer: ReturnType<typeof setTimeout> | undefined = undefined
  return function (this: unknown, ...args: []) {
    //获取当前时间
    const now = +new Date()
    //如果不立即执行，则interval一直等于wait时间
    if (!immediate) previous = now
    // 计算间隔时间
    const interval = (wait as number) - (now - previous)
    if (interval <= 0) {
      // 说明要立即执行
      clearTimeout(timer)
      timer = undefined
      handle.apply(this, args)
      previous = +new Date()
    } else if (!timer && !immediate) {
      // 当我们发现系统中有一个定时器了，就意味着我们不需要再开定时器
      // 此刻就说明这次的操作发生了在我们定义的频次时间范围内，那就不应该执行handle
      // 当没有定时器时，这个时候我们就可以自定义一个定时器，让handle在interval之后去执行
      timer = setTimeout(() => {
        clearTimeout(timer) //清除定时器
        timer = undefined
        handle.apply(this, args)
        previous = +new Date()
      }, interval)
    }
  }
}

export { throttle }
