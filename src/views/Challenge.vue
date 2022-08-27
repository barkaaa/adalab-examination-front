<template>
  <div class="main-box">
    <aside>
      <div class="timer">
        <timer/>
      </div>
      <RankingPlugin v-bind:users="users"></RankingPlugin>
      <div class="leaderboard">
      </div>
      <div class="footer"></div>
    </aside>
    <main>
      <a-steps :current="cur" small>
        <a-step v-for="i in 12"></a-step>
      </a-steps>
      <router-view v-if="fresh"/>
      <div class="submit_box">
        <a-button type="primary" @click="nextChallenge">
          <template #icon>
            <icon-double-right/>
          </template>
          提交
          {{ fresh }}
        </a-button>
      </div>
    </main>
  </div>

</template>

<script>
import Timer from "@/components/Timer";
import RankingPlugin from "@/components/RankingPlugin.vue";
import {IconDoubleRight} from "@arco-design/web-vue/es/icon";
import {useChallengeStore} from "../store/challenge"
import {storeToRefs} from 'pinia';
import {ref, nextTick} from "vue";

export default {
  name: "Challenge",

  setup() {
    const challenge = useChallengeStore();
    let {cur} = storeToRefs(challenge);
    let fresh = ref(true);
    const nextChallenge = async () => {
      challenge.cur++;
      fresh.value = false;
      await nextTick();
      fresh.value = true;

    }
    return {
      challenge, cur, nextChallenge, fresh
    }
  },
  mounted() {
    this.axios.get('/api/student/getRanking')
        .then(res => {
          this.users = res.data;
          //console.log(res.data[0].id);
        });
  },
  methods: {
    getData() {
      this.axios.get('/student/getRanking')
          .then(res => {
            console.log(res.data);
          });
    },

  },
  components: {
    Timer,
    RankingPlugin,
    IconDoubleRight
  },
  data() {
    return {
      users: [
        {name: "王狗剩", clear: 7},
        {name: "李根宝", clear: 9},
        {name: "David", clear: 1},
        {name: "Dick", clear: 12},
        {name: "Link", clear: 1},
        {name: "王狗剩", clear: 7},
        {name: "李根宝", clear: 9},
        {name: "David", clear: 1},
        {name: "Dick", clear: 12},
        {name: "Link", clear: 1},
        {name: "王狗剩", clear: 7},
        {name: "李根宝", clear: 9},
        {name: "David", clear: 1},
        {name: "Dick", clear: 12},
        {name: "Link", clear: 1},
        {name: "王狗剩", clear: 7},
        {name: "李根宝", clear: 9},
        {name: "David", clear: 1},
        {name: "Dick", clear: 12},
        {name: "Link", clear: 1},
      ],
    };
  },
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