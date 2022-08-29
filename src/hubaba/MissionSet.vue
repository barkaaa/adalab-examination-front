<template>
  <a-layout class="layout-demo">
    <a-layout>
      <a-layout>
        <a-layout-content>
          <div>
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
                    border-radius: 2px;
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
            <a-space class="wrapper" direction="vertical">
              <a-button type="primary" long @click="addOneQuestion"
                >手动创建试卷</a-button
              >
            </a-space>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import { ref } from "vue";
import { defineComponent } from "vue";
import { IconBarChart, IconPen, IconUser,} from "@arco-design/web-vue/es/icon";

export default defineComponent({
  data() {
    return {
      newMission: "",
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