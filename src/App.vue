<template>
  <el-config-provider :locale="zhCn">
    <div>hello world</div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { zhCn } from 'element-plus/lib/locale/index'
import './test/test'
</script>

<style scoped></style>
