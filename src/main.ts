import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { registerPlugins } from '@/utils/plugins'

registerPlugins(createApp(App)).mount('#app')
