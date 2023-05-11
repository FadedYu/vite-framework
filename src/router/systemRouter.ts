const routes = [
  {
    path: '/SnakeGame',
    component: () => import('@/components/module/2_贪吃蛇游戏/SnakeGame.vue'),
    meta: {
      title: '贪吃蛇游戏'
    }
  }
]

export default { routes }
