<template>
  <div class="box">

    <a-steps :current="2" label-placement="vertical">
      <a-step>Succeeded</a-step>
      <a-step>Processing</a-step>
      <a-step>Pending</a-step>
    </a-steps>
    <div class="problem_box">
      <h3>请回答以下问题</h3>
      <a-textarea class="ShortAnswer" placeholder="请在这里输入" allow-clear auto-size/>
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


      <a-button type="primary" :loading="bLoading" @click="nextChallenge" style="width: 100px;">提交</a-button>
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
  padding: 130px 140px 0 140px;
  height: 800px;
  position: relative;

  .arco-steps-item {
    padding-bottom: 20px;
  }

  .problem_box {
    margin-top: 30px;

    .ShortAnswer {
      height: 89px;
      width: 664px;
    }

    .arco-radio,.arco-checkbox{
      margin: 20px 130px 20px 70px;
    }

    .arco-btn {
      position: absolute;
      bottom: 12%;
      left: 50%;
    }
  }


}

</style>