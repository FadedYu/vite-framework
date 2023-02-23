import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import Loading from './components/4_vue插件/Loading'

const app = createApp(App)

app.use(Loading)

app.mount('#app')
