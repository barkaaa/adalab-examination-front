<template>

<!-- <a-steps :current="2" line-less>
      <a-step></a-step>
      <a-step></a-step>
      <a-step></a-step>
      <a-step></a-step>
      <a-step></a-step>
      <a-step></a-step>
      <a-step></a-step>
      <a-step></a-step>
      <a-step></a-step>
      <a-step></a-step>
      <a-step></a-step>
      <a-step></a-step>
      <a-step></a-step>
      <a-step></a-step>

    </a-steps> -->

 
<!-- item.clear -->
<div id="open-modal" class="modal-window">
  <div>
    <a href="#" title="Close" class="modal-close">Close</a>
    <div><iframe src="//player.bilibili.com/player.html?aid=217014295&bvid=BV1Pa411N7eg&cid=804937613&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe></div>
   
  
    </div>
</div>

<div class="list">
<div  v-for="(item, i) in users">
<p>{{item.name}}</p>
    <!-- <a class="btn" href="#open-modal"><p>{{ item.name }}</p></a> -->
    <div style="display:flex;flex-direction: row;justify-content:space-around">
      <div v-for="count in 13" class="dot"><p>{{count}}</p></div>
    </div>
    <br>
</div>
</div>

  
</template>

<script>

export default {
  name: "RankingPluginDetail",
  props: {
    users: Array,
  },
  data() {
    return {
      
      
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





.list{
  overflow: scroll;
  overflow-x: hidden;
  /* width:50%;
  height:50%; */
  

  
}
.list::-webkit-scrollbar{
  display:none;
  
}


.list div{
  margin: 0px;
  padding: 0px;
  text-align: center;
}



/* a-progress{
  text-align: center;
  size: large;
  
} */


.modal-window {
  position: fixed;
  /* background-color: rgba(255, 255, 255, 0.25); */
  background-color: rgba(0, 0, 0, 0.25);
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
  width: 80vw;
  height: 80vh;
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
a-steps{
  display: flex;
}
.a-step{
  background-color: black;
}

.dot{
  width: 30px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.1);
  top: 0;;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dot:hover{
  background-color: aqua;
}
/* .dotContainer{
  display: flex;
  flex-direction: row;
} */
</style>
