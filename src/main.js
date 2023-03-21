import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import router from './router/index'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import gl from '../Global'
import re from './utils/request'

const app = createApp(App)
app.provide('global',{
    gl,
    re
})
app.use(router).use(ElementPlus, { locale }).mount('#app')
