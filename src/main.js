import {createApp} from 'vue'

import App from './App.vue'

import router from "./router";
// 组件库
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
// 发送请求
import axios from "axios";
// 解析markdown
import Hljs from "highlight.js"
import {marked} from 'marked'
import "highlight.js/styles/atelier-plateau-light.css"
// 状态管理

import {createPinia} from "pinia"
const pinia = createPinia();

// import Test from "@/Test";
// 配置markdown渲染
const rendererMD = new marked.Renderer();
marked.setOptions({
    renderer: rendererMD,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight(code) {
        return Hljs.highlightAuto(code).value
    }
});


const app = createApp(App);
app.config.globalProperties.markded = marked;
app.config.globalProperties.axios = axios;
app.use(ArcoVue);
app.use(router);
// 额外引入图标库
app.use(ArcoVueIcon);
app.use(pinia)
app.mount('#app')
