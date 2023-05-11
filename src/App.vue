<template>
  <el-config-provider :locale="zhCn">
    <test-view></test-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { zhCn } from 'element-plus/es/locale/index'

import TestView from './test/TestView.vue'
</script>

<style scoped></style>
