<template>
  <div class="box">
    <div v-html="content"/>
  </div>
</template>

<script>
import {useChallengeStore} from "../store/challenge"
import {storeToRefs} from 'pinia';

export default {
  name: "MarkdownChallenge",
  setup() {
    const challenge = useChallengeStore();
    let {cur} = storeToRefs(challenge);
    return {
      challenge, cur
    }
  },
  data() {
    return {
      content: " "
    }
  },
  async mounted() {
    let res = await this.axios.get("/api/levels/getone", {
      params: {stage: this.cur}
    })
    let url = res.data.url;
    let md = (await this.axios.get(url)).data
    this.content = this.markded.parse(md);
  }
}
</script>

<style scoped lang="less">
.box {
  width: 80%;

  .content-box {
    margin-top: 4%;
  }
}

</style>
