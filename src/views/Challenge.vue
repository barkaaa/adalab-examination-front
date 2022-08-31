<template>
  <div class="box">
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
            >自己填选项</a-radio
          >
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
  <div class="box">
    <div v-html="content" />
  </div>
</template>

<script>
import { useChallengeStore } from "@/store/challenge";
import { storeToRefs } from "pinia";
import { ref, onBeforeMount, getCurrentInstance, reactive } from "vue";

export default {
  
  setup() {
    let answer = reactive([]);
    const challenge = useChallengeStore();
    let { cur } = storeToRefs(challenge);
    const { axios } = getCurrentInstance().appContext.config.globalProperties;
    const bLoading = ref(false);
    let res = ref([]);
    const nextChallenge = () => {
      bLoading.value = !bLoading.value;
    };

    onBeforeMount(async () => {
      let r = await axios.get("/api/questionnaire/getone", {
        params: { missionNum: cur.value },
      });
      res.value = r.data;
      initAnswer();
    });

    const initAnswer = () => {
      for (let i = 0; i < res.value.length; i++) {
        answer.push({ fill: "", selectOptions: [] });
      }
    };

    return {
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
  methods: {
    uploadStudentAnswer() {
      let id = parseInt(getCookie('id'));
      this.axios
        .put("/api/reply/putReply", this.answer, this.cur, id)
        .then((res) => {
          console.log(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  async mounted() {
    let res = await this.axios.get("/api/episode/getOne", {
      params: { id: this.cur },
      
    });
    let url = res.data.markdownUrl;
    let md = (await this.axios.get(url)).data;
    this.content = this.markded.parse(md);
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
</style>


