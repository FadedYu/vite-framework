import type { App, VNode } from 'vue'
import { createVNode, render } from 'vue'
import CustomLoading from './index.vue'

export default {
  install(app: App) {
    const vNode: VNode = createVNode(CustomLoading)
    render(vNode, document.body)
    app.config.globalProperties.$customLoading = {
      show: vNode.component?.exposed?.show,
      hide: vNode.component?.exposed?.hide
    }
  }
}
