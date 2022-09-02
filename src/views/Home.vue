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
        <a-step v-for="i in totalChallengeNum" @click="turnToChallenge(i)">
          <template #icon v-if="i <= userPassedNum">
            <icon-check />
          </template>
        </a-step>
      </a-steps>

      <!-- <router-view v-if="fresh" /> -->

      <div class="box">
        <div>
          <div class="problem_box" v-for="(item, index) in questions">
            <h3>{{ item.theme }}</h3>
            <a-textarea
                v-model="onePageAnswers[index].fill"
                placeholder="请在这里输入"
                allow-clear
                auto-size
                v-if="item.questionType === 1"
            />

            <div v-if="item.isMultiple === 'false' && item.questionType === 2">
              <a-radio-group
                  v-if="item.isMultiple === 'false'"
                  v-model="onePageAnswers[index].selectOptions[0]"
              >
                <a-radio
                    :value="option"
                    v-for="option in item.options.split('?').slice(0, -1)"
                >
                  {{ option }}
                </a-radio>
                <a-radio value="自己填选项" v-if="item.isAddtional === 'true'"
                >自己填选项
                </a-radio>
              </a-radio-group>
              <a-divider/>
            </div>

            <div v-if="item.isMultiple === 'true' && item.questionType === 2">
              <a-checkbox-group v-model="onePageAnswers[index].selectOptions">
                <a-checkbox
                    :value="option"
                    v-for="option in item.options.split('?').slice(0, -1)"
                >{{ option }}
                </a-checkbox>
                <a-checkbox
                    value="自己填选项"
                    v-if="item.isAddtional === 'true'"
                >自己填选项
                </a-checkbox>
              </a-checkbox-group>
              <a-divider />
            </div>

            <a-textarea
                v-model="onePageAnswers[index].fill"
                placeholder="自己填选项"
                allow-clear
                auto-size
                v-if="item.questionType == 2 && item.isAddtional === 'true'"
            />
          </div>
        </div>
      </div>
      <div class="box">
        <div v-html="content" />
      </div>
      <div
          v-if="cur > totalChallengeNum"
          style="text-align: center; font-size: 60px; padding: 100px"
      >
        您通关了
      </div>

      <div class="submit_box">
        <a-button
            v-if="cur <= totalChallengeNum"
            type="primary"
            @click="buttomClick"
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

import RankingPlugin from "@/components/RankingPlugin.vue";
import { IconDoubleRight } from "@arco-design/web-vue/es/icon";
import { useChallengeStore } from "../store/challenge";
import { storeToRefs } from "pinia";
import { getCookie } from "../utils/Utils";
import { ref, getCurrentInstance, reactive } from "vue";
import { Modal } from "@arco-design/web-vue";

export default {
  name: "Home",
  setup() {
    let type = ref();
    const userId = ref();
    let user = ref({});
    let userPassedNum = ref();
    let currentInstance = getCurrentInstance();
    let { axios, markded } = currentInstance.appContext.config.globalProperties;
    let content = ref(" ");
    let bVal = ref("提交");
    let loading = ref(false);
    const challenge = useChallengeStore();
    let { cur } = storeToRefs(challenge);
    let totalChallengeNum = ref();
    let bStyle = reactive({
      "background-color": "#1a8fdd",
    });

    let id = parseInt(getCookie("id"));
    let onePageAnswers = reactive([]);
    let questions = ref([]);

    let errorMessage = ref("test");
    let rankings = ref([]);

    //进入页面，初始化用户
    const getUserDone = async () => {
      let res = await axios.get(`/api/studentInfo/getStudent/${userId.value}`);
      user.value["name"] = res.data.data.name;
      user.value["avatar"] = res.data.data.avatar;
      user.value["cDate"] = res.data.data.beginDate;
      //获取闯关数，以及跳转至正在闯的关卡
      userPassedNum.value = res.data.data.episode;
      challenge.cur = userPassedNum.value + 1;

      freshBtnStyle();
    };

    //点击按钮
    const buttomClick = async () => {
      //判断当前页面的关卡是否为正在闯的关卡
      if (challenge.cur === userPassedNum.value + 1) {
        //需要发请求
        loading.value = true;
        const res = await axios.post(`/api/episode/test/${challenge.cur}`, {
          list: onePageAnswers,
          currentMission: cur.value,
          currentStudent: userId.value,
        });
        //闯第一关点击按钮 从后台刷新计时器
        if (userPassedNum.value == 0) {
          freshTime();
        }
        if (res.data.status === 200) {
          loading.value = false;
          const curType = await obtainType();
          if (curType === 0) {
            //不需要提交的关卡

            userPassedNum.value += 1;
            turnToChallenge(challenge.cur + 1);
            freshBtnStyle();
          } else {
            //按钮变下一关
            btnToNext();
            //前端页面记录闯关数+1
            userPassedNum.value += 1;
          }
        } else {
          //闯关失败
          loading.value = false;
          errorMessage.value = res.data.message;
          challengeError(res.data.data.mes);
        }
      } else if (challenge.cur <= userPassedNum.value) {

        turnToChallenge(challenge.cur + 1);
      }
    };

    const challengeError = (res) => {

      let errorReason = "";

      (Object.keys(res)).forEach((key) =>{
        errorReason += key + ":" + res[key]+"-------------------------------------------------------------------- ";
      })
      Modal.error({
        title: errorMessage.value,
        content: errorReason

      });
    };

    //点击上面步骤条 切换关卡
    const turnToChallenge = async (i) => {
      //切换到已经闯过的
      if (i <= userPassedNum.value) {
        challenge.cur = i;
        //按钮变为 下一关
        btnToNext();
        forceRerender();
      } else if (i === userPassedNum.value + 1) {
        //切换到正在闯的关卡
        challenge.cur = i;
        freshBtnStyle();
        forceRerender();
      }
    };

    //跳转到正在闯的关卡后刷新按钮
    const freshBtnStyle = async () => {
      //需要判断：1.正在闯的关卡需要提交 2.可以直接下一关
      // 仅仅改变按钮样式，但还是需要点击（提交/下一关）的
      const curType = await obtainType();
      if (curType === 0) {
        btnToNext();
      } else {
        btnToSubmit();
      }
    };

    //按钮变为 下一关
    const btnToNext = () => {
      bVal.value = "下一关";
      bStyle["background-color"] = "#006a4e";
    };

    //按钮变为 提交
    const btnToSubmit = () => {
      bVal.value = "提交";
      bStyle["background-color"] = "#1a8fdd";
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

    //提交问卷
    const uploadStudentAnswer = async () => {
      let id = parseInt(getCookie("id"));
      let res = await axios.put("/api/reply/putReply", {
        list: onePageAnswers,
        currentMission: cur.value,
        currentStudent: id,
      });
      return res.status;
    };

    //更新问卷页面
    const getQuestion = async () => {
      await sleepFun(1000);
      let r = await axios.get("/api/questionnaire/getone", {
        params: { missionNum: cur.value },
      });
      questions.value = r.data.data;
      initAnswer();
    };

    //初始化答案
    const initAnswer = () => {
      for (let i = 0; i < questions.value.length; i++) {
        onePageAnswers.push({ fill: "", selectOptions: [] });
      }
    };

    //更新markdown页面
    const getMd = async () => {
      await sleepFun(1000);
      let res = await axios.get("/api/episode/getOne", {
        params: { id: cur.value },
      });
      let url = res.data.data.markdownUrl;
      if (url) {
        let md = (await axios.get(url)).data;
        content.value = markded.parse(md);
      }
    };

    const getRanking = async () => {
      let res = await axios.get("/api/studentInfo/getRanking");
      rankings.value = res.data.data;
    };

    //刷新页面【排名榜， 问卷，markdown】
    const forceRerender = async () => {
      await getRanking();
      await getQuestion();
      await getMd();
    };

    //刷新 time
    const freshTime = async () => {
      let res = await axios.get(`/api/studentInfo/getStudent/${userId.value}`);
      user.value["cDate"] = res.data.data.beginDate;
    };

    const sleepFun = (time) => {
      return new Promise((resolve) => setTimeout(resolve, time));
    };

    return {
      loading,
      challenge,
      cur,
      type,
      getUserDone,
      buttomClick,
      turnToChallenge,
      totalChallengeNum,
      content,
      obtainType,
      bVal,
      user,
      bStyle,
      userId,
      userPassedNum,
      id,
      questions,
      onePageAnswers,
      getQuestion,
      getMd,
      initAnswer,
      uploadStudentAnswer,
      btnToSubmit,
      btnToNext,
      freshBtnStyle,
      sleepFun,
      errorMessage,
      challengeError,
      rankings,
      getRanking,
      freshTime,
    };
  },
  async created() {
    await this.getUserId();
    await this.getData();
    await this.getRanking();
    await this.getChallengeNum();
    await this.getUserDone();

    this.type = await this.obtainType();
    if (this.type === 0) {
      this.btnSuccess();
    }

    await this.getQuestion();
    await this.getMd();
  },
  methods: {
    async getUserId() {
      let res = await this.axios.get("/api/studentInfo/me");
      this.userId = res.data.data.id;
    },

    async getData() {
      let res = await this.axios.get(
          "/api/studentInfo/getStudent/" + this.userId
      );
      this.users = res.data.data;
    },

    async getChallengeNum() {
      let res = await this.axios.get("/api/episode/counts");
      this.totalChallengeNum = res.data.data;
    },
  },
  components: {
    Timer,
    RankingPlugin,
    IconDoubleRight,
  },
  data() {
    return {
      users: [],
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