<template>
  <a-layout class="layout-demo">
    <a-layout>
      <a-layout-content class="content" >
        <a-table :columns="columns" :data="tableData" :column-resizable="true" :pagination="pagination" class="table">
          <template #header="{record}">
            <a-switch checked-color="#046511" unchecked-color="#E3E3EC" :default-checked="record.ranking>=5"/>
          </template>
          <template #option="{ record }">
            <a-button @click="handleClick(record.name)">
              <icon-robot type="icon-person" :size="20"/>
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
import {IconBarChart, IconPen, IconRobot, IconUser} from "@arco-design/web-vue/es/icon";
import {getCurrentInstance, ref} from "vue";
import {Icon} from '@arco-design/web-vue';

const IconFont = Icon.addFromIconFontCn({src: 'https://at.alicdn.com/t/c/font_3611034_pmqkuts7v7b.js'});
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
    const handleClick =(name) => {
      visible.value = true;
      axios.post("/api/studentInfo/getDetail", {name}).then((res)=> {
        tData.value = res.data;
        list.map((item) => {
          item.value = tData.value[item.label];
        })
      });
    }
    const handleOk = () => {
      visible.value = false;
    }
    const list = [{
      label: 'name',
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
        }, {
          title: '姓名',
          dataIndex: 'name',
        }, {
          title: '在职？',
          dataIndex: 'isWork',
        }, {
          title: '年龄',
          dataIndex: 'age',
        }, {
          title: '电话',
          dataIndex: 'tel',
        }, {
          title: '当前进度',
          dataIndex: 'schedule',
        }, {
          title: '链接-详情、网页',
          dataIndex: 'webPage',
        }, {
          title: 'Details',
          slotName: 'option'
        }],
      tableData: [],
      pagination: {
        pageSize: 10,
      }
    }
  },
  components: {
    IconBarChart,
    IconPen,
    IconUser,
    IconRobot,
    IconFont,
  },
  created() {
    fetch("/api/studentInfo/getRanking")
        .then((res) => res.json())
        .then((response) => {
          this.tableData = response;
        });
  },
  methods: {
    onClickMenuItem(key) {
      this.$router.push(key);
    }
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-balck);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}

.content {
  height: 90%;
}

::v-deep .arco-table .arco-table-th {
  font-size: 14px;
  font-weight: bolder !important;
  color: #046511;
}
::v-deep  .arco-btn .arco-btn-primary .arco-btn-shape-square .arco-btn-size-medium .arco-btn-status-normal{
  background: #046511 !important;
}
.table {
  width: 80%;
  margin: 5vh auto 5vh;

}
</style>