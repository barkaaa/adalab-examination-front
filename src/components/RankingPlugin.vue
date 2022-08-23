<template>

  <!-- <a-list>
    <template #header>
      List title
    </template>
    <a-list-item v-for="(item, i) in users">
    <p>{{ item.name }}</p>
    <div class="container">
      <div
        class="progress"
        v-bind:style="{ width: 24/24*100+'%' }"
        v-if:style="{ color: pink }"
        >
        <p>
          {{ item.clear }}
        </p>
      </div>
    </div>
  </a-list-item>
  </a-list> -->

 
  


<div class="list">
<div  v-for="(item, i) in users">
    <a href="#modal-one" class="btn btn-big"><p>{{ item.name }}</p></a>
    <div class="container">
      <div
        class="progress"
        v-bind:style="{ width: item.clear/24*100+'%' }"
        >
        <p>
          {{ item.clear }}
        </p>
      </div>
    </div>
  </div>
</div>






<!-- <div :style="{overflow: scroll}" class="list">
<div :style="{ width: '100%' }"  class="list" v-for="(item, i) in users">
    <p>{{item.name}}</p>
    <a-progress
      size="large"
      track-color="white"
      :percent="0.7"
      :color="{
        '0%': 'rgb(var(--primary-6))',
        '100%': 'rgb(var(--success-6))',
      }"
    />
    <br />
    <br />
  </div>
</div> -->
  

  
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
    };
  },
   
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html{
  scrollbar-width: none;
}
* {
  box-sizing: border-box;
}
/* template{
  text-align: center;
} */

.container {
  width: 100%;
  background-color: #ddd;
  border-radius: 15px;
  /* border-top-left-radius: 15px;
  border-bottom-left-radius: 15px; */
  margin: 0px;
  padding: 0px;
  
}

.html {
  width: 90%;
  background-color: #4caf50;
}
.css {
  width: 80%;
  background-color: #2196f3;
}
.js {
  width: 65%;
  background-color: #f44336;
}

.progress {
  /* background: linear-gradient(90deg,yellow,blue); */
  background-color: #4caf50;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  

}
.progress p{
  text-align: center;
  margin: 0px;
  padding: 0px;

}
.list{
  overflow: scroll;
  overflow-x: hidden
  
  
}
.list::-webkit-scrollbar{
  display:none;
  
}






/* a-progress{
  text-align: center;
  size: large;
  
} */






</style>
