<template>
  <el-config-provider :locale="zhCn">
    <el-button>点击</el-button>
  </el-config-provider>
</template>

<script setup lang="ts">
import { zhCn } from 'element-plus/lib/locale/index'
import { debounce } from './components/tools/3_节流和防抖/debounce';
// import { throttle } from 'lodash';

let a = '11'
let demo = {
  a: 'a',
  b: function () {
    console.log(this.a);
  },
  c: () => {
    console.log(this);
    // console.log(this.a);
  }
}
demo.b()
demo.c()
</script>

<style scoped></style>
