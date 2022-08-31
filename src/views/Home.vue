<template>
  <div class="main-box">
    <aside>
      <div class="timer">
        <timer :uName="user.name" :avatar="user.avatar" :cDate="user.cDate" />
      </div>
      <RankingPlugin v-bind:rankings="rankings"></RankingPlugin>
      <div class="leaderboard"></div>
      <div class="footer"></div>
    </aside>
    <main>
      <a-steps :current="cur" small>
        <a-step v-for="i in totalChallenge" @click="gotoChallenge(i)">
          <template #icon v-if="i <= userDoneNum">
            <icon-check />
          </template>
        </a-step>
      </a-steps>

      <!-- <router-view v-if="fresh" /> -->
      <challenge ref="Challenge" :key="componentKey" />
      <div class="submit_box">
        <a-button
          type="primary"
          @click="nextChallenge"
          :loading="loading"
          :style="bStyle"
        >
          <template #icon>
            <icon-double-right />
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
import { IconDoubleRight } from "@arco-design/web-vue/es/icon";
import { useChallengeStore } from "../store/challenge";
import { storeToRefs } from "pinia";
import { getCookie } from "../utils/Utils";
import { ref, getCurrentInstance, reactive } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Home",
  setup() {
    const userId = ref();
    let flag = true;
    let user = ref({});
    let userDoneNum = ref();
    let currentInstance = getCurrentInstance();
    let { axios } = currentInstance.appContext.config.globalProperties;
    let router = useRouter();
    let bVal = ref("提交");
    // 控制第二次点击 1成功，2失败
    let status = ref(0);
    let loading = ref(false);
    const challenge = useChallengeStore();
    let { cur } = storeToRefs(challenge);
    let totalChallenge = ref();
    let bStyle = reactive({
      "background-color": "#1a8fdd",
    });
    let componentKey = ref(0);

    const getUserDone = async () => {
      let res = await axios.get(`/api/studentInfo/getStudent/${userId.value}`);

      user.value["name"] = res.data.data.name;
      user.value["avatar"] = res.data.data.avatar;
      user.value["cDate"] = res.data.data.beginDate;
      userDoneNum.value = res.data.data.episode;
      challenge.cur = userDoneNum.value + 1;
    };

    const nextChallenge = async () => {
      // 首次闯关记录闯关时间
      if (flag) {
        axios.get("/api/studentInfo/begin/" + userId.value);
        flag = false;
      }
      // 成功
      if (status.value === 1) {
        //  刷新子组件
        if (challenge.cur <= totalChallenge.value) challenge.cur++;
        if (challenge.cur === totalChallenge.value + 1) {
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

      const res = await axios.get("/api/episode/getOne", {
        params: {
          id: challenge.cur,
        },
      });

      let type = res.data.data.type;

      // let type = 2;
      // 问卷调查：
      if (type === 1) {
        //调用子组件方法，收集信息
        // 直接调用成功方法
        const status =
         await currentInstance.ctx.$refs.Challenge.uploadStudentAnswer();
        if (status == 200) {
          challengeNumAdd();
          btnSuccess();
        }
      } else if (type === 2) {
        testing();
        axios
          .get(`/api/episode/test/${cur.value}`)
          .then((res) => {
            // markdown闯关：发起请求验证代码是否有误
            // 根据返回结果，分别调用
            // 成功
            if (res.data.data.passed === true) {
              btnSuccess();
            } else {
              // 失败
              btnFail();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        challengeNumAdd();
      }
    };
    const gotoChallenge = async (i) => {
      if (i <= userDoneNum.value) {
        challenge.cur = i;
        forceRerender();
      } else if (i === userDoneNum.value + 1) {
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
      if (cur.value <= userDoneNum.value) {
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
      userDoneNum.value += 1;
    };

    return {
      loading,
      challenge,
      cur,
      flag,
      getUserDone,
      nextChallenge,
      gotoChallenge,
      totalChallenge,
      componentKey,
      forceRerender,
      btnFail,
      btnSuccess,
      btnReset,
      bVal,
      user,
      bStyle,
      status,
      userId,
      userDoneNum,
      testing,
      challengeNumAdd,
    };
  },
  async created() {
    await this.getData();
    await this.getRanking();
    await this.getChallengeNum();
    this.getUserId();
    console.log(this.userId);
    await this.getUserDone();
  },
  methods: {
    getUserId() {
      this.userId = getCookie("id");
      this.userId = 1;
    },

    async getData() {
      let res = await this.axios.get("/api/studentInfo/getStudent/1");
      this.users = res.data.data;
    },
    async getRanking() {
      let res = await this.axios.get("/api/studentInfo/getRanking");
      this.rankings = res.data.data;
    },

    async getChallengeNum() {
      let res = await this.axios.get("/api/episode/get");
      this.totalChallenge = res.data.data.length;
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