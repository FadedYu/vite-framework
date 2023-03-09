/**
 * 将多维数组扁平化成一维数组
 * arr = [[1, 2, [3, 11, 22, [222, 99, 100]]],[4, 5, '6'],[7, 8, 9]]
 * 转换后
 * newArr = [1, 2, 3, 11, 22, 222, 99, 100, 4, 5, 6, 7, 8, 9]
 */

/**
 * 将多维数组扁平化成一维数组。
 * 使用reduce和递归方式
 *
 * @param arr 原多维数组
 * @returns 返回一维数组
 */
function flattenByReduce<T>(arr: T[]): T[] {
  return arr.reduce((pre: T[], ele: T) => {
    return pre.concat(Array.isArray(ele) ? flattenByReduce(ele) : ele)
  }, [])
}

/**
 * 将多维数组扁平化成一维数组。
 * 使用普通递归方式
 *
 * @param arr 原多维数组
 * @returns 返回一维数组
 */
function flattenByRecursive<T>(arr: T[]): T[] {
  let result: T[] = []
  for (const item of arr) {
    if (Array.isArray(item)) {
      // 递归展平结果拼接到结果数组
      result = result.concat(flattenByRecursive(item))
    }
    // 否则直接加入结果数组
    else {
      result.push(item)
    }
  }
  return result
}

/**
 * 利用数组的flat()，返回一个新数组，其中所有子数组元素都连接在其中，递归地直到指定深度。
 * @param arr 多维数组
 * @param depth 指定深度，即指定扁平到几维，默认一维
 */
function flatten<T>(arr: T[], depth = Infinity) {
  return arr.flat(depth)
}

export { flattenByReduce, flattenByRecursive, flatten }
