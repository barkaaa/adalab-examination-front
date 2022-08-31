<template>

  <a-layout style="padding: 30px 24px;">
    <a-breadcrumb style="padding-bottom: 20px">
      <a-breadcrumb-item @click="navToSetting">关卡设置</a-breadcrumb-item>
      <a-breadcrumb-item @click="navToEdit">编辑关卡</a-breadcrumb-item>
    </a-breadcrumb>
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
      let res = await this.axios.put("/api/oss/saveMarkdown", {
        content
      })
      let markdown_url = res.data.url;

      let id = this.$route.params.stage;
      // 修改数据库记录
      await this.axios.patch("/api/episode/update", {
        id, markdown_url
      })

      this.$router.push("/backpanel/missionManagement")
    },
    navToSetting() {
      this.$router.push("/backpanel/missionManagement")
    },
    navToEdit() {
      this.$router.push("/backpanel/mdedit")
    }

  },
  async mounted() {
    // 根据题号获取url
    const res = await this.axios.get("/api/episode/getOne", {
      params: {
        id: this.$route.params.stage,
      }
    })
    let url = res.data.markdownUrl;
    console.log(url)

    this.initialValue = (await this.axios.get(url)).data;
    console.log(this.initialValue)
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
          console.log(succ)
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
