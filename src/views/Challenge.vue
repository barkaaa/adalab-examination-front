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
          <a-radio value="自己填选项">自己填选项</a-radio>
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
          <a-checkbox value="自己填选项">自己填选项 </a-checkbox>
        </a-checkbox-group>
        <a-divider />
      </div>

      <a-textarea
        v-model="answer[index].fill"
        placeholder="自己填选项"
        allow-clear
        auto-size
        v-if="item.questionType == 2 && item.isAddtional === 'false'"
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
      for (const key in res) {
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
    test() {
      console.log(this.answer);
    },
  },
  async mounted() {
    let res = await this.axios.get("/api/levels/getone", {
      params: { stage: this.cur },
    });
    let url = res.data.url;
    let md = (await this.axios.get(url)).data;
    this.content = this.markded.parse(md);
  },
};
</script>

<style scoped lang="less">
</style>