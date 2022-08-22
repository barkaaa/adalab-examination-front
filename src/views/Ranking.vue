<template>
<h1>1:</h1>
<RankingPlugin>123</RankingPlugin>
<p v-for="(item,i) in list">{{i}},{{item}}</p>

</template>

<script>
import RankingPlugin from '@/components/RankingPlugin.vue';

export default {
  name: 'Ranking',
  data(){
    return{
        list:[1,2,3,4,5,6],
    }
   },

//   props: {
//     img: String,
//     username:String,
//     rank:String
//   }
components:{RankingPlugin}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>