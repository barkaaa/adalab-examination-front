import {createApp} from 'vue'

import App from './App.vue'
import router from "./router";
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import axios from "axios";
// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon';


// import Hljs from "highlight.js"
// 解析markdown
// import {marked} from 'marked'
// import "highlight.js/styles/atelier-plateau-light.css"
// const rendererMD = new marked.Renderer();
// marked.setOptions({
//     renderer: rendererMD,
//     gfm: true,
//     tables: true,
//     breaks: false,
//     pedantic: false,
//     sanitize: false,
//     smartLists: true,
//     smartypants: false,
//     highlight(code) {
//         return Hljs.highlightAuto(code).value
//     }
// });//基本设置
const app = createApp(App);
// app.config.globalProperties.markded = marked;
app.config.globalProperties.axios = axios;
app.use(ArcoVue);
app.use(router);
// 额外引入图标库
app.use(ArcoVueIcon);

app.mount('#app')
