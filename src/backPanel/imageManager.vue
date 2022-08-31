<template>
  <a-space direction="vertical" size="large">
    <a-table :columns="columns" :data="tableData" :column-resizable="true" :pagination=false class="table">
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
      images: {}
    }
  },

  methods: {
    delImg(tag, version) {
      this.axios.delete("/api/episode/images", {
        params: {
          id: tag + ':' + version
        }
      }).then(() => this.getImg());
    },
    async getImg() {
      this.axios.get("/api/episode/images")
          .then(res => {
            this.tableData = res.data.data;
          });
    },
    info(message) {
      this.getImg();
      this.handleOk();
      Message.success(message);
    }
  },


  mounted() {
    this.getImg();
  }

}
</script>

<style scoped>


</style>