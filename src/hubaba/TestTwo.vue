<template>
  <div>
    <a-layout style="padding: 30px 24px;">
      <a-breadcrumb style="padding-bottom: 20px">
        <a-breadcrumb-item>关卡设置</a-breadcrumb-item>
        <a-breadcrumb-item>编辑关卡</a-breadcrumb-item>
      </a-breadcrumb>
      <a-space class="option">
        <a-button type="primary" @click="handleAdd">
          <template #icon>
            <icon-plus/>
          </template>
        </a-button>
        <a-button status="danger" type="primary" @click="handleDelete">
          <template #icon>
            <icon-delete/>
          </template>
        </a-button>
      </a-space>
      <a-divider/>
      <a-table row-key="id" :columns="columns" :data="tData" :row-selection="rowSelection"
               v-model:selectedKeys="selectedKeys" :pagination="pagination">

        <template #edit="{record}">
          <a-button @click="edit(record.stage,record.id)" status="success">
            <template #icon>
              <icon-edit/>
            </template>
          </a-button>
        </template>
      </a-table>
    </a-layout>
    <a-modal v-model:visible="visible" title="添加关卡" @cancel="handleCancel" @ok="handleOk">
      <a-form>
        <a-form-item field="name" label="题号">
          <a-input-number v-model="stage"/>
        </a-form-item>
        <a-form-item field="file" label="文件">
          <a-upload :custom-request="customRequest"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import {IconDelete, IconEdit, IconPlus} from "@arco-design/web-vue/es/icon";
import {reactive, ref} from "vue";
import qs from 'qs'

export default {
  name: "TestTwo",
  components: {IconDelete, IconEdit, IconPlus},
  setup() {
    const selectedKeys = ref([]);
    const visible = ref(false);
    const handleAdd = () => {
      visible.value = true;
    };
    const handleCancel = () => {
      visible.value = false;
    }
    const rowSelection = reactive({
      type: 'checkbox',
      showCheckedAll: true,
      onlyCurrent: false,
    });
    const pagination = {pageSize: 5}

    const columns = [
      {
        title: 'Id',
        dataIndex: 'id',
      },
      {
        title: 'Stage',
        dataIndex: 'stage',
      },
      {
        title: 'URL',
        dataIndex: 'url',
      },
      {
        title: "Type",
        dataIndex: "type"
      }
      ,
      {
        title: 'Edit',
        slotName: 'edit',
      },
    ]


    return {
      rowSelection,
      columns,
      selectedKeys,
      pagination,
      visible,
      handleAdd,
      handleCancel
    }
  }
  ,
  data() {
    return {
      tData: [],
      fileName: "111",
      stage: ""
    }
  },
  methods: {
    edit(stage, id) {
      this.$router.push(
          {name: 'mdedit', params: {stage, id}})
    },
    async handleOk() {
      await this.axios.post("/api/levels/add", {
        stage: this.stage,
        url: this.url
      })
      this.visible = false;
      await this.getData();

    },
    async getData() {
      const res = await this.axios.get("/api/levels/all");
      this.tData = res.data;
    },
    customRequest(option) {
      const {onProgress, onError, onSuccess, fileItem, name} = option
      const xhr = new XMLHttpRequest();
      if (xhr.upload) {
        xhr.upload.onprogress = function (event) {
          let percent;
          if (event.total > 0) {
            // 0 ~ 1
            percent = event.loaded / event.total;
          }
          onProgress(percent, event);
        };
      }
      xhr.onerror = function error(e) {
        onError(e);
      };
      xhr.onload = (() => {
            if (xhr.status < 200 || xhr.status >= 300) {
              return onError(xhr.responseText);
            }
            onSuccess(xhr.response);
            let parse = JSON.parse(xhr.responseText);
            this.url = parse.url;
          }
      )

      const formData = new FormData();
      formData.append('file', fileItem.file);
      xhr.open('post', '/api/oss/uploadFiles', true);
      xhr.send(formData);
      return {
        abort() {
          xhr.abort()
        }

      }
    }
    ,
    async handleDelete() {

      await this.axios.delete("/api/levels/batchdel", {
        data: {ids: this.selectedKeys},
      })
      await this.getData()
    }
    ,
  }
  ,

  mounted() {
    this.getData();
  }

}
</script>

<style scoped>
.option {
  display: flex;
}
</style>