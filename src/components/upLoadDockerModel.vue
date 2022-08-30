<template>
  <a-form :model="form" :style="{width:'300px'}" auto-label-width
          @submit="submit($event)">
    <a-form-item>
      <a-input v-model="tag" type="text" placeholder="请输入镜像名称"/>
    </a-form-item>
    <a-form-item>
      <a-input type="file" @change="getFile($event)" placeholder="点击上传"/>
    </a-form-item>
    <a-form-item>
      <a-button html-type="submit">提交</a-button>
    </a-form-item>
  </a-form>
</template>

<script>

import {ref} from "vue";

export default {
  name: "upLoadDokcerModel",
  setup() {
    const defaultSelectedKey = ref([]);


    return {
      defaultSelectedKey,
    }
  },
  data() {
    return {
      form: {
        tag: '',
        file: ''
      }
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