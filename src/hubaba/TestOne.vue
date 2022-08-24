<template>
  <a-layout class="layout-demo">
    <a-layout-sider theme="dark" breakpoint="lg" :width="300">
      <div class="logo" />
      <a-menu
        :default-selected-keys="['mission']"
        :style="{ width: '100%' }"
        @menu-item-click="onClickMenuItem"
      >
        <a-menu-item key="0_1">
          <IconBarChart></IconBarChart>
          排行榜单
        </a-menu-item>
        <a-menu-item key="userManagement">
          <IconUser></IconUser>
          用户管理
        </a-menu-item>
        <a-menu-item key="mission">
          <IconPen></IconPen>
          关卡设置
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="padding-left: 30px"> Header </a-layout-header>
      <a-layout>
        <a-layout-content>
          <a-tabs position="top">
            <template #extra>
              <a-button>添加关卡</a-button>
              <a-button @click="handleClick">从文件导入关卡</a-button>
              <a-modal
                v-model:visible="visible"
                @cancel="handleCancel"
                :on-before-ok="handleBeforeOk"
                unmountOnClose
              >
                <template #title> Title </template>
                <div style="display: flex">
                  <!-- 上传文件 -->
                  <a-upload action="/">
                    <template #upload-button>
                      <div
                        style="
                          background-color: var(--color-fill-2);
                          color: var(--color-text-1);
                          border: 1px dashed var(--color-fill-4);
                          height: 158px;
                          width: 380px;
                          border-radius: 2;
                          line-height: 158px;
                          text-align: center;
                        "
                      >
                        <div>
                          <span style="color: #3370ff"> Click to browse</span>
                          or drag and drop your files
                        </div>
                      </div>
                    </template>
                  </a-upload>
                </div>
              </a-modal>
            </template>
            <a-tab-pane key="1" title="第一关">
              <div :style="{ display: 'float' }">
                <a-card
                  v-for="(type, index) in types"
                  v-bind:key="index"
                  class="card-demo"
                  :title="index + 1 + '. ' + type"
                  hoverable
                >
                  <template #extra>
                    <a-link>More</a-link>
                  </template>
                  {{ description[index] }}
                </a-card>
              </div>
            </a-tab-pane>
            <a-tab-pane key="2" title="第二关"> </a-tab-pane>
            <a-tab-pane key="3" title="第三关"> </a-tab-pane>
          </a-tabs>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import { ref } from "vue";
import { defineComponent } from "vue";
import { IconBarChart, IconPen, IconUser } from "@arco-design/web-vue/es/icon";

export default defineComponent({
  data() {
    return {
      types: [
        "天空",
        "选择",
        "判断",
        "asdfaf",
        "adsfasf",
        "asdfasf",
        "asdfasf",
      ],
      description: [
        "1test test test test test test test test test test test" +
          "test test test test test test test test test test test test test" +
          "test test test test test test test test test test test test test",
        "2test test test test test test test test test test test" +
          "test test test test test test test test test test test test test" +
          "test test test test test test test test test test test test test",
        "3test test test test test test test test test test test" +
          "test test test test test test test test test test test test test" +
          "test test test test test test test test test test test test test",
      ],
      answers: [],
    };
  },
  components: {
    IconBarChart,
    IconPen,
    IconUser,
  },
  methods: {
    onClickMenuItem(key) {
      this.$router.push(key);
    },
    addOneQuestion() {
      this.$router.push("test1");
    },
  },
  setup() {
    const visible = ref(false);

    const handleClick = () => {
      visible.value = true;
    };
    const handleBeforeOk = (done) => {
      window.setTimeout(() => {
        done();
        // prevent close
        // done(false)
      }, 3000);
    };
    const handleCancel = () => {
      visible.value = false;
    };

    return {
      visible,
      handleClick,
      handleBeforeOk,
      handleCancel,
    };
  },
});
</script>



<style scoped>
.card-demo {
  width: 360px;
  margin-left: 24px;
  margin-bottom: 24px;
  transition-property: all;
  float: left;
}
.card-demo:hover {
  transform: translateY(-4px);
}

.wrapper {
  width: 384px;
  padding: 30px;
  border-radius: 4px;
}

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
  flex-direction: column;
  justify-content: center;
  color: var(--color-balck);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}
</style>