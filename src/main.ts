import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// elementUI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 自定义插件 loading
import customLoading from './components/plugins/Loading'

const app = createApp(App)
app.use(ElementPlus)
app.use(customLoading)

app.mount('#app')
