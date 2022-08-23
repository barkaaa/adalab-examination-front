import {createApp} from 'vue'
import App from './App.vue'
import router from "./router";
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import axios from "axios";
// 解析markdown
import MarkdownIt from "markdown-it"


const app = createApp(App);
app.config.globalProperties.markdownIt = new MarkdownIt();
app.config.globalProperties.axios = axios;
app.use(ArcoVue);
app.use(router);

app.mount('#app')
