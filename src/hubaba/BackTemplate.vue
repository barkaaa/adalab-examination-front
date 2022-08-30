<template>
  <a-layout class="layout-demo">
    <a-layout-sider theme="dark" breakpoint="lg" :width="300">
      <div class="logo"/>
      <a-menu
          :default-selected-keys="defaultSelectedKey"
          :style="{ width: '100%' }"
          @menu-item-click="onClickMenuItem"
      >

        <router-link to="rankingkai">
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
        <router-link to="two">
          <a-menu-item key="3">
            <IconPen></IconPen>
            关卡设置
          </a-menu-item>
        </router-link>
        <router-link to="image">
        <a-menu-item key="5" @click="handleClick">
          <!--          <icon-font type="icon-docker" :size="24"/>-->
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
import {Icon} from '@arco-design/web-vue';
import upLoadDockerModel from "@/components/upLoadDockerModel";
import {ref} from "vue";

const IconFont = Icon.addFromIconFontCn({src: 'https://at.alicdn.com/t/c/font_3614862_l6nys7e6w5c.js'});
export default {
  components: {
    IconBarChart,
    IconPen,
    IconUser,
    IconFont,
    upLoadDockerModel,
    IconDesktop
  },
  setup() {
    const visible = ref(false);
    const defaultSelectedKey = ref([]);
    const handleClick = () => {
      visible.value = true;
    };
    const handleOk = () => {
      visible.value = false;
    };
    const handleCancel = () => {
      visible.value = false;
    }

    return {
      visible,
      defaultSelectedKey,
      handleClick,
      handleOk,
      handleCancel
    }
  },
  data() {
    return {
      images: {}
    }
  },
  methods: {
    onClickMenuItem() {
    },

    getImg() {
      this.axios.get("api/episode/images")
          .then(res => {
            console.log(res.data);
            this.images = res.data;
            console.log(this.images);
          });
    },
    mounted() {
      this.getImg();
    }
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