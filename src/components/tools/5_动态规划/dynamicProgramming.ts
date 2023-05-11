/**
 * 斐波拉契数列
 * @description 计算斐波那契数列：斐波那契数列指的是这样一个数列。
 * 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233，377，610…
 * 这个数列从第3项开始，每一项都等于前两项之和。
 * @example F(0) = 0，F(1) = 1;
 * 当 n >= 2时，F(n) = F(n-1) + F(n-2); 求F(n)
 * @param n n
 */
function fibo(n: number) {
  if (n <= 0) return 0
  if (n <= 1) return 1
  let sum
  let a = 0
  let b = 1
  for (let i = 2; i <= n; i++) {
    sum = a + b
    a = b
    b = sum
  }
  return sum
}

/**
 * 找出所有路径问题
 * @description 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“start” ）。
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“finish”）。
 * 问总共有多少条不同的路径。
 * @example 示例：
 * __________________________
 * | start |   3   |   1    |
 * --------------------------
 * |   1   |   5   |   1    |
 * --------------------------
 * |   4   |   2   | finish |
 * --------------------------
 * @param x x
 * @param y y
 */
function countPaths(x: number, y: number): number {
  const ways = new Array(x + 1)
  for (let i = 0; i <= x; i++) {
    ways[i] = new Array(y + 1)
  }

  // 上方扩展一行，使其值为0
  for (let i = 0; i <= y; i++) {
    ways[0][i] = 0
  }

  // 边上扩展一列，使其值为0
  for (let j = 0; j <= x; j++) {
    ways[j][0] = 0
  }

  // 设置初始值，起点走法为1，只能一步一步走
  ways[1][1] = 1

  for (let a = 1; a <= x; a++) {
    for (let b = 1; b <= y; b++) {
      if (a === 1 && b === 1) {
        continue
      }
      // 套用状态转换方程
      ways[a][b] = ways[a][b - 1] + ways[a - 1][b]
    }
  }

  return ways[x][y]
}

/**
 * 最小路径和
 * @description 给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
 * 说明：每次只能向下或者向右移动一步。
 * @example 示例: 输入:
 * _____________
 * | 1 | 3 | 1 |
 * -------------
 * | 1 | 5 | 1 |
 * -------------
 * | 4 | 2 | 1 |
 * -------------
 * 输出: 7
 * @param grid 网格组
 */
function minPathSum(grid: number[][]): number {
  if (!Array.isArray(grid)) {
    throw new Error('请输入二维数组')
  }

  // 新建一个二维数组，用来保存权重的值
  const sum = new Array(grid.length)
  for (let i = 0; i < grid[0].length; i++) {
    sum[i] = new Array(grid[0].length)
  }

  // 起点初始权重确定值
  sum[0][0] = grid[0][0]

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (i === 0 && j === 0) {
        continue
      }
      // 边上的权重处理
      if (i - 1 < 0) {
        sum[i][j] = sum[i][j - 1] + grid[i][j]
      } else if (j - 1 < 0) {
        sum[i][j] = sum[i - 1][j] + grid[i][j]
      } else {
        sum[i][j] = Math.min(sum[i - 1][j], sum[i][j - 1]) + grid[i][j]
      }
    }
  }

  return sum[grid.length - 1][grid[0].length - 1]
}

export { fibo, countPaths, minPathSum }
