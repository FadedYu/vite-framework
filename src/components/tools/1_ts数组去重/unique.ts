/**
 * 对象数组，完全去重，对象所有属性值都一模一样去重
 * 将对象转成json字符串，作为map的key，set保存去重后的值，实现整体去重
 * @param arr 源对象数组
 * @returns 去重后返回新对象数组
 */
function uniqueEvery<T>(arr: T[]): T[] {
  let map = new Map<string, boolean>();
  let result = new Set<T>();

  for (let i = 0; i < arr.length; i++) {
    let k = JSON.stringify(arr[i]);
    if (!map.has(k)) {
      map.set(k, true);
      result.add(arr[i]);
    }

  }
  // set转数组
  return Array.from(result);
}

/**
 * 对象数组，根据某属性去重，使用filter() 和 findIndex() 方法搭配
 * @param arr 源对象数组
 * @param key 指定某对象属性，作去重标准
 * @returns 去重后返回新对象数组
 */
function uniqueByFilter<T>(arr: Array<T>, key: keyof T): T[] {
  return arr.filter((item: T, index: number) => {
    return index === arr.findIndex(t => t[key] === item[key])
  })
}

/**
 * 对象数组，根据某属性去重，使用reduce() 方法
 * @param arr 源对象数组
 * @param key 指定某对象属性，作去重标准
 * @returns 去重后返回新对象数组
 */
function uniqueByReduce<T>(arr: T[], key: keyof T): T[] {
  let hash: { [key: string]: boolean } = {};

  return arr.reduce((accum: T[], item: T) => {
    hash[item[key] as string] ? "" : (hash[item[key] as string] = true, accum.push(item));
    return accum;
  }, []);
}

/**
 * 对象数组，根据某属性去重，使用map()的特性，key不会重复，将筛选属性提取出来作为map的key
 * 使用map.values() 方法返回一个新的迭代器对象。它包含按顺序插入 Map 对象中每个元素的 value 值
 * @param arr 源对象数组
 * @param key 指定某对象属性，作去重标准
 * @returns 去重后返回新对象数组
 */
function uniqueByMap<T>(arr: T[], key: keyof T): T[] {
  let map = new Map();
  for (let i of arr) {
    if (!map.has(i[key])) {
      map.set(i[key], i);
    }
  }
  return [...map.values()];
}
export { uniqueEvery, uniqueByFilter, uniqueByReduce, uniqueByMap }