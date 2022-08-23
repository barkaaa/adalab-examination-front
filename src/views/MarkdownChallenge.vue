<template>
  markdown闯关
  <a-space>
    <a-button type="primary" :loading="loading" @click="handleClick" shape="round">{{ btm }}</a-button>
  </a-space>
</template>

<script>
import {onBeforeMount, ref} from 'vue';

export default {
  name: "MarkdownChallenge",

  setup() {
    let loading = ref(false);
    let btm = ref("点击提交");
    const handleClick = () => {
      loading.value = !loading.value
      btm = '正在测评'
    }
    onBeforeMount(()=>{


      // 获取markdown数据

      // 解析markdown数据并渲染到页面中
      // this.markdownIt.render()
    })
    return {
      loading, btm, handleClick
    }

  }
}
</script>

<style scoped>

</style>
