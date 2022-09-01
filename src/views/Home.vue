<template>
  <div class="main-box">
    <aside>
      <div class="timer">
        <timer :uName="user.name" :avatar="user.avatar" :cDate="user.cDate"/>
      </div>
      <RankingPlugin v-bind:rankings="rankings"></RankingPlugin>
      <div class="leaderboard"></div>
      <div class="footer"></div>
    </aside>
    <main>
      <a-steps :current="cur" small>
        <a-step v-for="i in totalChallenge" @click="gotoChallenge(i)">
          <template #icon v-if="i <= user.maxChallenge">
            <icon-check/>
          </template>
        </a-step>
      </a-steps>

      <!-- <router-view v-if="fresh" /> -->
      <challenge ref="Challenge" :key="componentKey"/>
      <div
          v-if="cur > totalChallenge"
          style="text-align: center; font-size: 60px; padding: 100px"
      >
        您通关了
      </div>
      <div class="submit_box">
        <a-button
            v-if="cur <= totalChallenge"
            type="primary"
            @click="nextChallenge"
            :loading="loading"
            :style="bStyle"
        >
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
import {ref, getCurrentInstance, reactive} from "vue";
import {useRouter} from "vue-router";

export default {
  name: "Home",
  setup() {

    // 公共工具
    let currentInstance = getCurrentInstance();
    let {axios} = currentInstance.appContext.config.globalProperties;
    let router = useRouter();
    const challenge = useChallengeStore();
    // 共享值  关卡状态
    let {cur} = storeToRefs(challenge);
    let totalChallenge = ref();


    // 题目类型
    let type = ref();

    // 用户id
    const userId = ref();
    // 当前用户信息
    let user = reactive({
      "name": "",
      "avatar": "",
      "cData": "",
      "maxChallenge": 0
    });
    // 按钮状态
    let bVal = ref("提交");
    // 控制第二次点击 1成功，2失败
    let status = ref(0);
    let loading = ref(false);
    let bStyle = reactive({
      "background-color": "#1a8fdd",
    });


    // 控制组件刷新
    let componentKey = ref(0);
    const nextChallenge = async () => {
      // 首次闯关记录闯关时间
      // 成功
      if (status.value === 1) {
        //  刷新子组件

        // 第一次点击
        let curType = await obtainType();
        if (challenge.cur < totalChallenge.value) {
          challenge.cur++;
          if (curType === 0 && +2 === cur.value) {
            challengeNumAdd();
          }
        }

        if (challenge.cur === totalChallenge.value) {
          // 已通关，跳到通关页面
          await router.push("/success");
        }
        // 下一关的类型
        curType = await obtainType();
        forceRerender();
        //  按键恢复
        if (curType !== 0) {
          btnReset();
        }
        return;
      } else if (status.value === 2) {
        // 失败
        status.value = 0;
        await nextChallenge();
        return;
      }

      let curType = await obtainType();
      // 问卷调查：
      if (curType === 1) {
        //调用子组件方法，收集信息
        // 直接调用成功方法
        const status = await currentInstance.ctx.$refs.Challenge.uploadStudentAnswer();
        if (status === 200) {
          challengeNumAdd();
          btnSuccess();
        }
      } else if (curType === 2) {
        testing();
        axios
            .get(`/api/episode/test/${cur.value}`)
            .then((res) => {
              // markdown闯关：发起请求验证代码是否有误
              // 根据返回结果，分别调用
              // 成功
              if (res.data.status === 200) {
                challengeNumAdd();
                btnSuccess();
              } else {
                // 失败
                btnFail();
              }
            })
            .catch(function (error) {
              console.log(error);
            });
      } else if (curType === 0) {
        btnSuccess();
      }
    };
    const gotoChallenge = async (i) => {
      if (i <= user.maxChallenge) {
        challenge.cur = i;
        forceRerender();
      } else if (i === user.maxChallenge + 1) {
        challenge.cur = i;
        btnReset();
      }
    };


    const testing = () => {
      // 修改按钮状态
      bVal.value = "测评中";
      loading.value = true;
      bStyle["background-color"] = "#c3c3c3";
    };
    const btnSuccess = () => {
      bVal.value = "下一关";
      bStyle["background-color"] = "#006a4e";
      loading.value = false;
      status.value = 1;
    };
    const btnFail = () => {
      bVal.value = "闯关失败";
      bStyle["background-color"] = "#cc0000";
      loading.value = false;
      status.value = 2;
    };
    const btnReset = () => {
      bVal.value = "提交";
      loading.value = false;
      bStyle["background-color"] = "#1a8fdd";
      status.value = 0;
      forceRerender();
    };
    const forceRerender = () => {
      if (cur.value <= user.maxChallenge.value) {
        btnSuccess();
      }
      componentKey.value += 1;
    };

    const challengeNumAdd = () => {
      axios
          .get(`/api/studentInfo/setDoneMission/${userId.value}`)
          .then((res) => {
            console.log(res);
          });
      user.maxChallenge.value += 1;
    };

    const obtainType = async () => {
      // 获取题目类型
      const res = await axios.get("/api/episode/getOne", {
        params: {
          id: challenge.cur,
        },
      });
      return res.data.data.type;
    };
    return {
      loading,
      challenge,
      cur,
      type,
      totalChallenge,
      componentKey,
      forceRerender,
      btnFail,
      btnSuccess,
      btnReset,
      obtainType,
      nextChallenge,
      gotoChallenge,
      bVal,
      user,
      bStyle,
      status,
      userId,
      testing,
      challengeNumAdd,
    };
  },
  async created() {
    await this.getUserId();
    // 获取用户信息
    await this.getUserData();

    this.maxChallenge();
    await this.getRanking();
    await this.getChallengeNum();
    //  处理第一关为0的 情况
    this.type = await this.obtainType();
    if (this.type === 0) {
      this.btnSuccess();
    }
    if (this.cur.value <= this.user.maxChallenge) {
      this.btnSuccess();
    }
  },
  methods: {

    maxChallenge() {
      this.cur = this.user.maxChallenge;
    },
    // 获取用户id
    async getUserId() {
      let res = await this.axios.get("/api/studentInfo/me");
      this.userId = res.data.data;
    },
    // 获取用户信息
    async getUserData() {
      let res = await this.axios.get(
          "/api/studentInfo/getStudent/" + this.userId
      );
      this.user.name = res.data.data.name;
      this.user.avatar = res.data.data.avatar;
      this.user.cData = res.data.data.beginDate;
      this.user.maxChallenge = res.data.data.episode;
    },
    // 获取排名
    async getRanking() {
      let res = await this.axios.get("/api/studentInfo/getRanking");
      this.rankings = res.data.data;
    },
    // 获取关卡总数量
    async getChallengeNum() {
      let res = await this.axios.get("/api/episode/get");
      this.totalChallenge = res.data.data.length;
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