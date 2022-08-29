<template>
  <div class="divider-demo">
    <div>
      <a-divider orientation="center">设置超时时间</a-divider>
      <a-input :style="{width:'320px'}"  type="text" v-model="timeOut"/>
      <a-divider orientation="center">选择镜像</a-divider>
      <select  v-model="img">
        <option v-for="image in images" :key="image.Id" :value="image.Id">
          {{ image.RepoTags }}}
        </option>
      </select>
      <br/>
      <a-divider orientation="center">输入cmd命令</a-divider>
      <a-input :style="{width:'320px'}"  type="text" v-model="cmd"/>
      <br/>
      <a-divider orientation="center">选择文件</a-divider>
      <a-input :style="{width:'320px'}"  type="file" @change="getFile($event)" multiple="multiple"/>
      <p></p>
    </div>
    <a-divider :margin="10">
      <icon-star/>
    </a-divider>
    <p></p>
    <br/>
    <a-button type="primary" size="large" @click="submit($event)">提交</a-button>
  </div>


</template>

<script>
export default {
  name: "upLoadDokcerModel",
  data() {
    return {
      files: {},
      timeOut: '',
      cmd: '',
      img: '',
      images: {}
    }

  },
  methods: {
    getFile(event) {
      this.files = event.currentTarget.files;
    },

    submit(event) {
      event.preventDefault();
      let formData = new FormData();
      let ep = {
        id: this.id,
        cmd: this.cmd,
        timeOut: this.timeOut,
        imgId: this.img,
        testRequired: this.setBoolean(this.testRequired),
      };
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      formData.append("episode", new Blob([JSON.stringify(ep)], {type: 'application/json'}));
      Array.prototype.forEach.call(this.files, function (file) {
        formData.append("test", file)
      });


      this.axios.post('/api/episode/update', formData, config).then(function (res) {
        console.log(res.data);
      })

    },
    getImg() {
      this.axios.get("/api/episode/images")
          .then(res => {
            console.log(res.data);
            this.images = res.data;
            console.log(this.images);
          });
    },

    setBoolean(b) {
      return !!b;
    }
  },

  mounted() {
    this.getImg();
  }
}
</script>

<style scoped>

.divider-demo {
  Text-align: center;
  background-color: white;
  box-sizing: border-box;
  padding: 12px;
  border: 30px solid rgb(var(--gray-2));
}
</style>
