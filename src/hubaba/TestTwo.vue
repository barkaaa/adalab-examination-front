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

        <a-button type="primary" @click="handleUpload">
          <template #icon>
            <icon-upload/>
          </template>
        </a-button>
      </a-space>
      <a-divider/>
      <a-table row-key="id" :columns="columns" :data="tData" :row-selection="rowSelection"
               v-model:selectedKeys="selectedKeys" :pagination="pagination">
        <!--        编辑-->
        <template #setting="{record}">
          <a-button @click="edit(record.id,record.type)" status="success">
            <template #icon>
              <icon-edit/>
            </template>
          </a-button>
          <a-button @click="envSet(record.id)" status="normal">
            <template #icon>
              <icon-settings/>
            </template>
          </a-button>

          <a-popconfirm content="您确定要删除这个关卡吗?" @ok="handleDelete(record.id)" @cancel="cancelDelete">
            <a-button status="danger">
              <template #icon>
                <icon-delete/>
              </template>
            </a-button>
          </a-popconfirm>
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
import {IconDelete, IconEdit, IconPlus, IconUpload, IconSettings} from "@arco-design/web-vue/es/icon";
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";

export default {
  name: "TestTwo",
  components: {IconDelete, IconEdit, IconPlus, IconUpload, IconSettings},
  setup() {

    const selectedKeys = ref([]);
    const visible = ref(false);
    let url = ref("");
    var router = useRouter();
    const handleUpload = () => {
      visible.value = true;
    };
    const handleAdd = () => {
      router.push("/backpanel/mission")
    }
    const handleCancel = () => {
      visible.value = false;
    }


    const envSet = (stage) => {
      console.log(stage)
      router.push({
        name: "test",
        params: {
          stage
        }
      })
    }
    const rowSelection = reactive({
      type: 'checkbox',
      showCheckedAll: true,
      onlyCurrent: false,
    });
    const pagination = {pageSize: 5}
    const columns = [
      {
        title: 'Stage',
        dataIndex: 'id',
      },
      {
        title: 'Type',
        dataIndex: 'type',
      }
      ,
      {
        title: 'Setting',
        slotName: 'setting',
      }
    ]


    return {
      rowSelection,
      columns,
      selectedKeys,
      pagination,
      visible,
      handleAdd,
      handleCancel,
      handleUpload,
      url,
      envSet
    }
  }
  ,
  data() {
    return {
      tData: [],
      stage: 0
    }
  },
  methods: {
    cancelDelete() {
      this.$message.info("您取消了删除");
    },
    edit(stage, type) {
      // 问卷
      if (type === 1) {
        this.$router.push(
            {name: 'mission', params: {stage}})
      } else if (type === 2) {
        this.$router.push(
            {name: 'mdedit', params: {stage}})
      }

    },
    async handleOk() {
      // 创建关卡
      await this.axios.post("/api/episode/createEp", {
        id: this.stage,
        markdownUrl: this.url,
        type: 2
      })
      this.visible = false;
      await this.getData();

    },
    async getData() {
      const res = await this.axios.get("/api/episode/get");
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
    async handleDelete(id) {
      await this.axios.delete("/api/episode/delete/" + id)
      await this.getData()
    }
    ,
  }
  ,

  mounted() {
    this.getData();
  },
}
</script>

<style scoped>
.option {
  display: flex;
}
</style>