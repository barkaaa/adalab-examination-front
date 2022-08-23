<template>

<!-- <p>1</p>
  <div class="container">
    <div class="skills html">90%</div>
  </div>

  <p>2</p>
  <div class="container">
    <div class="skills css">80%</div>
  </div>

  <p>3</p>
  <div class="container">
    <div class="skills js">65%</div>
  </div>

  <p>李根宝</p>
  <div class="container">
    <div class="skills php">60%</div>
  </div> -->

  
  <!-- <p v-for="(item, i) in users">{{ i }}huihuihui{{ item }}</p> -->

  <div v-for="(item, i) in users">
  <p>{{item.name}}</p>
  <div class="container">
    <div class="clearNum" v-bind:style="{width:item.clear+'%'}" v-if:style="{color:pink}">
      {{item.clear}}
    </div>
  </div>
  </div>
<div v-for="(item, i) in users">
    <a-progress
      size='large'
      :percent="1"
      :style="{ width: '50%' }"
      :color="{
        '0%': 'rgb(var(--primary-6))',
        '100%': 'rgb(var(--success-6))',
      }"
    />
    <br/>
    <br/>
</div>






</template>

<script>
export default {
  name: "RankingPlugin",
  props: {
    users: Array,
    
  },data() {
    return {
      color:"red",
      number:this.users[1].clear+"%",
      user: this.users
      
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
}

.container {
  width: 100%;
  background-color: #ddd;
}

.skills {
  text-align: right;
  padding-right: 20px;
  line-height: 40px;
  color: white;
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
.php {
  width: v-bind(number);
  background-color: #808080;
}
.clearNum{
  background: linear-gradient(90deg,yellow,blue);
  
}
a-progress{
  text-align: center;
}
</style>
