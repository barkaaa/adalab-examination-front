<template>
  <div class="box">
    <div class="problem_box" v-for="item in res">
      <h3>{{ item.theme }}</h3>
      <a-textarea
        placeholder="请在这里输入"
        allow-clear
        auto-size
        v-if="item.questionType === 1"
      />

      <a-radio-group v-if="item.isMultiple === 'false'">
        <a-radio
          :value="option"
          v-if="item.isMultiple === 'false' && item.questionType === 2"
          v-for="option in item.options.split('?').slice(0, -1)"
        >
          {{ option }}
        </a-radio>
      </a-radio-group>
      <a-checkbox
        :value="1"
        v-for="option in item.options.split('?').slice(0, -1)"
        v-if="item.isMultiple === 'true' && item.questionType === 2"
        >{{ option }}
      </a-checkbox>
    </div>
  </div>
  <div class="box">
    <div v-html="content" />
  </div>
</template>

<script>
import { useChallengeStore } from "../store/challenge";
import { storeToRefs } from "pinia";
import { ref, onBeforeMount, getCurrentInstance } from "vue";

export default {
  setup() {
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
    });
    return {
      bLoading,
      nextChallenge,
      res,
      cur,
      challenge,
    };
  },
  data() {
  
    return {
      content: " ",
    };

    
  },
  methods: {
      test(){
        console.log(111);
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