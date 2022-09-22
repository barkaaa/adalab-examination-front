<template>
  <div class="divider-demo">
    <div>
      <a-divider orientation="center">设置超时时间</a-divider>
      <a-input :style="{width:'320px'}" type="text" v-model="timeOut"/>
      <a-divider orientation="center">选择镜像</a-divider>
      <select v-model="img">
        <option v-for="image in images" :key="image.imgName" :value="image.imgName + ':' + image.imgVersion">
          {{ image.imgName + ":" + image.imgVersion }}
        </option>
      </select>
      <br/>
      <a-divider orientation="center">输入cmd命令</a-divider>
      <a-input :style="{width:'320px'}" type="text" v-model="cmd"/>
      <br/>
      <a-divider orientation="center">选择文件</a-divider>
      <input :style="{width:'320px'}" type="file" @change="getFile($event)" multiple="multiple"/>
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
import {Message} from '@arco-design/web-vue';

export default {
  name: "upLoadDokcerModel",
  data() {
    return {
      files: {},
      timeOut: null,
      cmd: null,
      img: null,
      images: {}
    }

  },
  methods: {

    getFile(event) {
      this.files = event.currentTarget.files;
    },

    submit(event) {
      event.preventDefault();
      let that = this;
      let formData = new FormData();
      let ep = {
        id: this.$route.params.stage,
        cmd: this.cmd,
        timeOut: this.timeOut,
        imgId: this.img,
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


      this.axios.patch('/api/episode/update', formData, config).then((res) => {
        if (res.data.status === 200) {
          Message.success('上传成功!');
          setTimeout(function (path) {
            that.$router.push(path);
          }, 1000, "missionManagement");
        }
      })


    },
    getImg() {
      this.axios.get("/api/test/images")
          .then(res => {
            this.images = res.data.data;
          });
    },
    getConfig() {
      this.cmd = this.$route.params.cmd;
      this.timeOut = this.$route.params.timeOut;
      this.img = this.$route.params.imgId;
    }
  },

  mounted() {
    this.getImg();
    this.getConfig();
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
