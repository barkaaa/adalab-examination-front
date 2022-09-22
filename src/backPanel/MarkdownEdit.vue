<template>

  <a-layout style="padding: 30px 24px;">

    <div id="vditor" ref="editorRef"/>
    <a-button @click="submit">提交</a-button>
  </a-layout>
</template>

<script>
import Vditor from 'vditor';
import 'vditor/dist/index.css';

export default {
  data() {
    return {
      initialValue: "hello world",
      contentEditor: '',
    }
  },
  methods: {
    async submit() {
      let content = this.contentEditor.getValue();
      // 保存文件到云端
      let res = await this.axios.put("/api/episode/saveMarkdown", {
        file: content,
        id: this.$route.params.stage
      })

      this.$message.success(res.data.message);
      this.$router.push("/backpanel/missionManagement")
    },

  },
  async mounted() {
    // 根据题号获取url
    const res = await this.axios.get("/api/episode/getOne", {
      params: {
        id: this.$route.params.stage,
      }
    })
    let url = res.data.data.markdownUrl;

    this.initialValue = (await this.axios.get(url)).data;

    this.contentEditor = new Vditor('vditor', {
      height: 600,
      toolbarConfig: {
        pin: true,
      },
      counter: {
        enable: true,
        type: "text"
      }
      ,
      cache: {
        enable: false,
      },
      upload: {

        url: '/api/oss/uploadFiles',   // 上传url
        linkToImgUrl: '/api/oss/uploadFiles',
        fieldName: 'file',
        filename(name) {
          return name.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '').replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '').replace('/\\s/g', '')
        },
        format(files, responseText) {
          let res = JSON.parse(responseText);
          let succ = {};
          succ[res.fileName] = res.url;
          return JSON.stringify({
            "msg": "",
            "code": 0,
            "data": {
              "errFiles": ['filename', 'filename2'],
              "succMap": succ
            }
          })
        },
      }, after: () => {
        this.contentEditor.setValue(this.initialValue)
      },
    })
  }
}

</script>

<style></style>
