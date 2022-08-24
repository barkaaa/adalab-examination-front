<template>
  <div class="box">

    <div class="problem_box">
      <h3>请回答以下问题</h3>
      <a-textarea placeholder="请在这里输入" allow-clear auto-size/>
    </div>

    <div class="problem_box">
      <h3>请选择一个答案</h3>
      <a-radio-group>
        <a-radio value="A"> Radio</a-radio>
        <a-radio value="B"> Radio</a-radio>
        <a-radio value="C"> Radio</a-radio>
        <a-radio value="D"> Radio</a-radio>
      </a-radio-group>
    </div>

    <div class="problem_box">
      <h3>请选择一个或多个答案</h3>
      <a-checkbox value="1">Option 1</a-checkbox>
      <a-checkbox value="1">Option 1</a-checkbox>
      <a-checkbox value="1">Option 1</a-checkbox>
      <a-checkbox value="1">Option 1</a-checkbox>
    </div>

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
    const active = ref(0)
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
  width: 80%;
  .problem_box {
    margin-top: 4%;


    .arco-textarea-wrapper {
      height: 20%;

      background-color: #fff;
      padding: 1%;
      border: 1px solid #EEE;
      border-radius: 6px;
    }
    .arco-radio-group{
      width: 100%;
      height: 100%;
      .arco-radio {
        width: 20%;
        margin: 2% 8% 2% 8%;
      }
    }
    .arco-checkbox{
      margin: 2% 8% 2% 8%;
      width: 20%;
      height: 10%;
    }
  }




}

</style>