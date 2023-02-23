<template>
  <el-config-provider :locale="zhCn">
    <CustomDatePicker></CustomDatePicker>
  </el-config-provider>
</template>

<script setup lang="ts">
import { zhCn } from 'element-plus/lib/locale/index'
import CustomDatePicker from './components/5_elementui/CustomDatePicker.vue';


</script>

<style scoped></style>
