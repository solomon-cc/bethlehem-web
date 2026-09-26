import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import vuetify from './plugins/vuetify'
import { message, confirm } from './utils/feedback'
import './permission'

// Global styles
import '@/styles/index.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)

// Global properties for backward compatibility
app.config.globalProperties.$message = message
app.config.globalProperties.$confirm = confirm

app.mount('#app')
