<template>
  <a-layout class="layout-demo">
    <a-layout-sider theme="dark" breakpoint="lg" :width="300">
      <div class="logo"/>
      <a-menu
          :default-selected-keys="['1']"
          :style="{ width: '100%' }"
          @menu-item-click="onClickMenuItem">
        <router-link to="RankingList">
          <a-menu-item key="1">
            <IconBarChart></IconBarChart>
            排行榜单
          </a-menu-item>
        </router-link>
        <router-link to="userManagement">
          <a-menu-item key="2">
            <IconUser></IconUser>
            用户管理
          </a-menu-item>
        </router-link>
        <router-link to="missionManagement">
          <a-menu-item key="3">
            <IconPen></IconPen>
            关卡设置
          </a-menu-item>
        </router-link>
        <router-link to="image">
          <a-menu-item key="5">
            <icon-desktop/>
            镜像设置
          </a-menu-item>
        </router-link>
      </a-menu>
    </a-layout-sider>
    <a-layout style="padding: 0 24px;">
      <router-view/>
    </a-layout>
  </a-layout>

</template>
<script>
import {IconBarChart, IconPen, IconUser, IconDesktop} from "@arco-design/web-vue/es/icon";

export default {
  components: {
    IconBarChart,
    IconPen,
    IconUser,
    IconDesktop
  },
  methods: {
    onClickMenuItem() {
    },
  },
};
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
  color: #046511 !important;
  font-size: 28px !important;
  background-color: rgb(232, 229, 229);
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

.main-box {
  padding: 30px 30px 0 30px;
}
</style>