<template>
  <div>
    <table border="true" style="width: 800px;text-align: center;">
      <thead>
        <tr>
          <td> 商品 </td>
          <td> 数量 </td>
          <td> 单价 </td>
          <td> 价格 </td>
          <td> 操作 </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in shop" :key="index">
          <td> {{ item.name }} </td>
          <td>
            <button @click="addAndSum(item, false)"> - </button>
            {{ item.num }}
            <button @click="addAndSum(item, true)"> + </button>
          </td>
          <td> {{ item.price }} </td>
          <td> {{ item.num * item.price }} </td>
          <td><button @click="remove(index)">删除</button></td>
        </tr>
      </tbody>
      <tfoot>
        <td></td>
        <td></td>
        <td></td>
        <td>总价：{{ total }}</td>
        <td></td>
      </tfoot>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';


type Shop = {
  name: string,
  num: number,
  price: number
}
const shop = reactive<Shop[]>([
  {
    name: '商品1',
    num: 1,
    price: 10
  },
  {
    name: '商品2',
    num: 1,
    price: 20
  },
  {
    name: '商品3',
    num: 1,
    price: 30
  }
])

const addAndSum = (item: Shop, type: boolean): void => {
  if (item.num > 1 && !type) {
    item.num--
  }
  if (item.num < 100 && type) {
    item.num++
  }
}

const remove = (index: number): void => {
  shop.splice(index, 1)
}

/* function totalPrice(): number {
  return shop.reduce((pre, next) => {
    return pre + (next.num * next.price)
  }, 0)
} */

let total = computed<number>(() => {
  return shop.reduce((pre, next) => {
    return pre + (next.num * next.price)
  }, 0)
})

</script>

<style scoped>

</style>