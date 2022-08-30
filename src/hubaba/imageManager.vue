<template>
    <a-space direction="vertical" size="large">
      <a-table :columns="columns" :data="tableData" :column-resizable="true" :pagination=false class="table">
        <template #delete="{record}">
          <a-button type="primary" v-on:click="delImg(RepoTags)">
            <template #icon>
              <icon-delete/>
            </template>
          </a-button>
        </template>
<!--          镜像列表-->
<!--        </template>-->
<!--        <div class="image-container">-->
<!--          <div class="image" v-for="image in images" :key="image.Id">-->
<!--            <div class="tag" v-for="tag in image.RepoTags" :key="tag">-->
<!--              <a-list-item>-->
<!--                {{ tag }}-->
<!--                <a-button type="primary" v-on:click="delImg(tag)">-->
<!--                  <template #icon>-->
<!--                    <icon-delete />-->
<!--                  </template>-->
<!--                  &lt;!&ndash; Use the default slot to avoid extra spaces &ndash;&gt;-->
<!--                  <template #default>Delete image</template>-->
<!--                </a-button>-->
<!--              </a-list-item>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
      </a-table>
    </a-space>
  <a-button  @click="handleClick"> <icon-font type="icon-shangchuan" :size="16"/> 上传镜像</a-button>
  <a-modal  v-model:visible="visible" @ok="handleOk" :footer="false" :hide-cancel="true" :closable="false">
    <template #title>
      {{ '上传文档' }}
    </template>
    <up-load-docker-model></up-load-docker-model>
  </a-modal>
</template>

<script>
import upLoadDockerModel from "@/components/upLoadDockerModel";
import {ref} from "vue";
import {IconDelete} from "@arco-design/web-vue/es/icon";
import {Icon} from "@arco-design/web-vue";
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
    const columns=[
      {
        title: '镜像名称',
        dataIndex: 'RepoTags',
      },{
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
      columns,IconFont
    }
  },
  data() {
    return {
      images: {}
    }
  },

  methods: {
    delImg(id) {
      this.axios.delete("/api/episode/images", {
        params: {
          id: id
        }
      }).then(() => this.getImg());
    },
    getImg() {
      this.axios.get("/api/episode/images")
          .then(res => {
            this.tableData = res.data;
            console.log(this.tableData)
          });
    }

  },

  mounted() {
    this.getImg();
  }

}
</script>

<style scoped>



</style>