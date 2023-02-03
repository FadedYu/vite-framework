<template>
  <div>
    <ul>
      <li class="item1">item 1</li>
      <li class="item2">item 2</li>
      <li class="item3">item 3</li>
      <li class="item4">item 4</li>
      <li class="item5">item 5</li>
      <li class="item6">item 6</li>
    </ul>
    <a href="" target="_blank" rel="noopener noreferrer"></a>
  </div>
</template>

<script setup lang="ts">

const a: number = 123
const b: string = 'aa'


let c: Function = (): string => {
  return a + b
}
let d = c()
console.log(d);


</script>

<style lang="less" scoped>

</style>