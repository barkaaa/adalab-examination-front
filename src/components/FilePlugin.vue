<template>
  <!-- <div class="a-file">
   <div class="file-icon"></div>
   <p class="file-name">12313</p >
 </div> -->
  <!-- @click="getFileContent(fileName[2] + '/' + fileName[3] + '/' + fileName[0] + '/' + item)" -->
  <div
      class="a-file"
      v-for="item in fileName[1]"
      @click="getContentAndGiveFather(fileName[2] + '/' + fileName[3] + '/' + fileName[0] + '/' + item)"
      :key="item"
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
    arr: Array,

  },

  methods: {
    getFileContent(aString) {
      this.axios
          .post(`/api/studentInfo/fileContent`, {src: aString})
          .then((res) => {
            this.fileContent = res.data.data;
          });
    },


    giveFather() {
      this.$emit("giveFather", this.fileContent);
    },
    getContentAndGiveFather(aString) {
      this.getFileContent(aString);
      this.giveFather();
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
.a-file {
  display: flex;
  flex-direction: column;
  width: 100px;
  height:125px;
  align-items: center;
}

.file-name {
  padding: 0;
  margin: 0;
  font-size: 4vh;
  height: 1rem;
}

#img {
  height: 5rem;
}
</style>