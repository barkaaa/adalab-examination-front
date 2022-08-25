<template>
  <video-background
      :src="require('../assets/video/background.mp4')"
      style="max-height: 100%; height: 100vh;"
  >
  </video-background>
  <div class="main">
    <span class="title">Wellcome to Adalab！</span>
    <br/>
    <span class="text">{{ obj.output }}</span>
    <br/>
    <br/>
    <a href="https://github.com/login/oauth/authorize?client_id=d9f9e0e5413419ab273e&redirect_uri=http://localhost:8080/callback&scope=user&state=1">
    <img :src="require('../assets/github.svg')" alt="Login using Github" /></a>
  </div>
</template>

<script>

import {reactive, onMounted  } from 'vue'
import VideoBackground  from 'vue-responsive-video-background-player'
// 引入
import EasyTyper from 'easy-typer-js'
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

// 实例化
    const text = ['Adalab入学筛选','第一步，使用github以开始']
    onMounted(() => {

          const typed = new EasyTyper(obj, text)

        }
    )
    return{
      obj
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
  color: #19c745;
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