<template>
  <div></div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from "vue";

const instance = getCurrentInstance()
instance?.proxy?.$loading.show()

setTimeout(() => {
  instance?.proxy?.$loading.hide()
}, 3000)


</script>

<style scoped></style>
