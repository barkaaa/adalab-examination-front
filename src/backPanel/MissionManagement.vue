<template>
  <div>
    <a-layout style="padding: 30px 24px;">

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
      <a-table :columns="columns" :data="tData"
               :pagination="pagination">

        <template #type="{record}">
          <a-tag v-if="record.type===0" color="green">引导
          </a-tag>
          <a-tag v-if="record.type===2" color="red">挑战
          </a-tag>
          <a-tag v-if="record.type===1" color="blue">问卷
          </a-tag>
        </template>
        <!--        编辑-->
        <template #setting="{record}">
          <a-button @click="edit(record.id,record.type)" status="success">
            <template #icon>
              <icon-edit/>
            </template>
          </a-button>
          <a-button @click="envSet(record.id)" status="normal" :disabled="record.type===0||record.type===1">
            <template #icon>
              <icon-settings/>
            </template>
          </a-button>

          <a-popconfirm content="您确定要删除这个关卡吗?" @ok="handleDelete(record.id,record.type)" @cancel="cancelDelete">
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
          <a-select v-model="type" placeholder="请选择关卡类型">
            <a-option>0</a-option>
            <a-option>2</a-option>
          </a-select>
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
  name: "MissionManagement",
  components: {IconDelete, IconEdit, IconPlus, IconUpload, IconSettings},
  setup() {

    const selectedKeys = ref([]);
    const visible = ref(false);
    let url = ref("");
    let type = ref();
    var router = useRouter();
    var tDataLength = ref(0);
    const handleUpload = () => {
      visible.value = true;
    };
    const handleAdd = () => {
      router.push({name: "cmedit", params: {stage: tDataLength.value + 1, type: "add"}})
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
        slotName: 'type',
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
      type,
      handleAdd,
      handleCancel,
      handleUpload,
      url,
      envSet,
      tDataLength,
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
            {name: 'mission', params: {stage, type: "edit"}})
      } else if (type === 2 || type === 0) {
        this.$router.push(
            {name: 'mdedit', params: {stage}})
      }

    },
    async handleOk() {
      // 创建关卡
      let res = await this.axios.post("/api/episode/createEp", {
        id: this.tDataLength + 1,
        markdownUrl: this.url,
        type: this.type
      })

      // console.log(this.$message.)
      this.$message.success(res.data.data.message)
      this.visible = false;
      await this.getData();

    },
    async getData() {
      const res = await this.axios.get("/api/episode/get");
      this.tData = res.data.data;
      this.tDataLength = this.tData.length;
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
    async handleDelete(id, type) {
      let res = await this.axios.delete("/api/episode/delete/" + id)

      if (type === 1) {
        await this.axios.delete(`/api/questionnaire/DeleteQuestionnaire/${id}`)
        await this.axios.put(`/api/questionnaire/moveQuestionnaire/${id}`)
      }
      this.$message.success(res.data.data.message)
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