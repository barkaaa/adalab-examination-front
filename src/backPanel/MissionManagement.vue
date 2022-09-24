<template>
  <div>
    <a-layout style="padding: 30px 24px;">

      <a-space class="option">

        <a-popover position="bl">
          <a-button class="button" :style="{background:'#165DE1'}">
            <template #icon>
              <icon-file :style="{color:'white'}"/>
            </template>
          </a-button>

          <template #content>
            <p>问卷列表|点击编辑</p>
            <div class="ques_list_box">
              <a-button type="primary" v-for="item in ques" :key="item.name"
                        :style="{margin:'10px',width:'100px'}"
                        @click="handleQuesEdit(item.id,item.name)"
              >
                {{ item.name }}
              </a-button>

              <a-button type="primary" @click="handleAdd" :style="{margin:'10px',width:'100px',marginLeft:'auto'}">
                <template #icon>
                  <icon-plus/>
                </template>
              </a-button>
            </div>
          </template>
        </a-popover>

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

          <a-radio-group type="button" v-model="record.type" @change="typeChange(record.type,record.id)">
            <a-radio :value=0 :style="record.type==0?{color:'blue'}:{}">引导</a-radio>
            <a-radio :value=1 :style="record.type==1?{color:'blue'}:{}">问卷</a-radio>
            <a-radio :value=2 :style="record.type==2?{color:'blue'}:{}">挑战</a-radio>
          </a-radio-group>

        </template>
        <!--        编辑-->
        <template #setting="{record}">
          <a-button @click="edit(record.id,record.type)" status="success" :disabled="record.type===1">
            <template #icon>
              <icon-edit/>
            </template>
          </a-button>
          <a-popover position="bl" trigger="click">
            <a-button class="button" :disabled="!(record.type===1)">
              <template #icon>
                <IconQuestion/>
              </template>
            </a-button>

            <template #content>
              <div class="ques_list_box">
                <p :style="{margin:'auto',fontSize:'24px'}">绑定问卷</p>
                <a-divider :margin="-1"/>
                <a-button type="primary" v-for="item in ques" :key="item.name"
                          :style="record.questionnaire===item.id?{margin:'5px',width:'100px'}:{margin:'5px',width:'100px',color:'#165DE1',background:'white'}"
                          @click="handleQuesSelect(item.id,record.id)"
                >
                  {{ item.name }}
                </a-button>
              </div>

            </template>
          </a-popover>

          <a-button @click="envSet(record.id)" status="normal" :disabled="!(record.type===2)">
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
    <a-modal v-model:visible="visible" title="添加关卡" @cancel="handleCancel" @ok="handleOk" @close="handleClose">
      <a-form ref="formRef" :model="temp">
        <a-form-item field="name" label="类型">
          <a-select v-model="type" placeholder="请选择关卡类型">
            <a-option value="2">测试关</a-option>
            <a-option value="0">引导关</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="file" label="文件">
          <a-upload :custom-request="customRequest" @before-remove="beforeRemove"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import {
  IconDelete,
  IconEdit,
  IconPlus,
  IconUpload,
  IconSettings,
  IconQuestion,
  IconFile
} from "@arco-design/web-vue/es/icon";
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {Modal} from "@arco-design/web-vue";

export default {
  name: "MissionManagement",
  components: {IconDelete, IconEdit, IconPlus, IconUpload, IconSettings, IconQuestion, IconFile},
  setup() {
    const selectedKeys = ref([]);
    const visible = ref(false);
    let tData = ref([]);
    let url = ref("");
    let type = ref();
    var router = useRouter();
    var tDataLength = ref(0);
    const handleUpload = () => {
      visible.value = true;
    };
    const handleAdd = () => {
      router.push({name: "cmedit", params: {type: "add"}})
    }

    const handleQuesEdit = (id, name) => {
      router.push({name: "cmedit", params: {type: "add", ques: id, name: name}})
    }

    const handleCancel = () => {
      visible.value = false;
    }
    const beforeRemove = (file) => {
      return new Promise((resolve, reject) => {
        Modal.confirm({
          title: '删除确认',
          content: `确认删除 ${file.name}`,
          onOk: () => {
            url.value = "";
            resolve(true)
          },
          onCancel: () => reject('cancel'),
        });
      });
    }
    const envSet = (stage) => {
      let epInfo = tData.value[stage - 1];
      router.push({
        name: "test",
        params: {
          stage:epInfo.id,
          cmd: epInfo.cmd,
          timeOut: epInfo.timeOut,
          imgId: epInfo.imgId
        }
      })
    }
    const rowSelection = reactive({
      type: 'checkbox',
      showCheckedAll: true,
      onlyCurrent: false,
    });


    const
        pagination = {pageSize: 10}
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
      beforeRemove,
      url,
      envSet,
      tDataLength,
      tData,
      handleQuesEdit
    }
  }
  ,
  data() {
    return {
      stage: 0,
      formData: '',
      ques: [],
      temp: {
        temp: "temp"
      }
    }
  },
  methods: {
    handleQuesSelect(ques, ep) {
      const formData = new FormData();
      const data = {
        id: ep,
        questionnaire: ques
      }
      formData.append("episode", new Blob([JSON.stringify(data)], {type: 'application/json'}))
      this.axios.patch("/api/episode/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(() => {
            this.getData()
          }
      )
    },
    typeChange(type, id) {
      const formData = new FormData();
      const data = {
        id: id,
        type: type
      }
      formData.append("episode", new Blob([JSON.stringify(data)], {type: 'application/json'}))
      this.axios.patch("/api/episode/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    },
    getQues() {
      this.axios.get("/api/ques/getList").then((res) => {
        this.ques = res.data.data;
      })
    },
    cancelDelete() {
      this.$message.info("您取消了删除");
    },
    handleClose() {
      this.url = "";
    },
    edit(stage, type) {
      // 问卷
      if (type === 1) {
        this.$router.push(
            {name: 'cmedit', params: {stage, type: "edit"}})
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
      this.$message.success(res.data.message)
      this.url = "";
      this.visible = false;
      await this.getData();
    },
    async getData() {
      const res = await this.axios.get("/api/episode/get");
      this.tData = res.data.data;
      this.tDataLength = this.tData.length;
    },
    customRequest(option) {
      const {onProgress, onError, onSuccess, fileItem} = option
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
            this.url = parse.data.url;
          }
      )

      const formData = new FormData();
      formData.append('file', fileItem.file);
      xhr.open('post', '/api/oss/uploadFile/markdown', true);
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
      this.$message.success(res.data.message)
      await this.getData()
    }
    ,
  }
  ,

  mounted() {
    this.getData();
    this.getQues();
  },
}
</script>

<style scoped>
.option {
  display: flex;
}

.ques_list_box {
  display: flex;
  flex-direction: column;
  text-align: center;
}
</style>