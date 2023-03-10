/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 函数防抖，n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效
 * @param handle 需要防抖的函数，回调
 * @param wait 需要防抖的毫秒
 * @param immediate 是否立即执行，开启后，先执行函数后必须等待防抖时间过后才能再执行函数
 * @returns 返回当前函数
 */
function debounce(handle: (...args: any[]) => void, wait?: number | boolean, immediate?: boolean) {
  if (typeof handle !== 'function') throw new Error('handle must be an function')
  if (typeof wait === 'undefined') wait = 1000
  // 如果只传入 handle 和 immediate
  if (typeof wait === 'boolean') {
    immediate = wait
    wait = 1000
  }
  //immediate默认为flase
  if (typeof immediate !== 'boolean') immediate = false
  // 防抖
  let timer: ReturnType<typeof setTimeout> | undefined = undefined
  return function (this: any, ...args: any[]) {
    const init = immediate && !timer
    clearTimeout(timer)
    timer = setTimeout(() => {
      !immediate && handle.apply(this, args)
      timer = undefined
    }, wait as number)
    // 如果立即执行
    init && handle.apply(this, args)
  }
}

export { debounce }
