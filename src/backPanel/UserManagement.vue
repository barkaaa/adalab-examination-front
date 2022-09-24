<template>
  <a-layout class="layout-demo">
    <a-layout>
      <a-layout-content class="content">
        <a-table :columns="columns" :data="tableData" :column-resizable="true" :pagination="pagination" class="table" >
          <template #header="{record}">
            <!--            <a-switch checked-color="#046511" unchecked-color="#E3E3EC" :disabled="true"-->
            <!--                      :default-checked="record.episode>=10"/>-->
            <icon-check-circle-fill :style="{fontSize:'32px', color:'green'}" :stroke-width="2"
                                    v-if="record.episode>=totalNumberOfLevels"/>
            <icon-exclamation-circle-fill :style="{fontSize:'32px',color:'red'}" :stroke-width="2" v-else/>
          </template>
          <template #option="{ record }">
            <a-button @click="handleClick(record.name)">
              <icon-list :size="20"/>
            </a-button>
          </template>
        </a-table>
        <a-modal v-model:visible="visible" @ok="handleOk" :footer="false" :hide-cancel="true" :closable="false">
          <template #title>
            {{ tData.name + "的详细信息" }}
          </template>
          <a-descriptions style="margin-top: 20px" :data="list" :column="1" :align="align" :size="size">
            <a-descriptions-item v-for="item of list" :label="item.label">
              <template #label>
                <icon-font :type="item.cName" :size="20" style="vertical-align: middle">
                </icon-font>
                {{ item.label }}
              </template>
              <a-tag>{{ item.value }}</a-tag>
            </a-descriptions-item>
          </a-descriptions>
        </a-modal>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import {getCurrentInstance, ref} from "vue";
import {Icon} from '@arco-design/web-vue';
import {IconCheckCircleFill, IconExclamationCircleFill, IconList} from '@arco-design/web-vue/es/icon';

const IconFont = Icon.addFromIconFontCn({src: 'https://at.alicdn.com/t/c/font_3611034_28a0sn0mma2.js'});
export default {
  setup() {
    let tData = ref({});
    const visible = ref(false);
    const size = ref('large');
    let currentInstance = getCurrentInstance();
    const {axios} = currentInstance.appContext.config.globalProperties
    const align = {
      value: 'right'
    }
    const handleClick = (name) => {
      visible.value = true;
      axios.post("/api/studentInfo/getDetail", {name}).then((res) => {
        tData.value = res.data.data;
        list.map((item) => {
          item.value = tData.value[item.label];
        })
      });
    }
    const handleOk = () => {
      visible.value = false;
    }
    const list = [{
      label: 'status',
      value: "",
      cName: "icon-sort",
    }, {
      label: 'Days needed',
      value: '',
      cName: "icon-arrows-alt",
    }, {
      label: 'Actual Days',
      value: '',
      cName: "icon-arrows-alt",
    }, {
      label: 'Date Created',
      value: '',
      cName: "icon-shijian",
    }, {
      label: 'Last Edited',
      value: '',
      cName: "icon-shijian",
    }, {
      label: 'Current Week',
      value: '',
      cName: "icon-accesskeys",
    }, {
      label: 'Type',
      value: '',
      cName: "icon-sort",
    }];
    return {
      visible,
      handleClick,
      handleOk,
      tData,
      list,
      size,
      align
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
          title: '在职？',
          dataIndex: 'isWork',
          align: 'center'
        }, {
          title: '年龄',
          dataIndex: 'age',
          align: 'center'
        }, {
          title: '电话',
          dataIndex: 'tel',
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
</style>
