<template>
  <el-config-provider :locale="zhCn"> </el-config-provider>
</template>

<script setup lang="ts">
import { zhCn } from 'element-plus/lib/locale/index'

const source = [
  {
    id: 1,
    name: 'a'
  },
  {
    id: 2,
    name: 'b'
  },
  {
    id: 3,
    name: 'c'
  }
]
let newA = Reflect.ownKeys(source)
console.log(newA)
</script>

<style scoped></style>
