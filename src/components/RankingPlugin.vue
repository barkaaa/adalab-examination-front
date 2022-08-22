<template>
  <h1>进度条</h1>

<p>1</p>
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
</div>
</template>

<script>
export default {
  name: 'RankingPlugin',
  props: {
    img: String,
    username:String,
    rank:String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


* {box-sizing: border-box}

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

.html {width: 90%; background-color: #4CAF50;}
.css {width: 80%; background-color: #2196F3;}
.js {width: 65%; background-color: #f44336;}
.php {width: 60%; background-color: #808080;}


</style>