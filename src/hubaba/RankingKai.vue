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
import {IconBarChart, IconPen, IconUser} from "@arco-design/web-vue/es/icon";
import RankingPluginDetail from "@/components/RankingPluginDetail.vue";
//v-bind:users="users" 
export default defineComponent({
  data() {
    return {
      // users: [],
    };
  }, mounted() {
    console.log('123');
    // this.axios.get('/api/studentInfo/getRanking')
    //     .then(res => {
    //       this.users = res.data;
    //       //console.log(res.data[0].id);
    //     });
  },

  components: {
    IconBarChart,
    IconPen,
    IconUser,
    RankingPluginDetail,
  },
  methods: {
    onClickMenuItem(key) {
      this.$router.push(key);
    },
  },
});
</script>
<style scoped>
::v-deep .arco-layout-sider-children {
  background-color: gainsboro;
}

::v-deep .arco-menu-item:not(.arco-menu-has-icon) {
  background-color: gainsboro;
}

::v-deep .arco-menu-inner {
  background-color: gainsboro;
}

::v-deep .arco-menu-dark .arco-menu-item.arco-menu-selected,
.arco-menu-dark .arco-menu-item.arco-menu-selected .arco-icon {
  color: green !important;
  font-size: 28px !important;
  background-color: rgb(227, 227, 227);
}

::v-deep .arco-menu-vertical .arco-menu-item:not(.arco-menu-has-icon) {
  font-size: 20px;
  color: black;
}

.layout-demo {
  height: 100vh;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}

.layout-demo :deep(.arco-layout-sider) .logo {
  height: 32px;
  margin: 12px 8px;
  background: rgba(129, 127, 127, 0.2);
}

.layout-demo :deep(.arco-layout-sider-light) .logo {
  background: var(--color-fill-2);
}

.layout-demo :deep(.arco-layout-content) {
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  background: var(--color-bg-3);
}

.layout-demo :deep(.arco-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-balck);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}
</style>
    