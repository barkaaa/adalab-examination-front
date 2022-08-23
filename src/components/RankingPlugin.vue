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

 
  
<!-- item.clear -->
<div id="open-modal" class="modal-window">
  <div>
    <a href="#" title="Close" class="modal-close">Close</a>
    <h1>Voilà!</h1>
    <div>A CSS-only modal based on the :target pseudo-class. Hope you find it helpful.</div>
    <div><small>Check out</small></div>
  
    </div>
</div>

<div class="list">
<div  v-for="(item, i) in users">
    <a class="btn" href="#open-modal"><p>{{ item.name }}</p></a>
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
  width: 95%;
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
  border-radius: 15px;
  

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


.list div{
  margin: 0px;
  padding: 0px;
  
}



/* a-progress{
  text-align: center;
  size: large;
  
} */


.modal-window {
  position: fixed;
  background-color: rgba(255, 255, 255, 0.25);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.modal-window:target {
  visibility: visible;
  opacity: 1;
  pointer-events: auto;
}
.modal-window > div {
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  padding: 2em;
  background: #ffffff;
}
.modal-window header {
  font-weight: bold;
}
.modal-window h1 {
  font-size: 150%;
  margin: 0 0 15px;
}

.modal-close {
  color: #aaa;
  line-height: 50px;
  font-size: 80%;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  width: 70px;
  text-decoration: none;
}
.modal-close:hover {
  color: black;
}



</style>
