<template>
  <a-layout class="layout-demo">
    <a-layout>
      <a-layout>
        <a-layout-content>
          <RankingPluginDetail/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import {defineComponent} from "vue";
import RankingPluginDetail from "@/components/RankingPluginDetail.vue";
//v-bind:users="users" 
export default defineComponent({
  components: {
    RankingPluginDetail,
  },
});
</script>
<style scoped>

RankingPluginDetail{
  height: 70vh;
}
</style>
    