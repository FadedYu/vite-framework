import type { App, VNode } from "vue";
import { createVNode, render } from "vue";
import Loading from "./index.vue";

export default {
  install(app: App) {
    const vNode: VNode = createVNode(Loading)
    render(vNode, document.body)
    app.config.globalProperties.$loading = {
      show: vNode.component?.exposed?.show,
      hide: vNode.component?.exposed?.hide
    }

  }
}