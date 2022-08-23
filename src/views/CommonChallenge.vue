<template>
  <div class="box">

    <h3>请回答以下问题</h3>
    <a-textarea class="ShortAnswer" placeholder="请在这里输入" allow-clear auto-size/>


    <h3>请选择一个答案</h3>
    <a-radio-group>
      <a-radio value="A"> Radio</a-radio>
      <a-radio value="B"> Radio</a-radio>
      <a-radio value="C"> Radio</a-radio>
      <a-radio value="D"> Radio</a-radio>
    </a-radio-group>


    <h3>请选择一个或多个答案</h3>
    <a-space direction="vertical" size="medium">
      <a-space size="medium">
        <a-checkbox value="1">Option 1</a-checkbox>
        <a-checkbox value="1">Option 1</a-checkbox>
      </a-space>
      <a-space size="medium">
        <a-checkbox value="1">Option 1</a-checkbox>
        <a-checkbox value="1">Option 1</a-checkbox>
      </a-space>
    </a-space>
    <a-button type="primary" :loading="bLoading" @click="nextChallenge">提交</a-button>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "CommonChallenge",
  data() {
    return {}
  },
  setup() {
    const bLoading = ref(false);
    const nextChallenge = () => {
      bLoading.value = !bLoading.value
    }
    return {
      bLoading, nextChallenge
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
.box {
  height: 800px;
  position: relative;

  .ShortAnswer {
    height: 89px;
    width: 664px;
  }

  .arco-btn {
    position: absolute;
    bottom: 6%;
    left: 50%;
  }
}

</style>