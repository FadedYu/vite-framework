<template>
  <div class="snake-container">
    <div class="stage">

      <div ref="snakeRef" class="snake">
        <!-- 蛇的各部分 -->
        <div></div>
        <div></div>
      </div>

      <div ref="foodRef" class="food">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>

    <div class="score-panel">
      <div>SCORE: {{ scoreboard.score }}</div>
      <div>LEVEL: {{ scoreboard.level }}</div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { Food } from "./ts/Food";

// 获取food的ref
const foodRef = ref()
let scoreboard = reactive({
  score: 0,
  level: 1
})

onMounted(() => {

  let food = new Food(foodRef.value)
  setInterval(() => {
    food.changePostion()
  }, 1000)


})



</script>

<style lang="less" scoped>
@bg-color: #b7d4a8;

.snake-container {
  width: 360px;
  height: 420px;
  margin: 100px auto;
  background-color: @bg-color;
  box-sizing: border-box;
  border: 10px solid black;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font: bold 20px "Courier";

  .stage {
    position: relative;
    width: 302px;
    height: 302px;
    border: 2px solid black;

    .snake {
      &>div {
        position: absolute;
        left: 0;
        top: 0;
        width: 10px;
        height: 10px;
        background-color: black;
        border: 1px solid @bg-color;
      }
    }

    .food {
      position: absolute;
      width: 10px;
      height: 10px;
      display: flex;
      flex-flow: row wrap;
      align-content: space-around;
      justify-content: space-around;
      border: 1px solid transparent;

      &>div {
        width: 4px;
        height: 4px;
        background-color: black;
        transform: rotate(45deg);
      }
    }
  }

  .score-panel {
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>