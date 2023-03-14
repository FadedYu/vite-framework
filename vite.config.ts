import { defineConfig, splitVendorChunk } from 'vite'
import vue from '@vitejs/plugin-vue'

// 打包文件大小可视化视图预览插件，查看打包模块占用的空间
import { visualizer } from 'rollup-plugin-visualizer'

// 自动import与按需导入策略插件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// elementPlus 按需导入插件
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const getVendorChunk = splitVendorChunk()
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    visualizer({
      emitFile: true,
      filename: 'stats.html'
    })
  ],
  build: {
    rollupOptions: {
      output: {
        /**
         * 2.以函数的形式使用
         * 将第三方包全部打包在一个chunk中，名称叫 vendor
         */
        manualChunks: (id, options) => {
          if (id.indexOf('lodash') !== -1) {
            return 'lodash'
          }
          return getVendorChunk(id, options)
        }
      }
    }
  }
})
