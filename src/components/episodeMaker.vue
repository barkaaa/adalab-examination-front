<template>
  <div>
    <input type="text" v-model="id">
    <select v-model="testRequired">
      <option value="true">需要测试</option>
      <option value="false">不需要测试</option>
    </select>
    <input v-if="testRequired" type="text" v-model="timeOut">
    <select v-if="testRequired" v-model="img">
      <option v-for="image in images" :key="image.Id" :value="image.Id">
        {{ image.RepoTags }}}
      </option>
    </select>
    <input v-if="testRequired" type="text" v-model="cmd">
    <input v-if="testRequired" type="file" @change="getFile($event)" multiple="multiple">
    <button @click="submit($event)">提交</button>
  </div>
</template>

<script>
export default {
  name: "upLoadDokcerModel",
  data() {
    return {
      id: '',
      files: {},
      timeOut: '',
      cmd: '',
      testRequired: false,
      img: '',
      images: {}
    }
  },
  methods: {
    getFile(event) {
      this.files = event.target.files;
    },

    submit(event) {
      event.preventDefault();
      let formData = new FormData();
      let ep = {
        id: this.id,
        cmd: this.cmd,
        timeOut: this.timeOut,
        imgId: this.img,
        testRequired: this.testRequired
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


      this.axios.post('/api/episode/episode', formData, config).then(function (res) {
        console.log(res.data);
      })

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

</style>