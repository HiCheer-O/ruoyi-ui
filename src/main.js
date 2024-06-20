import { createApp } from 'vue'
import '@/assets/reset.css'

import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import App from './App.vue'
import router from "@/router/index.js";
import pinia from "@/store/index.js";

const app = createApp(App);

// 添加路由 router
app.use(router)

// 添加 pinia
app.use(pinia)

// element-ui 国际化配置配置
app.use(ElementPlus, {
	locale: zhCn,
})

// 挂载
app.mount('#app')
