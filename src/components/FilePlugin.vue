<template>
  <!-- <div class="a-file">
        <div class="file-icon"></div>
        <p class="file-name">12313</p>
    </div> -->
  <!--  @click="getFileContent(fileName[2] + '/' + fileName[3] + '/' + fileName[0] + '/' + item)" -->
  <div
      class="a-file"
      v-for="item in fileName[1]"
      @click="doubleFuc(fileName[2] + '/' + fileName[3] + '/' + fileName[0] + '/' + item)"

  >
    <div class="file-icon">
      <img id="img" :src="require('../assets/img/file.png')" alt="屁都没有"/>
    </div>
    <div id="file-container">
      <p class="file-name">{{ item }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    fileName: Array,
    //[key,value,name,step]
    arr: Array
  },

  methods: {
    getFileContent(aString) {
      console.log("address:" + aString);
      this.axios
          .post(`/api/studentInfo/fileContent`, {src: aString})
          .then((res) => {
            this.fileContent = res.data.data;
            console.log("getdaole:" + this.fileContent);
          });
    },
    emitFileContent() {
      // this.$emit("content", this.fileContent);
    },
    doubleFuc(aString) {
      this.getFileContent(aString);
      this.emitFileContent();
    }
  },
  data() {
    return {
      // arr1: {},
      // arr2: {},
      fileContent: "",

    };
  },
};
</script>
<style scoped>
/* 文件 */
/* .file-icon{
padding: 0px;
margin: 0px;
width: 3.2em;

height: 5em;

border-top: 0.4em solid #333;

border-bottom:0.4em solid #333;

border-left:0.4em solid #333;

margin: 50px auto;

position: relative;

}

.file-icon:before{

border-right: 0.4em solid #333;

border-bottom: 0.4em solid #333;

width: 1em;

height: 4em;

position: absolute;

right: -1.3em;

bottom: -0.4em;

content: "";

}

.file-icon:after{

position: absolute;

top: -0.4em;

right: -1.3em;

content: "";

border-bottom: 1.4em solid #333;

    border-right: 1.4em solid transparent;

width: 0;

height: 0;

} */
/* 文件 */
.a-file {
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 500px;
  align-items: center;
}

.file-name {
  padding: 0px;
  margin: 0px;
  font-size: 4vh;
  height: 1rem;
}

#img {
  height: 5rem;
}
</style>
