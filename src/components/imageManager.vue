<template>
  <div class="image-container">
    <h1>镜像列表</h1>
    <div class="image" v-for="image in images" :key="image.Id">
      <div class="tag" v-for="tag in image.RepoTags" :key="tag">
        {{ tag }} <button v-on:click="delImg(tag)">删除镜像</button>
      </div>
    </div>
    <button>添加镜像</button>
  </div>
</template>

<script>

export default {
  name: "imageManager",
  data() {
    return {
      images: {}
    }
  },

  methods: {
    delImg(id) {
      this.axios.delete("api/episode/images", {
        params: {
          id: id
        }
      }).then(() => this.getImg());
    },
    getImg() {
      this.axios.get("api/episode/images")
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