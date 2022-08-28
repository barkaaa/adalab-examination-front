<template>
  <div class="image-container">
    <h1>镜像列表</h1>
    <div class="image" v-for="image in images" :key="image.Id">
      <div class="tag" v-for="tag in image.RepoTags" :key="tag">
        {{ tag }}
      </div>
      <button v-on:click="delImg(image.Id)">删除镜像</button>
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
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 0;
}

.image {
  width: 350px;
  display: flex;
  flex-direction: row;
  height: 50px;
  justify-content: center;
  background: darkgray;
}

.image button {
  right: 0;
}

.tag {
  margin: 10px;
  width: 100px;
  height: 30px;
  overflow: hidden; /*溢出的部分隐藏*/
  white-space: nowrap; /*文本不换行*/
  text-overflow: ellipsis; /*ellipsis:文本溢出显示省略号（...）；clip：不显示省略标记（...），而是简单的裁切*/;
}
</style>