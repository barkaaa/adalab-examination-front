<template>
  <!-- item.clear -->
  <div id="open-modal" class="modal-window">
    <div>
      <a href="#" title="Close" class="modal-close">Close</a>
      <h1>ko</h1>
      <div>
       
      </div>
    </div>
  </div>



  <h1 id="rankingList">排行榜</h1>
  <div class="list">
    <div class="outer-container" v-for="(item, i) in users">
    <p class="name">{{ item.name }}</p>
      <div class="container">
        <div
          class="progress"
          v-bind:style="{ width: (item.ranking / 13) * 100 + '%' }"
          :class="[
            item.ranking / 13 < 0.3
              ? 'status1'
              : item.ranking / 13 < 0.4
              ? 'status2'
              : 'status3',
          ]"
        >
           <p class="proportion">
          {{ item.ranking + "/13" }}
        </p>
        </div>
      </div>
      
     
       
    </div>
 
  </div>
  <br>
</template>

<script>
export default {
  name: "RankingPlugin",
  props: {
    users: Array,
  },
  data() {
    return {
      color: "red",
      number: this.users[1].clear + "%",
      user: this.users,
      students: {},
    };
  },
  mounted() {
    fetch("/api/student/getRanking", {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((res) => {
        this.message = res.name;
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  margin: 0px;
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
  width: 100px;
  font-size: 4px;
  height: 15px;
}
.proportion{
  font-size: 4px;
}
.outer-container{
  

}

/* 进度条颜色 */
.status1 {
  background-color: #f44336;
}

.status2 {
  background-color: #2196f3;
}
.status3 {
  background-color: #4caf50;
}
</style>
