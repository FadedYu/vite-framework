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
  // eslint-disable-next-line no-new
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
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 360px;
  height: 420px;
  margin: 100px auto;
  font: bold 20px Courier, sans-serif;
  background-color: @bg-color;
  border: 10px solid black;
  border-radius: 30px;

  .stage-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

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
        flex-flow: row wrap;
        align-content: space-around;
        justify-content: space-around;
        width: 10px;
        height: 10px;
        border: 1px solid transparent;

        & > div {
          width: 4px;
          height: 4px;
          background-color: black;
          transform: rotate(45deg);
        }
      }
    }

    .status {
      height: 20px;
      margin-top: 10px;
      font-size: 14px;
    }
  }

  .score-panel {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 300px;
  }
}
</style>
