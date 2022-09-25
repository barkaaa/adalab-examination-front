<template>
  <a-layout class="layout-demo">
    <a-layout>
      <a-layout-content class="content">
        <a-table :columns="columns" :data="tableData" :column-resizable="true" :pagination="pagination" class="table">
          <template #header="{record}">
            <!--            <a-switch checked-color="#046511" unchecked-color="#E3E3EC" :disabled="true"-->
            <!--                      :default-checked="record.episode>=10"/>-->
            <icon-check-circle-fill :style="{fontSize:'32px', color:'green'}" :stroke-width="2"
                                    v-if="record.episode>=totalNumberOfLevels"/>
            <icon-exclamation-circle-fill :style="{fontSize:'32px',color:'red'}" :stroke-width="2" v-else/>
          </template>
          <template #option="{ record }">
            <a-button @click="handleClick(record)">
              <icon-list :size="20"/>
            </a-button>
          </template>
        </a-table>
        <a-modal v-model:visible="visible" @ok="handleOk" :footer="false" :hide-cancel="true" :closable="false">
          <template #title>
            {{ selectName + "的详细信息" }}
            <a-popover position="bl">
              <a-button class="button" style="background: white">
                <template #icon>
                  <icon-settings/>
                </template>
              </a-button>
              <template #content>
                <p>添加或删除问卷绑定标签</p>
                <div class="tag_box">
                  <a-tag
                      v-for="tag of tags"
                      style="margin-bottom: 5px"
                      :key="tag"
                      :closable="true"
                      @close="handleRemove(tag)"
                  >
                    {{ tag.tag }}
                  </a-tag>

                  <a-input
                      v-if="showInput"
                      ref="inputRef"
                      :style="{ width: '90px'}"
                      size="mini"
                      v-model.trim="inputVal"
                      @keyup.enter="handleAdd"
                      @blur="handleAdd"
                  />
                  <a-tag
                      v-else
                      @click="handleEdit"
                  >
                    <template #icon>
                      <icon-plus/>
                    </template>
                    Add Tag
                  </a-tag>
                </div>
              </template>
            </a-popover>
          </template>
          <a-list>
            <template #header>
              Tags
            </template>
            <a-list-item v-for="item in tagList" :key="item.tag">
              <a-space size="large">
                <a-tag style="min-width: 100px;">{{ item.tag }}</a-tag>
                <a-tag>{{ item.info }}</a-tag>
              </a-space>
            </a-list-item>

          </a-list>
        </a-modal>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import {getCurrentInstance, ref, nextTick} from "vue";
import {Icon} from '@arco-design/web-vue';
import {IconCheckCircleFill, IconExclamationCircleFill, IconList} from '@arco-design/web-vue/es/icon';

const IconFont = Icon.addFromIconFontCn({src: 'https://at.alicdn.com/t/c/font_3611034_28a0sn0mma2.js'});
export default {
  setup() {
    let tData = ref({});
    const visible = ref(false);
    const size = ref('large');
    let currentInstance = getCurrentInstance();
    let tagList = ref([]);
    let tags = ref([]);
    let selectName = ref();
    const inputRef = ref(null);
    const showInput = ref(false);
    const inputVal = ref('');
    const {axios} = currentInstance.appContext.config.globalProperties
    const align = {
      value: 'right'
    }
    const handleClick = async (stu) => {
      getTags();
      selectName.value = stu.name;
      let res = await axios.get(`/api/tag/getStuTagInfo/${stu.id}`);
      tagList.value = res.data.data;
      tagList.value.push({tag: 'create_date', info: stu.createdDate});
      tagList.value.push({tag: 'begin_date', info: stu.beginDate});
      tagList.value.push({tag: 'lastEdited', info: stu.lastEdited});
      visible.value = true;
    }
    const handleOk = () => {
      visible.value = false;
    }

    const getTags = async () => {
       let res = await axios.get("/api/tag/tags");
      tags.value=res.data.data;
    }

    const handleEdit = () => {
      showInput.value = true;

      nextTick(() => {
        if (inputRef.value) {
          inputRef.value.focus();
        }
      });
    };

    const handleAdd = async () => {
      if (inputVal.value) {
        await axios.get("/api/tag/create", {
          params: {
            name:inputVal.value
          }
        })
       getTags();
        inputVal.value = '';
      }
      showInput.value = false;
    };

    const handleRemove = async (key) => {
      axios.delete(`/api/tag/delete/${key.id}`);
    };
    const list = [
      {
        label: 'Date Created',
        value: '',
        cName: "icon-shijian",
      }, {
        label: 'Begin Date',
        value: '',
        cName: "icon-shijian",
      }, {
        label: 'Last Edited',
        value: '',
        cName: "icon-shijian",
      }];
    return {
      visible,
      handleClick,
      handleOk,
      handleAdd,
      handleEdit,
      handleRemove,
      tData,
      list,
      size,
      align,
      tagList,
      selectName,
      inputRef,
      inputVal,
      showInput,
      tags,
      getTags
    }
  },
  data() {
    return {
      columns: [
        {
          title: 'Header',
          slotName: 'header',
          align: 'center'
        }, {
          title: '姓名',
          dataIndex: 'name',
          align: 'center'
        }, {
          title: '当前进度',
          dataIndex: 'episode',
          align: 'center'
        }, {
          title: '链接-详情、网页',
          dataIndex: 'webPage',
          align: 'center'
        }, {
          title: 'Details',
          slotName: 'option',
          align: 'center'
        }],
      tableData: [],
      pagination: {
        pageSize: 10,
      },
      totalNumberOfLevels: '',
    }
  },
  components: {
    IconFont,
    IconList,
    IconCheckCircleFill,
    IconExclamationCircleFill
  },
  methods: {
    getList() {
      this.axios.get("/api/studentInfo/getList")
          .then(res => {
            this.tableData = res.data.data;
          });
    },
    getCounts() {
      this.axios.get("/api/episode/student/counts")
          .then(res => {
            this.totalNumberOfLevels = res.data.data;
          });
    }
  },
  created() {
    this.getList();
    this.getCounts();
  },
};
</script>
<style scoped>
::v-deep .arco-modal .arco-modal-header .arco-modal-title .arco-modal-title-align-center {
  font-size: 22px !important;
}

::v-deep .arco-descriptions-item-label-block {
  font-size: 16px !important;
}

::v-deep .arco-tag-size-medium {
  font-size: 14px !important;
}

.content {
  height: 90%;
}

::v-deep .arco-table .arco-table-th {
  font-size: 14px;
  font-weight: bolder !important;
  color: #046511;
}

::v-deep .arco-btn .arco-btn-primary .arco-btn-shape-square .arco-btn-size-medium .arco-btn-status-normal {
  background: #046511 !important;
}


.table {
  width: 80%;
  margin: 5vh auto 5vh;
}

.tag_box {
  display: flex;
  flex-direction: column;
}
</style>
