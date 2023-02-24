<template>
  <div v-if="isShow" class="loading">
    Loading……
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isShow = ref<boolean>(false)

const show = () => isShow.value = true
const hide = () => isShow.value = false

defineExpose({
  isShow,
  show,
  hide
})

</script>

<style lang="less" scoped>
.loading {
  background: black;
  opacity: 0.8;
  font-size: 30px;
  color: white;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>