import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 自定义插件 loading
import customLoading from './components/plugins/Loading'

const app = createApp(App)
app.use(customLoading)

app.mount('#app')
