<template>
  <a-form :model="form" :style="{width:'300px'}" auto-label-width
          @submit="submit()">
    <a-form-item>
      <a-input v-model="form.tag" type="text" placeholder="请输入镜像名称"/>
    </a-form-item>
    <a-form-item>
      <input type="file" @change="getFile($event)" placeholder="点击上传"/>
    </a-form-item>
    <a-form-item>
      <a-button html-type="submit">提交</a-button>
    </a-form-item>
  </a-form>
</template>

<script>

import {ref} from "vue";
import {Message} from '@arco-design/web-vue';

export default {
  name: "upLoadDokcerModel",
  emits: ['submit'],
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
      this.form.file = event.target.files[0];
    },
    submit() {
      let that = this;
      let formData = new FormData();
      formData.append('tag', this.form.tag);
      formData.append('file', this.form.file);
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.axios.post('/api/test/createimage', formData, config).then(function (res) {
        if (res.data.status === 200) {
          that.$emit('submit', '上传成功');
        } else {
          Message.error(res.data.message);
        }
      })
    }
  },
}
</script>

<style scoped>
input {
  width: 200px;
}
</style>