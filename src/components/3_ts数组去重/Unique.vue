<template>
  <div></div>
</template>

<script setup lang="ts">
import { type } from 'os';



interface Demo {
  id: number,
  name: string,
  age: number
}
let demo: Demo[] = [
  {
    id: 1,
    name: '张三',
    age: 18
  },
  {
    id: 2,
    name: '李四',
    age: 20
  },
  {
    id: 1,
    name: '张三',
    age: 18
  },
  {
    id: 3,
    name: '赵六',
    age: 30
  },
]

/**
 * 对象数组完全去重，对象一模一样去重
 * @param arr 去重的对象数组
 */
function unique1<T>(arr: T[]): T[] {
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
 * @param arr 去重的对象数组
 */
function unique2<T>(arr: Array<T>, key: keyof T): T[] {
  return arr.filter((item: T, index: number) => {
    return index === arr.findIndex(t => t[key] === item[key])
  })
}

/**
 * 对象数组，根据某属性去重，使用reduce() 方法
 * @param arr 去重的对象数组
 */
function unique3<T>(arr: T[], key: keyof T): T[] {
  let hash: { [key: string]: boolean } = {};

  return arr.reduce((accum: T[], item: T) => {
    hash[item[key] as string] ? "" : (hash[item[key] as string] = true, accum.push(item));
    return accum;
  }, []);
}

/**
 * 对象数组，根据某属性去重，使用map()的特性，key不会重复，将筛选属性提取出来作为map的key
 * 使用map.values() 方法返回一个新的迭代器对象。它包含按顺序插入 Map 对象中每个元素的 value 值
 * @param arr 去重的对象数组
 */
function unique4<T>(arr: T[], key: keyof T): T[] {
  let map = new Map();
  for (let i of arr) {
    if (!map.has(i[key])) {
      map.set(i[key], i);
    }
  }
  return [...map.values()];
}

</script>

<style lang="less" scoped></style>