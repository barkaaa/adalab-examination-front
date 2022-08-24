<template>
  <a-layout class="layout-demo">
    <a-layout-sider theme="dark" breakpoint="lg" :width="300">
      <div class="logo"/>
      <a-menu
          :default-selected-keys="['0_1']"
          :style="{ width: '100%' }"
          @menu-item-click="onClickMenuItem"
      >
        <a-menu-item key="0_1">
          <IconBarChart></IconBarChart>
          排行榜单
        </a-menu-item>
        <a-menu-item>
          <IconUser></IconUser>
          用户管理
        </a-menu-item>
        <a-menu-item key="BackTemplate">
          <IconPen></IconPen>
          关卡设置
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
<!--      <a-layout-header style="padding-left: 20px"> Header</a-layout-header>-->
      <a-layout>
        <a-layout-content class="content">
          <a-table :columns="columns" :data="data" :scroll="scroll"/>
          <a-split direction="vertical" :default-size="0.9" :style="{height: '500px', marginTop: '300px'}">
          </a-split>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import {defineComponent, reactive} from "vue";
import {IconBarChart, IconPen, IconUser} from "@arco-design/web-vue/es/icon";

export default defineComponent({
  setup() {
    const scroll = {
      x: '80%',
      y: '100%'
    };
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Salary',
        dataIndex: 'salary',
      },
      {
        title: 'Address',
        dataIndex: 'address',
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
    ];
    const data = reactive([{
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com'
    }, {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com'
    }, {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com'
    }, {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com'
    }, {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com'
    }]);
    return {
      scroll,
      columns,
      data
    }
  },

  components: {
    IconBarChart,
    IconPen,
    IconUser,
  },
  methods: {
    onClickMenuItem(key) {
      this.$router.push({
        name: `${key}`,
      });
    },
  },
});
</script>
<style scoped>
::v-deep .arco-layout-sider-children,
.arco-menu-vertical .arco-menu-group-title:not(.arco-menu-has-icon),
.arco-menu-vertical .arco-menu-pop-header:not(.arco-menu-has-icon),
.arco-menu-vertical .arco-menu-inline-header:not(.arco-menu-has-icon) {
  background-color: gainsboro;
}

::v-deep .arco-menu-vertical .arco-menu-item:not(.arco-menu-has-icon) {
  background-color: gainsboro;
}

::v-deep .arco-menu-vertical .arco-menu-inner {
  background-color: gainsboro;
}

::v-deep .arco-menu-dark .arco-menu-item.arco-menu-selected,
.arco-menu-dark .arco-menu-item.arco-menu-selected .arco-icon {
  color: green !important;
  font-size: 28px !important;
}

::v-deep .arco-menu-vertical .arco-menu-item:not(.arco-menu-has-icon) {
  font-size: 20px;
  color: black;
}

.layout-demo {
  height: 100%;
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

.layout-demo :deep(.arco-layout-header) {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
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

.content {
  width: 60vw;
  height: 70vh;
  margin: 0 auto;
  text-align: center;
}
</style>