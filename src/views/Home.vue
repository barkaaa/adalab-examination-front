<template>
  <div class="main-box">
    <aside>
      <div class="timer">
        <timer/>
      </div>
      <RankingPlugin v-bind:rankings="rankings"></RankingPlugin>
      <div class="leaderboard"></div>
      <div class="footer"></div>
    </aside>
    <main>
      <a-steps :current="cur" small>
        <a-step v-for="i in totalChallenge" @click="gotoChallenge(i)"></a-step>
      </a-steps>
      <!-- <router-view v-if="fresh" /> -->
      <challenge ref="Challenge" :key="componentKey"/>
      <div class="submit_box">
        <a-button type="primary" @click="nextChallenge">
          <template #icon>
            <icon-double-right/>
          </template>
          提交
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
import {ref, nextTick, getCurrentInstance} from "vue";

export default {
  name: "Home",

  setup() {
    const challenge = useChallengeStore();
    let {cur} = storeToRefs(challenge);
    let fresh = ref(true);
    let totalChallenge = ref(12);

    let componentKey = ref(0);

    const nextChallenge = async () => {
      if (challenge.cur <= totalChallenge.value) challenge.cur++;
      // 刷新子组件
      forceRerender();
    };
    const gotoChallenge = async (i) => {
      challenge.cur = i;
      forceRerender();
    };

    const forceRerender = () => {
      componentKey.value += 1;
    };

    return {
      challenge,
      cur,
      nextChallenge,
      fresh,
      gotoChallenge,
      totalChallenge,
      componentKey,
      forceRerender,
    };
  },
  async mounted() {
    await this.getData();
    await this.getRanking();
  },
  methods: {
    getData() {
      this.axios.get("/api/examination/student-info").then((res) => {
        this.users = res.data;
      });
    },
    getRanking() {
      this.axios.get("/api/studentInfo/getRanking").then((res) => {
        this.rankings = res.data;
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