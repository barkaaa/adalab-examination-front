<template>
  <div class="box">
    <div > 
      <div class="problem_box" v-for="(item, index) in res">
        <h3>{{ item.theme }}</h3>

        <a-textarea
          v-model="answer[index].fill"
          placeholder="请在这里输入"
          allow-clear
          auto-size
          v-if="item.questionType === 1"
        />

        <div v-if="item.isMultiple === 'false' && item.questionType === 2">
          <a-radio-group
            v-if="item.isMultiple === 'false'"
            v-model="answer[index].selectOptions[0]"
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
          <a-divider />
        </div>

        <div v-if="item.isMultiple === 'true' && item.questionType === 2">
          <a-checkbox-group v-model="answer[index].selectOptions">
            <a-checkbox
              :value="option"
              v-for="(option, x) in item.options.split('?').slice(0, -1)"
              >{{ option }}
            </a-checkbox>
            <a-checkbox value="自己填选项" v-if="item.isAddtional === 'true'"
              >自己填选项
            </a-checkbox>
          </a-checkbox-group>
          <a-divider />
        </div>

        <a-textarea
          v-model="answer[index].fill"
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
</template>

<script>
import { useChallengeStore } from "@/store/challenge";
import { storeToRefs } from "pinia";
import { ref, onBeforeMount, getCurrentInstance, reactive } from "vue";
import axios from "axios";
import { getCookie } from "../utils/Utils";

export default {
  setup() {
    let id = parseInt(getCookie("id"));
    let answer = reactive([]);
    const challenge = useChallengeStore();
    let { cur } = storeToRefs(challenge);
    const { axios } = getCurrentInstance().appContext.config.globalProperties;
    const bLoading = ref(false);
    let res = ref([]);
    const nextChallenge = () => {
      bLoading.value = !bLoading.value;
    };

    const initAnswer = () => {
      for (let i = 0; i < res.value.length; i++) {
        answer.push({ fill: "", selectOptions: [] });
      }
    };

    return {
      id,
      bLoading,
      nextChallenge,
      res,
      cur,
      challenge,
      answer,
      initAnswer,
    };
  },
  data() {
    return {
      content: " ",
    };
  },
  async created() {
    await this.getQuestion();
    await this.getMd();
  },
  methods: {
    async getQuestion() {
      await this.sleepFun(1000);
      let r = await axios.get("/api/questionnaire/getone", {
        params: { missionNum: this.cur },
      });
      this.res = r.data.data;
      this.initAnswer();
    },
    async getMd() {
      await this.sleepFun(1000);
      let res = await axios.get("/api/episode/getOne", {
        params: { id: this.cur },
      });
      let url = res.data.data.markdownUrl;
      let md = (await this.axios.get(url)).data;
      this.content = this.markded.parse(md);
    },
    sleepFun(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    },
    uploadStudentAnswer() {
      let id = parseInt(getCookie("id"));
      this.axios
        .put("/api/reply/putReply", {
          list: this.answer,
          currentMission: this.cur,
          currentStudent: id,
        })
        .then((res) => {
          return res.status;
        });
    },
  },
};
</script>

<style scoped lang="less">
</style>


