<template>
  <el-config-provider :locale="zhCn">
    <div>{{ hello }}</div>
    <custom-date-picker></custom-date-picker>
  </el-config-provider>
</template>

<script setup lang="ts">
import { zhCn } from 'element-plus/es/locale/index'
import { ref } from 'vue'

import CustomDatePicker from '@/components/views/CustomDatePicker.vue'

import './test/test'
let hello = ref('hello world')
</script>

<style scoped></style>
