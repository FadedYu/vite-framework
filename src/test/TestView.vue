<template>
  <div>{{ name }}</div>
  <br />
  <el-button @click="buttonClick">修改name</el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let name = ref('测试')

let buttonClick = (event: Event) => {
  console.log(event)
}
</script>

<style lang="less" scoped></style>
