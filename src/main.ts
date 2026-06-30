import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index.js'
import App from './App.vue'
import './assets/main.css'

const app = createApp(App).use(createPinia()).use(router)
router.isReady().then(() => app.mount('#app'))
