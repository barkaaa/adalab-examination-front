<template>
  
  <RankingPlugin v-bind:users="users">123</RankingPlugin>
  <!-- <p v-for="(item,i) in list">{{i}},{{item}}</p> -->
</template>

<script>
import RankingPlugin from "@/components/RankingPlugin.vue";

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
  components: { RankingPlugin },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
