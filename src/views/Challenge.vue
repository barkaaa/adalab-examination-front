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
import axios from "axios";

export default {
  name: "Challenge",
  mounted() {
    console.log('123');
    this.axios.get('/api/student/getRanking')
      .then(res=>{
        this.users = res.data;
        //console.log(res.data[0].id);
      });
  },
  methods:{
    getData(){
      this.axios.get('/student/getRanking')
      .then(res=>{
        console.log(res.data);
      });
    }
  },
  components: {
    Timer,
    RankingPlugin,
    axios
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
  width: 100%;
  aside {
    width: 20%;
    background-color: #eee;

    .timer {
      margin: 16% 7% 0 7%;
      border-bottom: 1px solid #000;
      padding-bottom: 12%;
    }

    .leaderboard {

    }
    .footer{

    }

  }

  main {
    width: 80%;
  }
}

</style>