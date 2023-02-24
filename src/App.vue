<template>
  <el-config-provider :locale="zhCn">
  </el-config-provider>
</template>

<script setup lang="ts">
import { zhCn } from 'element-plus/lib/locale/index'
import { clone, deepCopy } from "./components/tools/2_深拷贝/CloneDeep";

const map = new Map();
map.set('key', 'value');
map.set('ConardLi', 'code秘密花园');

const set = new Set();
set.add('ConardLi');
set.add('code秘密花园');

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8],
  empty: null,
  map,
  set,
  bool: new Boolean(true),
  num: new Number(2),
  str: new String(2),
  symbol: Object(Symbol(1)),
  date: new Date(),
  reg: /\d+/,
  error: new Error('zheshiyige'),
  func1: () => {
    console.log('code秘密花园');
  },
  func2: function (a: number, b: number) {
    return a + b;
  }
}

let demo = {
  func2: function (a: number, b: number) {
    return a + b;
  }
}

let newDemo = deepCopy(demo)
console.log('深拷贝=====>', demo === newDemo);

console.log(demo);
demo.func2 = function (a: number, b: number) {
  return a * b;
}

console.log(newDemo);





</script>

<style scoped></style>
