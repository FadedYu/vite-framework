<template>
  <el-config-provider :locale="zhCn">
    <el-button>{{ x.toFixed(2) }}</el-button>
  </el-config-provider>
</template>

<script setup lang="ts">
import { zhCn } from 'element-plus/lib/locale/index'

let x = 1
</script>

<style scoped></style>
