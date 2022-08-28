<template>
  <div>
    <input type="text" v-model="id">
    <input type="text" v-model="files">
    <input type="text" v-model="timeOut">
    <input type="text" v-model="img">
    <input type="text" v-model="cmd">
    <input type="text" v-model="testRequired">
    <input type="file" @change="getFile($event)">
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
      testRequired: '',
      img: '',
      images: {}
    }
  },
  methods: {
    getFile(event) {
      this.file = event.target.files[0];
    },

    submit(event) {
      event.preventDefault();
      let formData = new FormData();

      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      this.axios.post('/api/episode/docker', formData, config).then(function (res) {
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