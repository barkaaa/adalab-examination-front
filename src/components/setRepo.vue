<template>
  <a-space direction="vertical" size="large">
    <a-input-search :style="{width:'320px'}" v-model="url" button-text="添加" search-button @search="setRepo" :loading="loading" @focus="clear"/>
  </a-space>
</template>

<script>
export default {
  name: "setRepo",
  data() {
    return {
      url: '',
      loading: false,
      inputText: ""
    }
  },
  methods: {
    setRepo() {
      this.axios.patch("/api/studentInfo/student/update", {
        webPage: this.url,
      }).then((res) => {
        this.loading = false;
        if (res.data.status === 200) {
          this.url = "更新成功";
        } else {
          this.url = "数据储存出错";
        }
      }).catch(() => {
        this.loading = false;
        this.url = "数据储存出错";
      });
      this.loading = true;
    },

    getUrl() {
      this.axios.get("/api/studentInfo/student/url").then(
          (res) => {
            if (res.data.data) {
              this.url = res.data.data;
            } else {
              this.url = "请输入URL";
            }
          }
      ).catch(() => this.url = "数据获取出错")
    },

    clear(){
      this.url="";
    }
  },
  mounted() {
    this.getUrl();
  }
}
</script>

<style scoped>
::v-deep .arco-btn-primary, .arco-btn-primary[type='button'], .arco-btn-primary[type='submit'] {
  background: black !important;
}

</style>