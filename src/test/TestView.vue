<template>
  <el-button @click="doSome">Default</el-button>
</template>

<script setup lang="ts">
// import { throttle } from '@/components/tools/3_节流和防抖/throttle'
import { debounce } from '@/components/tools/3_节流和防抖/debounce'
const doSome = debounce(
  e => {
    console.log(e)
  },
  2000,
  true
)
</script>

<style lang="less" scoped></style>
