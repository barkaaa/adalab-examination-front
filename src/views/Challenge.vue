<template>
  <div class="main-box">
    <aside>
      <div class="timer">
        <timer/>
        <RankingPlugin v-bind:users="users"></RankingPlugin> 
      </div>
      <div class="leaderboard">
        111
      </div>
      <div class="footer"></div>
    </aside>
    <main>
      <router-view/>
    </main>
  </div>

</template>

<script>
import Timer from "@/components/Timer";
import RankingPlugin from "@/components/RankingPlugin.vue";


export default {
  name: "Challenge",
  components: {
    Timer,
    RankingPlugin
}, data() {
    return {
      users: [
        { name: "王狗剩", clear: 7 },
        { name: "李根宝", clear: 9 },
        { name: "David", clear: 1 },
        { name: "Dick", clear: 12 },
        { name: "Link", clear: 1 },
        { name: "王狗剩", clear: 7 },
        { name: "李根宝", clear: 9 },
        { name: "David", clear: 1 },
        { name: "Dick", clear: 12 },
        { name: "Link", clear: 1 },
        { name: "王狗剩", clear: 7 },
        { name: "李根宝", clear: 9 },
        { name: "David", clear: 1 },
        { name: "Dick", clear: 12 },
        { name: "Link", clear: 1 },
        { name: "王狗剩", clear: 7 },
        { name: "李根宝", clear: 9 },
        { name: "David", clear: 1 },
        { name: "Dick", clear: 12 },
        { name: "Link", clear: 1 },
      ],
    };
  },
}
</script>

<style scoped lang="less">
.main-box {
  display: flex;
  height: 800px;


  aside {
    .timer {
      margin: 60px 30px 0 30px;
      border-bottom: 2px solid #000;
      padding-bottom: 33px;
      background-color: #eee;
    }

    .leaderboard {

    }
    .footer{

    }

  }

  main {

  }
}

</style>