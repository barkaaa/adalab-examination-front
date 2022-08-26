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
    submit() {
      let res = this.contentEditor.getValue();
      console.log(res)
    },
    navToSetting() {
      this.$router.push("/backpanel/two")
    },
    navToEdit() {
      this.$router.push("/backpanel/mdedit")
    }

  },
  async mounted() {
    // 根据文件名获取url
    const res = await this.$axios.get("/api/oss/getSingeNatureUrl", {
      params: {
        fileName: "md/"+this.$route.params.name,
        expSeconds: 1000
      }
    })
    let url = res.data;
    this.initialValue = (await this.$axios.get(url)).data
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
        "msg": "",
        "code": 0,
        "data": {
          "errFiles": ['filename', 'filename2'],
          "succMap": {
            "filename3": "filepath3",
            "filename3": "filepath3"
          }
        }
      },
      after: () => {
        this.contentEditor.setValue(this.initialValue)
      },
    })
  }
}
</script>

<style></style>
