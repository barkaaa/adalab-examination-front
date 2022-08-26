<template>
  <a-layout class="layout-demo">
    <a-layout-sider theme="dark" breakpoint="lg" :width="300">
      <div class="logo" />
      <a-menu
        :default-selected-keys="['mission']"
        :style="{ width: '100%' }"
        @menu-item-click="onClickMenuItem"
      >
        <a-menu-item key="rankingkai">
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
              <a-modal
                v-model:visible="visible"
                @cancel="handleCancel"
                :on-before-ok="handleBeforeOk"
                unmountOnClose
              >
              </a-modal>
              <a-button @click="handleClick1">从文件导入关卡</a-button>
              <a-modal
                v-model:visible="visible1"
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
            <a-tab-pane
              v-for="(mission, index) in missions"
              v-bind:key="index"
              v-model:key="nowMission"
              :title="'第' + (index + 1) + '关'"
            >
              <div v-if="mission.type == 'common'" :style="{ display: 'grid' }">
                <div style="display: flex; flex-direction: column">
                  <a-card
                    v-for="(question, index) in missions[index].textContents"
                    :key="question"
                    class="card-demo"
                    :title="'问题' + (index + 1)"
                    hoverable
                  >
                    <template #extra>
                      <a-link
                        props
                        key="index"
                        @click="moreDetails(index, question)"
                        >修改</a-link
                      >
                    </template>
                    <a-modal
                      v-model:visible="visible3[index]"
                      @close="saveChange(question)"
                      ok-text="保存并关闭，点右上角X同理"
                      hide-cancel
                    >
                      <template #title>题号{{ index + 1 }}</template>
                      <div style="display: flex; flex-direction: column">
                        题型
                        <a-select
                          :default-value="question.questionType"
                          v-model="changeTypeMark"
                          :style="{ width: '320px' }"
                        >
                          <a-option>填空</a-option>
                          <a-option>选择</a-option>
                        </a-select>
                        问题描述
                        <a-textarea v-model="question.description" auto-size />
                        <div v-if="changeTypeMark == '选择'">
                          选择题选项
                          <div
                            v-for="index in changeOptionsMark"
                            v-bind:key="index"
                          >
                            {{ alphabet[index - 1] }}.
                            <a-textarea
                              v-model="changeChoices[index - 1]"
                              auto-size
                            />
                          </div>
                          <a-button @click="addOptionsMark">添加选项</a-button>
                        </div>
                      </div>
                    </a-modal>
                    <div style="font-size: 20px; text-align: left">
                      <span style="color: rgb(90, 160, 160)">题型：</span
                      >{{ question.questionType }}
                    </div>
                    <a-divider />
                    <div
                      style="
                        font-size: 20px;
                        text-align: left;
                        color: rgb(90, 160, 160);
                      "
                    >
                      题目描述:
                    </div>
                    <div
                      style="
                        text-align: left;
                        margin-top: 10px;
                        margin-left: 40px;
                      "
                    >
                      {{ question.description }}
                    </div>
                    <a-collapse
                      v-if="question.questionType == '选择'"
                      :bordered="false"
                    >
                      <a-collapse-item header="展开选项">
                        <div
                          v-for="(answer, index) in question.options"
                          v-bind:key="index"
                        >
                          {{ alphabet[index] }}. {{ answer }}
                        </div>
                      </a-collapse-item>
                    </a-collapse>
                  </a-card>
                </div>
                <div>
                  <a-button @click="handleClick2">添加问题</a-button>
                  <a-modal
                    v-model:visible="visible2"
                    @cancel="handleCancel"
                    :on-before-ok="OkNewquestion"
                  >
                    <template #title> 添加问题 </template>
                    <div style="display: flex; flex-direction: column">
                      <a-select
                        v-model="isChoose"
                        :style="{ width: '320px' }"
                        placeholder="选择问题类型 ..."
                      >
                        <a-option>填空</a-option>
                        <a-option>选择</a-option>
                      </a-select>
                      问题描述
                      <a-textarea
                        v-model="newDescription"
                        default-value=""
                        auto-size
                      />
                      <div v-show="isChoose == '选择'">
                        选择题选项
                        <div v-for="index in choicesNumber" v-bind:key="index">
                          {{ alphabet[index - 1] }}.
                          <a-textarea
                            v-model="choices[index - 1]"
                            default-value=""
                            auto-size
                          />
                        </div>
                        <a-button @click="addChoice">添加选项</a-button>
                      </div>
                    </div>
                  </a-modal>
                  <a-button>保存当前关卡</a-button>
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import { ref, reactive } from "vue";
import { defineComponent } from "vue";
import { IconBarChart, IconPen, IconUser } from "@arco-design/web-vue/es/icon";

export default defineComponent({
  data() {
    return {
      alphabet: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
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
    const visible1 = ref(false);
    const visible2 = ref(false);
    const visible3 = ref([]);
    var nowMission = ref();
    var missions = reactive([
      {
        type: "common",
        textContents: [
          {
            questionType: "填空",
            description:
              "1 test test test test test test test test test test test " +
              "test test test test test test test test test test test test test " +
              "test test test test test test test test test test test test test",
          },
          {
            questionType: "选择",
            description:
              "2 test test test test test test test test test test test " +
              "test test test test test test test test test test test test test " +
              "test test test test test test test test test test test test test " +
              "test test test test test test test test test test test test test " +
              "test test test test test test test test test test test test test " +
              "test test test test test test test test test test test test test " +
              "test test test test test test test test test test test test test " +
              "test test test test test test test test test test test test test " +
              "test test test test test test test test test test test test test " +
              "test test test test test test test test test test test test test " +
              "test test test test test test test test test test test test test " +
              "test test test test test test test test test test test test test " +
              "test test test test test test test test test test test test test " +
              "test test test test test test test test test test test test test",
            options: ["选a", "选b", "选c"],
          },
          {
            questionType: "填空",
            description:
              "3 test test test test test test test test test test test " +
              "test test test test test test test test test test test test test " +
              "test test test test test test test test test test test test test",
          },
        ],
      },
      { type: "file" },
    ]);

    var isChoose = ref();
    var newDescription = ref();
    var choicesNumber = ref(4);
    var choices = ref([]);
    var changeTypeMark = ref();
    var changeOptionsMark = ref(0);
    var changeChoices = ref([]);
    var changeDescription = ref();

    const deepCopy = (obj) => {
      if (typeof obj != "object") {
        return obj;
      }
      var newobj = {};
      for (var attr in obj) {
        newobj[attr] = deepCopy(obj[attr]);
      }
      return newobj;
    };

    const handleClick1 = () => {
      visible1.value = true;
    };
    const handleClick2 = () => {
      visible2.value = true;
      choicesNumber.value = 4;
    };
    const moreDetails = (index, question) => {
      visible3.value[index] = true;
      changeTypeMark.value = question.questionType;
      if (question.options) {
        changeOptionsMark.value = question.options.length;
        changeChoices.value = question.options;
      } else {
        changeOptionsMark.value = 4;
        changeChoices.value = [];
        question.options = [];
      }
    };
    const OkNewquestion = (done) => {
      if (isChoose.value == "选择") {
        missions[0].textContents.push({
          questionType: "选择",
          description: deepCopy(newDescription.value),
          options: deepCopy(choices.value),
        });
      } else {
        missions[0].textContents.push({
          questionType: deepCopy(isChoose.value),
          description: deepCopy(newDescription.value),
        });
      }
      isChoose.value = null;
      newDescription.value = null;
      choices.value.length = 0;
      done();
    };

    const handleBeforeOk = (done) => {
      window.setTimeout(() => {
        done();
        // prevent close
        // done(false)
      }, 3000);
    };

    const handleCancel = () => {
      visible1.value = false;
      visible2.value = false;
      isChoose.value = null;
      newDescription.value = null;
    };

    const addChoice = () => {
      choicesNumber.value++;
    };

    const addOptionsMark = () => {
      changeOptionsMark.value++;
    };

    const saveChange = (question) => {
      question.questionType = deepCopy(changeTypeMark.value);
    };

    return {
      visible1,
      visible2,
      visible3,
      nowMission,
      handleClick1,
      handleClick2,
      moreDetails,
      handleBeforeOk,
      handleCancel,
      missions,
      isChoose,
      choices,
      choicesNumber,
      addChoice,
      newDescription,
      OkNewquestion,
      changeTypeMark,
      changeOptionsMark,
      addOptionsMark,
      changeChoices,
      saveChange,
      changeDescription,
    };
  },
});
</script>

<style scoped>
::v-deep .arco-collapse-item-header-title {
  color: rgb(110, 110, 180);
}
.card-demo {
  width: 75vm;
  margin-left: 120px;
  margin-right: 120px;
  margin-bottom: 0px;
  transition-property: all;
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
  height: 99vh;
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