<template>
  <div class="main-box">
    <aside>
      <div class="timer">
        <timer />
      </div>
      <RankingPlugin v-bind:rankings="rankings"></RankingPlugin>
      <div class="leaderboard"></div>
      <div class="footer"></div>
    </aside>
    <main>
      <!-- {{ userDoneNum }} -->
     {{cur}}
      <a-steps :current="cur"  small>
        <a-step v-for="i in totalChallenge" @click="gotoChallenge(i)"></a-step>
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
import { ref, nextTick, getCurrentInstance, reactive, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Home",
  setup() {
    const userId = ref();
    let userDoneNum = ref();
    var currentInstance = getCurrentInstance();
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

      // const res = await axios.get("/api/episode/getone", {
      //   params: {
      //     stage: challenge.cur + 1,
      //   },
      // });
      // let type = res.data.type;

      let type = 2;
      // 问卷调查：
      if (type === 1) {
        //调用子组件方法，收集信息
        // 直接调用成功方法
        currentInstance.ctx.$refs.Challenge.uploadStudentAnswer();
        btnSuccess();
      } else if (type === 2) {
        axios
          .get(`/api/episode/test/${cur.value}`)
          .then((res) => {
            if (res.data.passed == true) {
              btnSuccess();
            } else {
              btnFail();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        // markdown闯关：发起请求验证代码是否有误
        // 根据返回结果，分别调用
        // 成功
        // btnSuccess();
        // 失败
        // btnFail();
      }
    };
    const gotoChallenge = async (i) => {
      if (i <= userDoneNum.value) {
        challenge.cur = i;
        forceRerender();
      }else if(i == userDoneNum.value+1){
        challenge.cur = i;
        btnReset();
      }
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
    };
    const forceRerender = () => {
      if (cur.value <= userDoneNum.value) {
        btnSuccess();
      }
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
      status,
      userId,
      userDoneNum,
    };
  },
  async mounted() {
    await this.getData();
    await this.getRanking();
    await this.getChallengeNum();
    await this.getUserId();
    await this.getUserDone();
   
  },
  methods: {
    getUserDone() {
      this.axios
        .get(`/api/studentInfo/getStudent/${this.userId}`)
        .then((res) => {
          this.userDoneNum = res.data.episode;
          this.cur = this.userDoneNum+1;
        });
    },

    getUserId() {
      this.userId = getCookie("id");
    },

    getData() {
      this.axios.get("/api/studentInfo/getStudent/1").then((res) => {
        this.users = res.data;
      });
    },
    getRanking() {
      this.axios.get("/api/studentInfo/getRanking").then((res) => {
        this.rankings = res.data;
      });
    },

    getChallengeNum() {
      this.axios.get("/api/episode/get").then((res) => {
        this.totalChallenge = res.data.length;
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

//获取 cookie 指定 值
function getCookie(c_name) {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      let c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
}
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