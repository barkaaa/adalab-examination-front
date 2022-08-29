<template>
    <a-space direction="vertical" size="large">
      <a-table :columns="columns" :data="tableData" :column-resizable="true" :pagination="pagination" class="table">
        <template #header>
          镜像列表
        </template>
        <div class="image-container">
          <div class="image" v-for="image in images" :key="image.Id">
            <div class="tag" v-for="tag in image.RepoTags" :key="tag">
              <a-list-item>
                {{ tag }}
                <a-button type="primary" v-on:click="delImg(tag)">
                  <template #icon>
                    <icon-delete />
                  </template>
                  <!-- Use the default slot to avoid extra spaces -->
                  <template #default>Delete image</template>
                </a-button>
              </a-list-item>
            </div>
          </div>
        </div>
      </a-table>
    </a-space>
    <up-load-docker-model></up-load-docker-model>
</template>

<script>
import upLoadDockerModel from "@/components/upLoadDockerModel";
import {ref} from "vue";

export default {
  name: "imageManager",
  components: {
    upLoadDockerModel
  },


  setup() {
    const visible = ref(false);

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
        dataIndex: 'name',
      },{
        title: ' ',
        dataIndex: 'delet',
      }
    ]
    return {
      visible,
      handleClick,
      handleOk,
      handleCancel,
      columns
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
            console.log(res.data);
            this.images = res.data;
            console.log(this.images);
          });
    }

  },

  mounted() {
    this.getImg();
  }

}
</script>

<style scoped>

.image-container {

}

.image {

}

.image button {
  right: 0;
}

.tag {

}
</style>