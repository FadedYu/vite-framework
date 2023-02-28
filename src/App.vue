<template>
  <el-config-provider :locale="zhCn">
    <el-button @click="onClick($event)">点击</el-button>
  </el-config-provider>
</template>

<script setup lang="ts">
import { zhCn } from 'element-plus/lib/locale/index'
import { throttle } from './components/tools/3_节流和防抖/throttle';
// import { throttle } from 'lodash';

let onClick = throttle((a: Event) => {
  console.log('节流后执行');
}, 3000, true)

</script>

<style scoped></style>
