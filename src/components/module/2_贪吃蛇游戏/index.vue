<template>
  <div ref="panel" class="snake-container">
    <div class="stage-panel">
      <div class="stage">
        <div ref="snakeRef" class="snake">
          <div></div>
        </div>

        <div ref="foodRef" class="food">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div class="status">
        {{ scoreboard.status }}
      </div>
    </div>

    <div class="score-panel">
      <div>SCORE: {{ scoreboard.score }}</div>
      <div>LEVEL: {{ scoreboard.level }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

import GameController from './ts/GameController'

// 获取food的ref
const foodRef = ref()
const snakeRef = ref()
const panel = ref()
let scoreboard = reactive({
  status: '',
  score: 0,
  level: 1
})

onMounted(() => {
  new GameController({
    snakeEl: snakeRef.value,
    foodEl: foodRef.value,
    // 传递具有响应式的对象给控制器，以便在界面上同步显示
    scoreboard: scoreboard,
    speed: 200,
    maxLevel: 5,
    upScore: 1
  })
})
</script>

<style lang="less" scoped>
@bg-color: #b7d4a8;

.snake-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 100px auto;
  width: 360px;
  height: 420px;
  background-color: @bg-color;
  border: 10px solid black;
  border-radius: 30px;
  box-sizing: border-box;
  flex-direction: column;
  font: bold 20px Courier, sans-serif;

  .stage-panel {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .stage {
      position: relative;
      width: 302px;
      height: 302px;
      border: 2px solid black;

      /deep/.snake {
        & > div {
          position: absolute;
          width: 10px;
          height: 10px;
          background-color: black;
          border: 1px solid @bg-color;
        }
      }

      .food {
        position: absolute;
        display: flex;
        justify-content: space-around;
        width: 10px;
        height: 10px;
        border: 1px solid transparent;
        flex-flow: row wrap;
        align-content: space-around;

        & > div {
          width: 4px;
          height: 4px;
          background-color: black;
          transform: rotate(45deg);
        }
      }
    }

    .status {
      margin-top: 10px;
      height: 20px;
      font-size: 14px;
    }
  }

  .score-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
  }
}
</style>
