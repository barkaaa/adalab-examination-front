<template>
  <div class="box">
    <div class="problem_box" v-for="item in res">
      <h3>{{ item.theme }}</h3>
      <a-textarea placeholder="请在这里输入" allow-clear auto-size v-if="item.questionType===1"/>

      <a-radio-group v-if="item.isMultiple==='false'">
        <a-radio :value="option" v-if="item.isMultiple==='false'&&item.questionType===2" v-for="option in item.options.split('?').slice(0,-1)" >
          {{
            option
          }}
        </a-radio>
      </a-radio-group>
      <a-checkbox :value="1" v-for="option in item.options.split('?').slice(0,-1)" v-if="item.isMultiple==='true'&&item.questionType===2">{{
          option
        }}
      </a-checkbox>
    </div>

  </div>
</template>

<script>
import {ref, onBeforeMount, getCurrentInstance} from "vue";
import {useChallengeStore} from "@/store/challenge";
import {storeToRefs} from "pinia";

export default {
  name: "CommonChallenge",
  data() {
    return {}
  },
  setup() {

    const {axios} = getCurrentInstance().appContext.config.globalProperties
    const bLoading = ref(false);

    const challenge = useChallengeStore();
    let {cur} = storeToRefs(challenge);
    let res = ref([]);
    const nextChallenge = () => {
      bLoading.value = !bLoading.value
    }
    onBeforeMount(async () => {
      let r = await axios.get("/api/questionnaire/getone", {
        params: {missionNum: cur.value}
      })
      res.value = r.data
    })
    return {
      bLoading, nextChallenge, res,cur
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

    .arco-radio-group {
      width: 100%;
      height: 100%;

      .arco-radio {
        width: 20%;
        margin: 2% 8% 2% 8%;
      }
    }

    .arco-checkbox {
      margin: 2% 8% 2% 8%;
      width: 20%;
      height: 10%;
    }
  }


}

</style>