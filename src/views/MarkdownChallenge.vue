<template>
markdown闯关
  <a-space>
    <a-button type="primary" :loading="loading" @click="handleClick" shape="round" >{{btm}}</a-button>
  </a-space>
</template>

<script>
import { ref } from 'vue';
export default {
  name: "MarkdownChallenge",
  data() {
    return {
      loading : ref(false),
      btm:'点击提交'
    }
  },
  methods:{
    handleClick(){
      this.loading= !this.loading
      this.btm = '正在测评'
    }
  },
}
</script>

<style scoped>

</style>
