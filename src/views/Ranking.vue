<template>
<!--   
  <RankingPlugin v-bind:users="users">123</RankingPlugin>
  
  <a href="#dick">xixi</a>
  <div id="dick">fuq<a href=""><p>x</p></a></div>



    <div class="container">
  <div class="interior">
    <a >Basic CSS-Only Modal</a>
  </div>
</div> -->
<RankingPluginDetail v-bind:users="users"></RankingPluginDetail>

</template>

<script>
import RankingPluginDetail from "@/components/RankingPluginDetail.vue";

export default {
  name: "Ranking",
  data() {
    return {
      users: [
        { name: "王狗剩", clear: 7 },
        { name: "李根宝", clear: 9 },
        { name: "David", clear: 1 },
      ],
    };
  },

  //   props: {
  //     img: String,
  //     username:String,
  //     rank:String
  //   }
  components: { RankingPluginDetail },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
