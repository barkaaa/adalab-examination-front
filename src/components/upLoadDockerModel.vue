<template>
  <input type="text" v-model="tag">
  <input type="file" @change="getFile($event)">
  <button @click="submit($event)">提交</button>
</template>

<script>
export default {
  name: "upLoadDokcerModel",
  data() {
    return {
      tag: '',
      file: ''
    }
  },
  methods: {
    getFile(event) {
      this.file = event.target.files[0];
    },

    submit(event) {
      event.preventDefault();
      let formData = new FormData();
      formData.append('tag', this.tag);
      formData.append('docker', this.file);

      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      this.axios.post('/api/episode/docker', formData, config).then(function (res) {
        console.log(res.data);
      })

    }

  },
}
</script>

<style scoped>

</style>