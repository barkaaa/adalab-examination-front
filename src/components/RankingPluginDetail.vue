<template>
  <!-- 手搓模态3 -->
  <!-- v-bind:fileName="[key,value,this.clickedName,this.clickedStep]" -->
  <div id="fileList" class="modal-window">
    <div class="modal-container">
      <a href="#" title="Close" class="modal-close">Close</a>

      <div class="modal-content">
        <div id="file-list-style">
          <FilePlugin
            v-for="(value, key) in file"
            v-bind:fileName="[key,value,this.clickedName,this.clickedStep]"
          ></FilePlugin>
        </div>
        <div>
          <p v-on:emitFileContent="receiveFileContent">{{this.fileContent}}</p>
        </div>
      </div>
    </div>
  </div>
  <!-- 手搓模态3 -->
  <!-- 手搓模态2 -->
  <div id="folderList" class="modal-window">
    <div>
      <a href="#" title="Close" class="modal-close">Close</a>
      <div>
        <a href="#fileList"
          ><FolderPlugin
            v-for="(value, key) in file"
            v-bind:folderName="key"
          ></FolderPlugin
        ></a>
      </div>
    </div>
  </div>
  <!-- 手搓模态2 -->
  <!-- 手搓模态1 -->
  <div id="open-modal" class="modal-window">
    <div>
      <a href="#" title="Close" class="modal-close">Close</a>
      <div>
        <VueTable></VueTable>
        <!-- 提交表 -->
        <a-table
          :columns="columns"
          :data="tableData"
          :column-resizable="true"
          :pagination="pagination"
          class="table"
        >
          <template #columns>
            <a-table-column title="测评结果">
              <template #cell="{ record }">
                <!-- :status="[record.curEpisode<9 ? 'success':'error']" -->
                <!-- <a-result status="success" style="width:1vw; " ></a-result> -->
                <div
                  :class="[
                    Number(record.curEpisode) > Number(record.episode)
                      ? 'success'
                      : 'fail',
                  ]"
                ></div>
                <!-- {{record.curEpisode+"/"+record.episode}} -->
                <!-- <a-button href="#open-modal">删除</a-button> -->
              </template>
            </a-table-column>
            <a-table-column
              title="commitID&Link"
              data-index="link"
            ></a-table-column>
            <a-table-column title="关卡" data-index="episode"></a-table-column>
            <a-table-column
              title="提交时间"
              data-index="commitTime"
            ></a-table-column>
            <a-table-column
              title="当前关卡"
              data-index="curEpisode"
            ></a-table-column>
          </template>
        </a-table>

        <!--  -->
        <!-- {{ arr1 }}
        {{ arr2 }} -->
      </div>
    </div>
  </div>
  <!-- 手搓模态1 -->
  <!-- 模态框组件 -->
  <a-modal
    v-model:visible="visible"
    @ok="handleOk"
    :hide-cancel="true"
    :closable="false"
  >
    <template #title>{{ tData.name + "的详细信息" }}</template>
    <a-descriptions
      style="margin-top: 20px"
      :data="list"
      :column="1"
      :align="align"
      :size="size"
    >
      <a-descriptions-item v-for="item of list" :label="item.label">
        <template #label>
          <icon-font
            :type="item.cName"
            :size="20"
            style="vertical-align: middle"
          >
          </icon-font>
          {{ item.label }}
        </template>
        <a-tag>{{ item.value }}</a-tag>
      </a-descriptions-item>
    </a-descriptions>
  </a-modal>

  <!-- 模态框组件 -->
  <a-modal
    v-model:visible="vis"
    @ok="hOk"
    :hide-cancel="true"
    :closable="false"
  >
    <template #title>{{ dList.name + "的问卷结果" }}</template>
    <a-list :size="sizes">
      <a-list-item v-for="item of dList.list">
        {{ item }}
      </a-list-item>
    </a-list>
  </a-modal>

  <!-- 模态框组件 -->
  <div id="open-modal2" class="modal-window">
    <div>
      <a href="#" title="Close" class="modal-close">Close</a>
      <div></div>
    </div>
  </div>

  <!-- <a-select :style="{width:'520px'}" placeholder="Please select ..." allow-search>
        <a-option>待开发</a-option>
        <a-option>待开发</a-option>
        <a-option>待开发</a-option>
        
      </a-select> -->

  <div class="list">
    <div id="bigContainer" v-for="(item, i) in users">
      <p class="studentName">{{ item.name }}</p>
      <!-- <a class="btn" href="#open-modal"><p>{{ item.name }}</p></a> -->
      <div
        class="dots"
        style="
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
        "
      >
        <div
          v-for="count in this.trueEpisodeNum"
          class="dot"
          :class="[count <= item.episode ? 'statusGreen' : 'statusNormal']"
          @click="getLocalPersonelInfo(item, count)"
        >
          <a href="#folderList"
            ><p class="number">{{ count }}</p></a
          >
        </div>
      </div>
      <div
        class="btn"
        style="align-items: center; display: flex; justify-content: center"
      >
        <a href="#open-modal" @click="getTableData(item)">
          <icon-history :style="[{ fontSize: '25px' }, { color: 'grey' }]" />
        </a>
        <icon-pen-fill
          @click="questionnaireDetails(item.id)"
          :style="[{ fontSize: '25px' }, { color: 'grey' }]"
        />
        <icon-user
          @click="handleClick(item.name)"
          :style="[{ fontSize: '25px' }, { color: 'grey' }]"
        />
        <a :href="'https://' + item.name + '.github.io'">
          <icon-desktop :style="[{ fontSize: '25px' }, { color: 'grey' }]" />
        </a>
      </div>
      <br />
    </div>
  </div>

  <ul class="pagination">
    <li><a href="#" @click="getPreviousPage">«上一页</a></li>
    <li><a href="#" @click="getNextPage">下一页»</a></li>
  </ul>
</template>

<script>
import VueTable from "./VueTable.vue";
import {
  IconDesktop,
  IconHistory,
  IconPenFill,
  IconUser,
} from "@arco-design/web-vue/es/icon";
import { getCurrentInstance, ref } from "vue";
import { Icon } from "@arco-design/web-vue";
import FilePlugin from "./FilePlugin.vue";
import FolderPlugin from "./FolderPlugin.vue";
const IconFont = Icon.addFromIconFontCn({
  src: "https://at.alicdn.com/t/c/font_3611034_pmqkuts7v7b.js",
});
export default {
  name: "RankingPluginDetail",
  props: {
    // users: Array,
    pageNum: Number,
    step: Number,
    fileSrc: Array,
  },
  data() {
    return {
      // arr1: {},
      // arr2: {},
      clickedName:"",
      clickedStep:"",
      fileContent:"正文",
      file: [],
      trueEpisodeNum: 0,
      page: 1,
      totalPage: 0,
      users: [],
      allUsrFile: [{}, {}],
      columns: [
        {
          title: "测评？果",
          slotName: "cell",
        },
        {
          title: "commitID&Link",
          dataIndex: "link",
        },
        {
          title: "关卡",
          dataIndex: "episode",
        },
        {
          title: "提交时间",
          dataIndex: "commitTime",
        },
        {
          title: "当前关卡",
          dataIndex: "curEpisode",
        },
      ],
      pagination: {
        pageSize: 4,
      },
      tableData: [12, 123123, 1231231],
      mydata: [],
    };
  },
  methods: {
    getData() {
      this.axios
        .post("/api/studentInfo/studentCode/FilesTree/DingZHneg", { step: 1 })
        .then((res) => {
          console.log(res.data.data);
          this.arr1 = res.data.data;
        });
    },
    getPersonelInfo(user, level) {
      const url = `/api/studentInfo/studentCode/FilesTree/${user.name}`;
      this.axios.post(url, { step: level }).then((res) => {
        console.log(res.data.data);
        this.arr2 = res.data.data;
      });
    },
    getLocalPersonelInfo(user, level) {
      if (this.allUsrFile[user.name] !== undefined) {
        if (this.allUsrFile[user.name]["step" + level] !== undefined) {
          this.file = this.allUsrFile[user.name]["step" + level];
          this.clickedName = user.name;
          console.log("click"+this.clickedName)
          this.clickedStep = "step" + level;
          console.log("imanoName:" + user.name + "imanoName:" + "step" + level);
        } else {
          this.file = undefined;
          this.clickedName = "";
          this.clickedStep = "";
        }
      } else {
        this.file = undefined;
        this.clickedName = "";
          this.clickedStep = "";
      }
    },
    onClickMenuItem(key) {
      this.$router.push(key);
    },
    getTableData(item) {
      const url = `/api/studentInfo/getSubmission/${item.name}`;
      this.axios.get(url).then((res) => {
        this.tableData = res.data.data;
        console.log(res.data.data);
      });
    },
    getPreviousPage() {
      if (this.page > 1) {
        this.page--;
        this.getPage();
      }
    },
    getNextPage() {
      if (this.page < this.totalPage) {
        this.page++;
        this.getPage();
      }
    },
    getTotalPage() {
      const url = `/api/studentInfo/getTotalPages/14`;
      this.axios.get(url).then((res) => {
        this.totalPage = res.data.data;
        console.log(res.data.data);
      });
    },
    getPage() {
      this.axios
        .get(`/api/studentInfo/getPagingRanking/${this.page}`)
        .then((res) => {
          this.users = res.data.data;
          console.log(this.users);
        });
    },
    getAll() {
      this.axios.get(`/api/studentInfo/studentCode/FilesTree`).then((res) => {
        console.log("获取到树状结构" + res.data.data);
        this.allUsrFile = res.data.data;
        console.log(
          "所有提交的文件：" + this.allUsrFile["佐々木玲奈"]["step1"]
        );
      });
    },
    getCounts() {
      this.axios.get("/api/episode/counts").then((res) => {
        this.trueEpisodeNum = res.data.data;
        console.log("实际关卡数：" + this.trueEpisodeNum);
      });
    },
    receiveFileContent(content){
      this.fileContent = content;
    }
  },
  created() {
    this.getTotalPage();
    this.getPage();
    this.getAll();
    this.getCounts();
  },

  setup() {
    let currentInstance = getCurrentInstance();
    const { axios } = currentInstance.appContext.config.globalProperties;
    let dList = ref([]);
    const vis = ref(false);
    const sizes = ref("large");
    const hOk = () => {
      vis.value = false;
    };
    const questionnaireDetails = (id) => {
      vis.value = true;
      console.log(id);
      axios.get("/api/reply/getReply/" + id).then((res) => {
        dList.value = res.data.data;
        console.log("++++++++++++++++++++++++++++++");
        console.log(dList);
        console.log("++++++++++++++++++++++++++++++");
        // list.map((item) => {
        //   item.value = tData.value[item.label];
        // })
      });
    };

    let tData = ref({});
    const visible = ref(false);
    const size = ref("large");

    const align = {
      value: "right",
    };
    const handleClick = (name) => {
      visible.value = true;
      axios.post("/api/studentInfo/getDetail", { name }).then((res) => {
        tData.value = res.data.data;
        list.map((item) => {
          item.value = tData.value[item.label];
        });
      });
    };
    const handleOk = () => {
      visible.value = false;
    };
    const list = [
      {
        label: "status",
        value: "",
        cName: "icon-sort",
      },
      {
        label: "Days needed",
        value: "",
        cName: "icon-arrows-alt",
      },
      {
        label: "Actual Days",
        value: "",
        cName: "icon-arrows-alt",
      },
      {
        label: "Date Created",
        value: "",
        cName: "icon-shijian",
      },
      {
        label: "Last Edited",
        value: "",
        cName: "icon-shijian",
      },
      {
        label: "Current Week",
        value: "",
        cName: "icon-accesskeys",
      },
      {
        label: "Type",
        value: "",
        cName: "icon-sort",
      },
    ];
    return {
      visible,
      handleClick,
      handleOk,
      tData,
      list,
      size,
      align,
      dList,
      vis,
      hOk,
      sizes,
      questionnaireDetails,
    };
  },

  components: {
    VueTable,
    IconUser,
    IconFont,
    FilePlugin,
    IconPenFill,
    IconHistory,
    IconDesktop,
    FolderPlugin,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
::v-deep
  .arco-modal
  .arco-modal-header
  .arco-modal-title
  .arco-modal-title-align-center {
  font-size: 22px !important;
}

::v-deep .arco-descriptions-item-label-block {
  font-size: 16px !important;
}

::v-deep .arco-tag-size-medium {
  font-size: 14px !important;
}

html {
  scrollbar-width: none;
}
a {
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

/* template{
  text-align: center;
} */

.list {
  overflow: scroll;
  overflow-x: hidden;
  /* width:50%;
  height:50%; */
  padding-left: 5vw;
  padding-right: 5vw;
  padding-top: 10vw;
  padding-bottom: 5vh;
}
.list::-webkit-scrollbar {
  display: none;
}

.list div {
  margin: 0px;
  padding: 0px;
  text-align: center;
}

/* a-progress{
  text-align: center;
  size: large;
  
} */

.modal-window {
  position: fixed;
  /* background-color: rgba(255, 255, 255, 0.25); */
  background-color: rgba(0, 0, 0, 0.25);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.modal-window:target {
  visibility: visible;
  opacity: 1;
  pointer-events: auto;
}
.modal-window > div {
  width: 80vw;
  height: 80vh;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  padding: 2em;
  background: #ffffff;
}
.modal-window header {
  font-weight: bold;
}
.modal-window h1 {
  font-size: 150%;
  margin: 0 0 15px;
}

.modal-close {
  color: #aaa;
  line-height: 50px;
  font-size: 80%;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  width: 70px;
  text-decoration: none;
}
.modal-close:hover {
  color: black;
}
a-steps {
  display: flex;
}
.a-step {
  background-color: black;
}

.dot {
  width: 30px;
  height: 30px;
  background-color: rgba(144, 144, 144, 0.1);
  top: 0;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

icon-history {
  size: 30px;
}
/* .dotContainer{
  display: flex;
  flex-direction: row;
} */
/* 状态 */
.statusGreen {
  background-color: rgba(4, 101, 17, 0.51);
}
#bigContainer {
  display: flex;
}
.dots {
  flex: 2;
  border-style: solid;
  border: #aaa;
}
.studentName {
  flex: 1;
}
.btn {
  flex: 1;
}
/*  */
.trigger-demo-nest {
  padding: 10px;
  width: 200px;
  background-color: var(--color-bg-popup);
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}

.trigger-demo-nest-popup-content {
  text-align: right;
}
.number {
  color: rgba(0, 0, 0, 0.5);
}
a-steps {
  width: 30px;
}
/* 页码 */
ul.pagination {
  display: inline-block;
  padding-left: 590px;
  /* padding: 0px; */
  margin: 0;
}

ul.pagination li {
  display: inline;
}

ul.pagination li a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color 0.3s;
  border: 1px solid #ddd;
  margin: 0 4px;
}

ul.pagination li a.active {
  background-color: #4caf50;
  color: white;
  border: 1px solid #4caf50;
}

ul.pagination li a:hover:not(.active) {
  background-color: #ddd;
}

/* 页码 */
a-result {
  width: 5px;
}
/*  */
.success {
  background-color: #4caf50;
  width: 10px;
  height: 10px;
}

.fail {
  background-color: red;
  width: 10px;
  height: 10px;
}

.success-text {
  display: inline;
}

.fail-text {
  display: none;
}
/*  */
#file-list-style {
  width: 50%;
  height: 100%;
  border: black solid 1px;
}
/* 模态 */
.modal-container {
  display: flex;
}
.modal-content{
  display: flex;
  flex-direction: row;
}

</style>
