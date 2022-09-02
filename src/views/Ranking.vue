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
<!-- <RankingPluginDetail v-bind:users="users"></RankingPluginDetail> -->


<!-- <ImgSet>1</ImgSet> -->
<RankingPluginDetail v-bind:users="users"></RankingPluginDetail>
<FilePlugin></FilePlugin>


<table>
    <tr>
        <th>Header 1</th>
        <th>Header 2</th>
    </tr>
    <tr>
        <td>row 1, cell 1</td>
        <td>row 1, cell 2</td>
    </tr>
    <tr>
        <td>row 2, cell 1</td>
        <td>row 2, cell 2</td>
    </tr>
</table>


</template>

<script >
import RankingPluginDetail from "@/components/RankingPluginDetail.vue";
import ImgSet from "@/components/ImgSet.vue";
import FilePlugin from '@/components/FilePlugin.vue';

export default {
  name: "Ranking",
  data() {
    return {
      users: [
        { name: "王狗剩", clear: 7 },
        { name: "李根宝", clear: 9 },
        { name: "David", clear: 1 },
      ],
      rankings: [
        { name: "王狗剩", clear: 7 },
        { name: "李根宝", clear: 9 },
        { name: "David", clear: 1 },
      ],
    };
  },
   mounted() {
    // this.axios.get('/api/studentInfo/getRanking')
    //   .then(res=>{
    //     this.users = res.data;
    //     //console.log(res.data[0].id);
    //   });

    // this.axios.get('/api/studentInfo/getPagingRanking/1')
    //   .then(res=>{
    //     this.users = res.data;
    //     //console.log(res.data[0].id);
    //   });


  },
  methods:{


  },
  //   props: {
  //     img: String,
  //     username:String,
  //     rank:String
  //   }
  components: { RankingPluginDetail, ImgSet,FilePlugin },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table{border: 1px solid blue;width: 540px;height: 340px;}
table{border-collapse:collapse;}
th{background-color:green;color:white;}
td{
  border: 1px solid blue;
}
</style>
