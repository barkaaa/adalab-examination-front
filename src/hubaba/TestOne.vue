<template>
  <a-layout class="layout-demo">
    <a-layout>
      <a-layout-header
        style="
          font-size: 36px;
          text-align: center;
          padding: 30px;
          height: 100px;
        "
      >
        题目{{ missions["missionNumber"] }}
      </a-layout-header>
      <a-layout>
        <a-layout-content style="padding: 30px">
          <div :style="{ display: 'grid' }">
            <div style="display: flex; flex-direction: column">
              <a-card
                v-for="(question, index) in missions.textContents"
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

                  <a-popconfirm
                    content="确定删除该题目吗?"
                    @ok="confirmDelete(index)"
                  >
                    <a-link props key="index">删除</a-link>
                  </a-popconfirm>
                </template>

                <a-modal
                  width="60vw"
                  v-model:visible="visible3[index]"
                  @close="saveChange(question)"
                  ok-text="关闭"
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
                    <a-divider />
                    问题描述
                    <a-textarea v-model="question.description" auto-size />
                    <div v-if="changeTypeMark == '选择'">
                      <a-divider />
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
                      <a-button @click="minusOptionsMark">减少选项</a-button>
                      <a-divider />
                      <a-space direction="vertical" size="large">
                        是否为多选
                        <a-radio-group v-model="question.isMultiple">
                          <a-radio value="true">是</a-radio>
                          <a-radio value="false">否</a-radio>
                        </a-radio-group>
                        是否有额外填空选项
                        <a-radio-group v-model="question.isAdditional">
                          <a-radio value="true">是</a-radio>
                          <a-radio value="false">否</a-radio>
                        </a-radio-group>
                      </a-space>
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
                  style="text-align: left; margin-top: 10px; margin-left: 40px"
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
            <div style="margin: 16pt">
              <a-button @click="handleClick2">添加问题</a-button>
              <a-modal
                width="60vw"
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

              <a-button @click="saveMission">保存当前关卡</a-button>
            </div>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import { ref, reactive, getCurrentInstance, onBeforeMount } from "vue";
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
      missionNum: this.$route.params.stageNum,
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
    saveMission() {
      this.axios
        .put("/api/questionnaire/addorupdate", this.missions)
        .then((res) => {
          console.log(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.axios
        .post("/api/episode/createEp", this.episodeAdd)
        .then((res) => {
          console.log(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  setup() {
    const visible1 = ref(false);
    const visible2 = ref(false);
    var visible3 = ref([false]);
    var episodeAdd = { id: 0, type: 1 };

    let currentInstance = getCurrentInstance();
    const { axios } = getCurrentInstance().appContext.config.globalProperties;
    var missions = reactive({
      missionNumber: 0,
      textContents: [],
    });

    var isChoose = ref();
    var newDescription = ref();
    var choicesNumber = ref(4);
    var choices = ref([]);
    var changeTypeMark = ref();
    var changeOptionsMark = ref();
    var changeChoices = ref([]);
    var changeDescription = ref();

    onBeforeMount(async () => {
      const selectMission = parseInt(currentInstance.data.missionNum);
      episodeAdd.id = selectMission;
      let r = await axios.get("/api/questionnaire/getone", {
        params: { missionNum: selectMission },
      });
      missions.missionNumber = selectMission;

      for (let i = 0; i < r.data.length; i++) {
        missions.textContents.push({
          questionType: "",
          description: "",
          isAdditional: "",
          isMultiple: "",
          options: [],
        });
        missions.textContents[i].description = r.data[i].theme;
        missions.textContents[i].isAdditional = r.data[i].isAddtional;
        missions.textContents[i].isMultiple = r.data[i].isMultiple;
        missions.textContents[i].options = r.data[i].options
          .split("?")
          .slice(0, -1);
        const type = r.data[i].questionType;
        if (type == 2) {
          missions.textContents[i].questionType = "选择";
        } else {
          missions.textContents[i].questionType = "填空";
        }
      }
    });

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

    const arrayDeepCopy = (arr1) => {
      var arr2 = [];
      for (var i = 0; i < arr1.length; i++) {
        arr2.push(arr1[i]);
      }
      return arr2;
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
        missions.textContents.push({
          questionType: "选择",
          description: deepCopy(newDescription.value),
          options: arrayDeepCopy(choices.value),
          isMultiple: "false",
          isAdditional: "false",
        });
      } else {
        missions.textContents.push({
          questionType: deepCopy(isChoose.value),
          description: deepCopy(newDescription.value),
          options: [],
          isMultiple: "false",
          isAdditional: "false",
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

    const confirmDelete = (index) => {
      missions.textContents.splice(index, 1);
    };

    const addChoice = () => {
      choicesNumber.value++;
    };

    const addOptionsMark = () => {
      changeOptionsMark.value++;
    };

    const minusOptionsMark = () => {
      changeOptionsMark.value--;
      changeChoices.value.length = changeChoices.value.length - 1;
    };

    const saveChange = (question) => {
      question.questionType = deepCopy(changeTypeMark.value);
    };

    return {
      visible1,
      visible2,
      visible3,
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
      arrayDeepCopy,
      minusOptionsMark,
      confirmDelete,
      episodeAdd,
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