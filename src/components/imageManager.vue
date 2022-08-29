<template>
  <a-button @click="handleClick">Open Modal</a-button>
  <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel" :hide-cancel="true" :closable="false">
    <template #title>镜像列表</template>
    <a-space direction="vertical" size="large">
      <a-list>
        <div class="image-container">
          <div class="image" v-for="image in images" :key="image.Id">
            <div class="tag" v-for="tag in image.RepoTags" :key="tag">
              <a-list-item>
                {{ tag }}
                <button v-on:click="delImg(tag)">删除镜像</button>
              </a-list-item>
            </div>
          </div>
        </div>
      </a-list>
    </a-space>
    <up-load-docker-model></up-load-docker-model>
  </a-modal>
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

    return {
      visible,
      handleClick,
      handleOk,
      handleCancel
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