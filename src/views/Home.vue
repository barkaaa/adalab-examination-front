<template>
  <div class="main-box">
    <aside>
      <div class="timer">
        <timer/>
      </div>
      <RankingPlugin v-bind:rankings="rankings"></RankingPlugin>
      <div class="leaderboard"></div>
      <div class="footer"></div>
    </aside>
    <main>
      <a-steps :current="cur" small>
        <a-step v-for="i in totalChallenge" @click="gotoChallenge(i)"></a-step>
      </a-steps>
      <!-- <router-view v-if="fresh" /> -->
      <challenge ref="Challenge" :key="componentKey"/>
      <div class="submit_box">
        <a-button type="primary" @click="nextChallenge" :loading="loading" :style="bStyle">
          <template #icon>
            <icon-double-right/>
          </template>
          {{ bVal }}
        </a-button>
      </div>
    </main>
  </div>
</template>

<script>
import Timer from "@/components/Timer";
import Challenge from "./Challenge.vue";
import RankingPlugin from "@/components/RankingPlugin.vue";
import {IconDoubleRight} from "@arco-design/web-vue/es/icon";
import {useChallengeStore} from "../store/challenge";
import {storeToRefs} from "pinia";
import {ref, nextTick, getCurrentInstance, reactive} from "vue";
import {useRouter} from 'vue-router'

export default {
  name: "Home",
  setup() {
    var currentInstance = getCurrentInstance();
    let {axios} = currentInstance.appContext.config.globalProperties;
    let router = useRouter();
    let bVal = ref("提交");
    // 控制第二次点击 1成功，2失败
    let status = ref(0);
    let loading = ref(false)
    const challenge = useChallengeStore();
    let {cur} = storeToRefs(challenge);
    let totalChallenge = ref(12);
    let bStyle = reactive({
      "background-color": "#1a8fdd"
    });
    let componentKey = ref(0);

    const nextChallenge = async () => {

      // 修改按钮状态
      bVal.value = "测评中";
      loading.value = true;
      bStyle["background-color"] = "#c3c3c3";


      // 成功
      if (status.value === 1) {
        //  刷新子组件
        if (challenge.cur < totalChallenge.value) challenge.cur++;
        if (challenge.cur === totalChallenge.value) {
          // 已通关，跳到通关页面
          await router.push("/success");
        }
        forceRerender();
        //  按键恢复
        btnReset();
        return;
      } else if (status.value === 2) {
        // 失败
        status.value = 0;
        await nextChallenge();
        return;
      }

      // 获取题目类型
      const res = await axios.get("/api/challenge-type/getone", {
        params: {
          stage: challenge.cur + 1,
        }
      })
      let type = res.data.type;
      // 问卷调查：
      if (type === 1) {
        //调用子组件方法，收集信息
        // 直接调用成功方法
        btnSuccess();
      } else if (type === 2) {
        // markdown闯关：发起请求验证代码是否有误
        // 根据返回结果，分别调用
        // 成功
        btnSuccess();
        // 失败
        // btnFail();
      }
    };
    const gotoChallenge = async (i) => {
      challenge.cur = i;
      forceRerender();
    }

    const btnSuccess = () => {
      bVal.value = "下一关"
      bStyle["background-color"] = "#006a4e";
      loading.value = false;
      status.value = 1;

    };
    const btnFail = () => {
      bVal.value = "闯关失败"
      bStyle["background-color"] = "#cc0000";
      loading.value = false;
      status.value = 2;
    }

    const btnReset = () => {
      bVal.value = "提交";
      loading.value = false;
      bStyle["background-color"] = "#1a8fdd";
    }
    const forceRerender = () => {
      componentKey.value += 1;
    };

    return {
      loading,
      challenge,
      cur,
      nextChallenge,
      gotoChallenge,
      totalChallenge,
      componentKey,
      forceRerender,
      btnFail,
      btnSuccess,
      btnReset,
      bVal,
      bStyle,
      status
    };
  },
  async mounted() {
    await this.getData();
    await this.getRanking();
  },
  methods: {
    getData() {
      this.axios.get("/api/examination/student-info").then((res) => {
        this.users = res.data;
      });
    },
    getRanking() {
      this.axios.get("/api/studentInfo/getRanking").then((res) => {
        this.rankings = res.data;
      });
    },

    handle() {
      this.$refs.Challenge.test();
    },
  },
  components: {
    Timer,
    RankingPlugin,
    IconDoubleRight,
    Challenge,
  },
  data() {
    return {
      users: [],
      rankings: [],
    };
  },
};
</script>

<style scoped lang="less">
.main-box {
  display: flex;
  width: 100%;

  aside {
    width: 25%;
    background-color: #eee;

    .timer {
      margin: 16% 7% 0 7%;
      border-bottom: 1px solid #000;
      padding-bottom: 12%;
    }

    .leaderboard {
    }

    .footer {
    }
  }

  main {
    width: 75%;
    margin: 8% 7% 0 7%;

    .submit_box {
      margin: 5% 0;
      display: flex;
      justify-content: center;
    }
  }
}
</style>