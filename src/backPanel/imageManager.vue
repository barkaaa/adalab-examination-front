<template>
  <a-space direction="vertical" size="large">
    <a-table :columns="columns" :data="tableData" :column-resizable="true" :pagination=false class="table"
             :bordered=true>
      <template #delete="{record}">
        <a-button type="primary" v-on:click="delImg(record.imgName,record.imgVersion)">
          <template #icon>
            <icon-delete/>
          </template>
        </a-button>
      </template>
    </a-table>
  </a-space>
  <a-button @click="handleClick">
    <icon-font type="icon-shangchuan" :size="16"/>
    上传镜像
  </a-button>
  <a-modal v-model:visible="visible" @ok="handleOk" :footer="false" :hide-cancel="true" :closable="false">
    <template #title>
      {{ '上传文档' }}
    </template>
    <up-load-docker-model @submit="info"></up-load-docker-model>
  </a-modal>
  <a-space direction="vertical" size="large">
    <a-input-search id="pull"
                    v-model="pullImageName" :placeholder="inputText"
                    button-text="拉取镜像" @search="pullImage"
                    search-button :loading="loading"/>
  </a-space>

</template>

<script>
import upLoadDockerModel from "@/components/upLoadDockerModel";
import {ref} from "vue";
import {IconDelete} from "@arco-design/web-vue/es/icon";
import {Icon, Message} from "@arco-design/web-vue";

const IconFont = Icon.addFromIconFontCn({src: 'https://at.alicdn.com/t/c/font_3618179_rwptmmu55y9.js'});

export default {
  name: "imageManager",
  components: {
    upLoadDockerModel,
    IconDelete,
    IconFont
  },


  setup() {
    const visible = ref(false);
    const tableData = ref([])
    const handleClick = () => {
      visible.value = true;
    };
    const handleOk = () => {
      visible.value = false;
    };
    const handleCancel = () => {
      visible.value = false;
    }
    const columns = [
      {
        title: '镜像名称',
        dataIndex: 'imgName',
      },
      {
        title: '镜像版本',
        dataIndex: 'imgVersion',
      },
      {
        title: 'Delete',
        slotName: 'delete',
      }
    ]
    return {
      visible,
      tableData,
      handleClick,
      handleOk,
      handleCancel,
      columns, IconFont
    }
  },
  data() {
    return {
      images: {},
      pullImageName: '',
      inputText: '请输入要拉取的镜像名',
      loading: false
    }
  },

  methods: {
    delImg(tag, version) {
      this.axios.delete("/api/test/deleteImage", {
        params: {
          id: tag + ':' + version
        }
      }).then(() => this.getImg());
    },
    async getImg() {
      this.axios.get("/api/test/images")
          .then(res => {
            this.tableData = res.data.data;
          });
    },
    info(message) {
      this.getImg();
      this.handleOk();
      Message.success(message);
    },
    pullImage() {
      this.loading = true;
      this.axios.put("/api/test/pull", null, {
        params: {
          image: this.pullImageName
        }
      }).then(
          (res) => {
            this.getImg();
            this.loading = false;
            this.inputText = res.data.message;
          }
      ).catch(
          () => {
            this.loading = false;
            this.inputText = "拉取失败"
          }
      )
    }
  },


  mounted() {
    this.getImg();
  }

}
</script>

<style scoped>
/*::v-deep .arco-table-container {*/
/*  margin: 45% auto auto;*/
/*  width: 85%;*/
/*}*/

.arco-btn-size-medium {
  margin-left: auto;
  margin-right: auto;
  width: 85%;
}

#pull {
  margin-left: 7%;
  margin-right: auto;
  width: 85%;
}
</style>