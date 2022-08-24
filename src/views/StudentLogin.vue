<template>
  <div class="main">
    <span class="title">Wellcome to Adalab！</span>
    <br/>
    <span class="text">{{ obj.output }}</span>
    <br/>
    <img src="../assets/github.svg" alt="Login using Github" />
  </div>
</template>

<script setup>
import { reactive, onMounted  } from 'vue'
// 引入
import EasyTyper from 'easy-typer-js'

// 计算属性
const obj = reactive({
      output: '',
      isEnd: false,
      speed: 80,
      singleBack: true,
      sleep: 10,
      type: 'nomal',
      backSpeed: 40,
      sentencePause: true
    }

)

// 实例化
const text = ['Adalab入学筛选','第一步，使用github以开始']
onMounted(() => {

      const typed = new EasyTyper(obj, text)

    }
)

</script>

<style scoped>
.main {
  background: rgba(255, 255, 255, 0.4);
  position: absolute;
  top: 20%;
  left: 30%;
  width: 40%;
  text-align: center;
  border-radius: 3rem;
  box-shadow: 0 0 8px -5px #000000;
  padding: 3% 5px 5%;
  font-family: "Poppins", sans-serif;
}
span {
  font-size: 3em;



}
.text{
  border-right: .05em solid;
  animation: caret 1s steps(1) infinite;
}
@keyframes caret {
  50% {
    border-color: transparent;
  }
}
</style>