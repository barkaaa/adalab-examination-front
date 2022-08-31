<template>
  <video-background
      :src="require('../assets/video/background.mp4')"
      style="max-height: 100%; height: 100vh;"
  >
  </video-background>
  <div class="main">
    <span class="title">Wellcome to Adalab！</span>
    <br/>
    <span class="text" id="output">{{ obj.output }}</span>
    <br/>
    <br/>
    <a href="https://github.com/login/oauth/authorize?client_id=d9f9e0e5413419ab273e&redirect_uri=http://localhost:9000/callback&scope=user&state=1">
    <img :src="require('../assets/github.svg')" alt="Login using Github" /></a>
  </div>
</template>

<script>

import {reactive, onMounted  } from 'vue'
import VideoBackground  from 'vue-responsive-video-background-player'
import EasyTyper from 'easy-typer-js'
let text = ['Adalab入学筛选','第一步，使用github以开始']
function setCookie(name, value, day) {
  let date = new Date()
  date.setDate(date.getDate() + day)
  document.cookie = name + '=' + value + ';expires=' + date
}
function changeStyle() {

  var obj = document.getElementById("output");

  obj.style.color= "red";



}
// 函数中的参数为 要获取的cookie键的名称。
function getCookie(c_name){
  if (document.cookie.length>0){
    let c_start=document.cookie.indexOf(c_name + "=");
    if (c_start!=-1){
      c_start=c_start + c_name.length+1;
      let c_end=document.cookie.indexOf(";",c_start);
      if (c_end==-1){
        c_end=document.cookie.length;
      }

      return unescape(document.cookie.substring(c_start,c_end));
    }
  }

  return "";
}
function checkCookie(c_name) {
  let username = getCookie(c_name);
  if (username!=null && username!=""){
    // 如果cookie值存在，执行下面的操作。
    return 'error'
  }
}

export default {
  components:{
    VideoBackground
  },
  setup(){
    // 计算属性
    const obj = reactive({
          output: '',
          isEnd: false,
          speed: 80,
          singleBack: true,
          sleep: 2000,
          type: 'nomal',
          backSpeed: 60,
          sentencePause: true
        }

    )

    if(checkCookie('NETERROR')==='error'){
      text=['网络错误请重试','也许你需要..']}


// 实例化

    onMounted(() => {

          const typed = new EasyTyper(obj, text)

        }
    )
    return{
      obj
    }
  },
  mounted() {
    if(checkCookie('NETERROR')==='error'){
      changeStyle();
      setCookie('NETERROR',null,-1)
  }

}
}



</script>

<style scoped>
.main {
  background: rgba(0, 0, 0, .8);
  position: absolute;
  top: 30%;
  left: 30%;
  width: 40%;
  text-align: center;
  border-radius: 1.5rem;
  box-shadow: 0 0 8px -5px #000000;
  padding: 3% 5px 5%;
  font-family: "Poppins", sans-serif;
}
span {
  color: #18d047;
  font-size: 3em;
  display: inline-block;
  line-height: 2em;
}
img {
  height: 2.2rem;
  margin: 0;
  user-select: none;
  cursor: pointer;
  -webkit-transition: all .4s ease;
  transition: all .4s ease
}
img:hover {
  cursor: pointer;
  border-radius: 200rem;
  -webkit-transform: scale(1.2);
  transform: scale(1.2);
  -webkit-filter: brightness(200%);
  filter: brightness(200%)
}
.title{
  font-family: "Fira Code","微软雅黑 Light",serif;
}
.text{
  font-size: 1em;
  border-right: .05em solid;
  animation: caret 1s steps(1) infinite;
  font-family: "Fira Code","微软雅黑 Light",serif;

}
@keyframes caret {
  50% {
    border-color: transparent;
  }
}
</style>