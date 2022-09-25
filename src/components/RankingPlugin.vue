<template>
  <p class="test"></p>
  <p class="test"></p>
  <p class="test"></p>
  <h1 id="rankingList">排行榜</h1>
  <div class="list">
    <div class="outer-container" v-for="(item) in rankings">
      <p class="name" :id="['uid'+item.id]" :style="[item.id===curUser?uStyle:'']">
        {{ item.name }}</p>
      <div class="container">
        <div
            class="progress"
            v-bind:style="{ width: (item.episode / trueEpisodeNum) * 100 + '%' }"
            :class="[
            item.id === this.curUser
              ? 'statusMe'
              : item.episode / trueEpisodeNum < 0.3
              ? 'status1'
              : item.episode / trueEpisodeNum < 0.4
              ? 'status2'
              : 'status3',
          ]"
        >
          <p class="proportion">
            {{ item.episode + "/" + trueEpisodeNum }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <br/>
</template>

<script>
export default {
  name: "RankingPlugin",
  props: {
    rankings: Array,
  },
  data() {
    return {
      // color: "red",
      // number: this.rankings[1].clear + "%",
      user: this.rankings,
      students: {},
      trueEpisodeNum: 0,
      curUser: "",

      uStyle: {
        color: "orange !important"
      }
    };
  },
  methods: {
    getCounts() {
      this.axios.get("/api/episode/student/counts").then((res) => {
        this.trueEpisodeNum = res.data.data;
      });
    },
    getCurUser() {
      this.axios.get("/api/studentInfo/student/me").then((res) => {
        this.curUser = res.data.data.id;
      });
    },

  },
  created() {
    this.getCounts();
    this.getCurUser();

  },
  mounted() {

  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*::webkit
html {
  scrollbar-width: none;
}

a {
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

#rankingList {
  text-align: center;
}

/* template{
  text-align: center;
} */

.container {
  width: 100%;
  background-color: white;
  border-radius: 15px;
  /* border-top-left-radius: 15px;
  border-bottom-left-radius: 15px; */
  margin: 0;
  padding: 0px;
  height: 15px;
}

.progress {
  /* background: linear-gradient(90deg,yellow,blue); */
  background-color: #4caf50;
  border-radius: 15px;
  height: 15px;
}

.progress p {
  text-align: center;
  margin: 0px;
  padding: 0px;
}

.list {
  overflow: scroll;
  overflow-x: hidden;
  margin: 1vw;
  height: 63vh;
}

.list::-webkit-scrollbar {
  display: none;
}

.list div {
  margin: 0px;
  padding: 0px;
}

/* a-progress{
  text-align: center;
  size: large;
  
} */

/* .btn{
  width: 1vh;
} */
.name {
  width: 100%;
  font-size: 16px;
  height: 16px;
}

.proportion {
  font-size: 12px;
}

.outer-container {
}

/* 进度条颜色 */
.status1 {
  background-color: #f44336;
}

.status2 {
  background-color: #2196f3;
}

.status3 {
  /* background-color: #0f0; */
  background: linear-gradient(90deg, #0f0, #0ff);
}

.statusMe {
  background: linear-gradient(90deg, #c83a62, #f00166, #3a3494);
}
</style>
