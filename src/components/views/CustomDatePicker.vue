<template>
  <div>
    <el-date-picker v-model="value1" type="date" placeholder="请选择日期" />
  </div>
</template>

<script setup lang="ts">
import 'dayjs/locale/zh-cn'
import { ref } from 'vue'

const value1 = ref('')
</script>

<style scoped></style>
