<template>
  <div class="main-box">
    <aside>
      <div class="timer">
        <timer :uName="user.name" :avatar="user.avatar" :cDate="user.cDate"/>
      </div>
      <RankingPlugin v-bind:rankings="rankings"></RankingPlugin>
    </aside>
    <main>
      <a-steps :current="cur.id" small>
        <a-step v-for="i in totalChallengeNum" @click="goNewEp(i)" :key="i">
          <template #icon v-if="i <= user.episode">
            <icon-check/>
          </template>
        </a-step>
      </a-steps>

      <!-- <router-view v-if="fresh" /> -->

      <div class="box">
        <div>
          <div class="problem_box" v-for="(item, index) in questions" :key="index">
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
                    :key="option"
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
              <a-divider/>
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
        <div v-html="content"/>
      </div>


      <div class="submit_box">
        <div class="episode_button" v-if="cur.id === user.episode+1||(cur.type===1&&!(submitted))">
          <a-button
              type="primary"
              @click="buttomClick"
              :loading="loading"
              :style="cur.type===0?{background:'#006a4e',width:'125px'}:{background:'#1a8fdd',width:'125px'}"
          >
            <template #icon>
              <icon-double-right/>
            </template>
            {{ cur.type === 0 ? '下一关' : '提交' }}
          </a-button>
        </div>
        <div class="episode_button" v-else>
          <a-button
              type="primary"
              @click="goNewEp(cur.id+1)"
              :style="{background:'#006a4e',width:'125px'}"
          >
            <template #icon>
              <icon-double-right/>
            </template>
            下一关
          </a-button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Timer from "@/components/Timer";

import RankingPlugin from "@/components/RankingPlugin.vue";
import {IconDoubleRight} from "@arco-design/web-vue/es/icon";
import {getCookie} from "../utils/Utils";
import {ref, getCurrentInstance, reactive} from "vue";
import {Modal} from "@arco-design/web-vue";
import router from "@/router";

export default {
  name: "Home",
  setup() {
    let user = ref({});
    let currentInstance = getCurrentInstance();
    let {axios, markded} = currentInstance.appContext.config.globalProperties;
    let content = ref(" ");
    let bVal = ref("提交");
    let loading = ref(false);
    let cur = ref({});
    let totalChallengeNum = ref();
    let submitted=ref(false);
    let id = parseInt(getCookie("id"));
    let onePageAnswers = reactive([]);
    let questions = ref([]);

    let errorMessage = ref("test");
    let rankings = ref([]);

    //进入页面，初始化用户
    const getUserDone = async () => {
      let res = await axios.get(`/api/studentInfo/student/me`);
      user.value["name"] = res.data.data.name;
      user.value["id"] = res.data.data.id;
      user.value["avatar"] = res.data.data.avatar;
      user.value["cDate"] = res.data.data.beginDate;
      user.value["episode"] = res.data.data.episode;
      //获取闯关数，以及跳转至正在闯的关卡
    };

    //点击按钮
    const buttomClick = async () => {
      //判断当前页面的关卡是否为正在闯的关卡

      //需要发请求
      loading.value = true;
      const res = await axios.post(`/api/episode/student/test/${cur.value["id"]}`, {
        list: onePageAnswers,
        currentMission: cur.value,
        currentStudent: user.value["id"],
      });
      //闯第一关点击按钮 从后台刷新计时器
     submitted.value=true;
      getUserDone();
      loading.value = false;
      if (res.data.status === 200) {
        if (cur.value["type"] === 0) {
          //引导关卡'
          await goNewEp(cur.value["id"] + 1);
        }
      } else {
        //闯关失败
        errorMessage.value = res.data.message;
        challengeError(res.data.data.mes);
      }
    };

    const challengeError = (res) => {
      Modal.error({
        title: errorMessage.value,
        content: res
      });
    };


    //更新问卷页面
    const getQuestion = async () => {
      let r = await axios.get(`/api/ques/student/getone/${cur.value["ques"]}`);
      questions.value = r.data.data;
      initAnswer();
    };

    //初始化答案
    const initAnswer = () => {
      for (let i = 0; i < questions.value.length; i++) {
        onePageAnswers.push({id:questions.value[i].id,fill: "", selectOptions: [],binding:questions.value[i].binding});
      }
    };

    const goNewEp = async (ep) => {
      if (ep > user.value["episode"] + 1) {
        return;
      }
      if(ep>totalChallengeNum.value){
        router.push("/success");
      }
      let res = await axios.get("/api/episode/student/getOne", {
        params: {id: ep},
      });
      submitted.value=false;
      cur.value["id"] = res.data.data.id;
      cur.value["markdownUrl"] = res.data.data.markdownUrl;
      cur.value["type"] = res.data.data.type;
      cur.value["ques"] = res.data.data.questionnaire;
      if (res.data.data.type === 1) {
        content.value="";
        getQuestion();
      } else {
        questions.value=[];
        let url = res.data.data.markdownUrl;
        if (url) {
          let md = (await axios.get(url)).data;
          content.value = markded.parse(md);
        }else {
          content.value="";
        }
      }
    };


    const getRanking = async () => {
      let res = await axios.get(`/api/studentInfo/student/getSeven/${user.value["id"]}`);
      rankings.value = res.data.data;
    };


    const sleepFun = (time) => {
      return new Promise((resolve) => setTimeout(resolve, time));
    };

    return {
      loading,
      cur,
      getUserDone,
      buttomClick,
      totalChallengeNum,
      content,
      bVal,
      user,
      goNewEp,
      submitted,
      id,
      questions,
      onePageAnswers,
      getQuestion,
      initAnswer,
      sleepFun,
      errorMessage,
      challengeError,
      rankings,
      getRanking,
    };
  },
  async created() {
    await this.getUserDone();
    await this.getRanking();
    await this.getChallengeNum();
    await this.goNewEp(Math.min(this.user["episode"] + 1,this.totalChallengeNum))

  },
  methods: {
    async getChallengeNum() {
      let res = await this.axios.get("/api/episode/student/counts");
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
  text-align: center;
  margin: 10vh 7% 0 7%;
  display: flex;
  flex-direction: column;

.box {
  width: 100%;

  text-align: left;
}

.submit_box {
  margin-top: 50px;
  justify-content: center;

.episode_button {
  position: relative;
  top: 0;
}

}

}
}
</style>