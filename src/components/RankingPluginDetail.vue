<template>
  <!-- 模态框组件 -->
  <a-modal v-model:visible="visible" @ok="handleOk" :hide-cancel="true" :closable="false">
    <template #title>{{ tData.name + "的详细信息" }}</template>
    <a-descriptions style="margin-top: 20px" :data="list" :column="1" :align="align" :size="size">
      <a-descriptions-item v-for="item of list" :label="item.label">
        <template #label>
          <icon-font :type="item.cName" :size="20" style="vertical-align: middle">
          </icon-font>
          {{ item.label }}
        </template>
        <a-tag>{{ item.value }}</a-tag>
      </a-descriptions-item>
    </a-descriptions>
  </a-modal>


  <!-- 模态框组件 -->
  <a-modal v-model:visible="vis" @ok="hOk" :hide-cancel="true" :closable="false">
    <template #title>{{ curName + "的问卷结果" }}</template>
    <a-list :size="sizes">
      <a-table :columns="quesColumns" :data="stuList">
        <template #optional="{ record }">
          <a-button @click="handleDetailClick(curId,record.id)">Open Modal</a-button>
          <a-modal v-model:visible="detailVis" @ok="handleDetailOk" >

              <a-table :columns="replyColumns" :data="replyList"/>

          </a-modal>
        </template>
      </a-table>
    </a-list>
  </a-modal>


  <body>
  <a-menu mode="horizontal" v-model:selected-keys="selectedKeys" :default-selected-keys="['1']"
          :style="{ top: '0px' ,width:'100%',fontSize:'24px'}">
    <a-menu-item key="1" @click="handleWeek" :style="{height:'38px',marginRight:'50px',marginLeft:'50px'}">七日数据
    </a-menu-item>
    <a-menu-item key="2" @click="handlePass" :style="{height:'38px',marginRight:'50px',marginLeft:'50px'}">通关数据
    </a-menu-item>
    <a-menu-item key="3" @click="handleAll" :style="{height:'38px',marginRight:'50px',marginLeft:'50px'}">全部数据
    </a-menu-item>
  </a-menu>

  <div class="list">
    <div id="bigContainer" v-for="(item) in users" :key="item">
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
        <a-popover title="提交记录地址" trigger="click" v-for="n in trueEpisodeNum" :key="n">
          <a-button @click="clickStuEp(item,n)" shape="circle" :style="item.episode<n?'':
          'box-shadow: 0 0 15px 2px #18d047' ">
            {{ n }}
          </a-button>
          <template #content>
            <a :href="codeLink" v-if="codeLink"><p>点击跳转仓库</p></a>
            <p v-else>没有提交记录/非测试代码关卡</p>
          </template>
        </a-popover>


      </div>
      <div class="btn"
           style="align-items: center; display: flex; justify-content: center">
        <icon-pen-fill @click="questionnaireList(item.id,item.name)"
                       :style=" {fontSize:'25px' ,color: 'grey',marginRight:'10px'} "/>
        <icon-user @click="handleClick(item.name)" :style=" {fontSize:'25px' ,color: 'grey',marginRight:'10px'}"/>
        <a :href="'https://' + item.name + '.github.io'">
          <icon-desktop :style="[{ fontSize: '25px' }, { color: 'grey' }]"/>
        </a>
      </div>
      <br/>
    </div>
  </div>

  <ul class="pagination">
    <li><a href="#" @click="getPreviousPage" v-if="page>1">«上一页</a></li>
    <li><a href="#" @click="getNextPage" v-if="page<totalPage">下一页»</a></li>
  </ul>
  </body>

</template>

<script>
import {IconDesktop, IconPenFill, IconUser} from "@arco-design/web-vue/es/icon";
import {getCurrentInstance, ref} from "vue";
import {Icon} from '@arco-design/web-vue';
import BackTemplate from "@/backPanel/BackTemplate";


const IconFont = Icon.addFromIconFontCn({src: 'https://at.alicdn.com/t/c/font_3611034_pmqkuts7v7b.js'});
export default {
  name: "RankingPluginDetail",
  props: {
    // users: Array,
    pageNum: Number,
    step: Number,
  },
  data() {
    return {
      selectedKeys: [],
      trueEpisodeNum: 0,
      page: 1,
      totalPage: 0,
      users: [],
      codeLink: '',
      columns: [
        {
          title: '测评结果',
          slotName: 'cell'
        },
        {
          title: 'commitID&Link',
          dataIndex: 'link',
        },
        {
          title: '关卡',
          dataIndex: 'episode',
        },
        {
          title: '提交时间',
          dataIndex: 'commitTime',
        }, {
          title: '当前关卡',
          dataIndex: 'curEpisode',
        }
      ],
      quesColumns: [{
        title: '问卷',
        dataIndex: 'name',
      }, {
        title: 'Optional',
        slotName: 'optional'
      }],
      replyColumns: [
        {
          title:'问题',
          dataIndex: 'theme',
        },
        {
          title: '回答',
          dataIndex: 'reply',
        }],
      pagination: {
        pageSize: 8,
      },
      tableData: [12, 123123, 1231231],
      mydata: [],
    };
  },
  methods: {
    handleAll() {
      this.page = 1;
      this.getPage();
      this.getTotalPage();
    },
    async handleWeek() {
      this.page = 1;
      this.getWeekData();
      await this.getWeekPage();
    },
    async handlePass() {
      this.page = 1;
      this.getPassData();
      await this.getPassPage();
    },

    getWeekData() {
      this.axios.get(`/api/studentInfo/getWeekData/${this.page}`).then((res) => {
        this.users = res.data.data;
      })
    },

    getPassData() {
      this.axios.get(`/api/studentInfo/getPass`, {
        params: {
          page: this.page,
          episode: this.trueEpisodeNum,
          size: this.pagination.pageSize
        }
      }).then((res) => {
        this.users = res.data.data;
      })
    },

    async getWeekPage() {
      let res = await this.axios.get(`/api/studentInfo/getWeekPage/${this.pagination.pageSize}`);
      this.totalPage = res.data;
    },

    async getPassPage() {
      let res = await this.axios.get(`/api/studentInfo/getPassedPage`, {
        params: {
          page: this.pagination.pageSize,
          episode: this.trueEpisodeNum,
        }
      });
      this.totalPage = res.data;
    },

    getPreviousPage() {
      this.page--;
      if (this.selectedKeys[0] === '1') {
        this.getWeekData();
      } else if (this.selectedKeys[0] === '2') {
        this.getPassData();
      } else {
        this.getPage();
      }
    },

    getNextPage() {
      if (this.page < this.totalPage) {
        this.page++;
        if (this.selectedKeys[0] === '1') {
          this.getWeekData();
        } else if (this.selectedKeys[0] === '2') {
          this.getPassData();
        } else {
          this.getPage();
        }
      }
    },
    clickStuEp(stu, ep) {
      this.axios.get('/api/code/getRev', {
        params: {
          ep: ep,
          stu: stu.id
        }
      }).then(res => {
        if (res.data.data) {
          let url;
          if (stu.webPage.endsWith('/')) {
            url = stu.webPage.substr(0, stu.webPage.length)
          } else {
            url = stu.webPage
          }
          this.codeLink = url + '/tree/' + res.data.data;
          console.log(this.codeLink);
        } else {
          this.codeLink = ''
        }
      })
    },

    getTotalPage() {
      const url = `/api/studentInfo/getTotalPages/${this.pagination.pageSize}`
      this.axios
          .get(url)
          .then((res) => {
            this.totalPage = res.data.data;
          });
    },

    getPage() {
      this.axios.get(`/api/studentInfo/getPagingRanking`, {
        params: {
          size: this.pagination.pageSize,
          page: this.page
        }
      }).then(res => {
        this.users = res.data.data;
      });
    },

    getCounts() {
      this.axios.get('/api/episode/student/counts')
          .then(res => {
            this.trueEpisodeNum = res.data.data;
          });
    },

  },
  created() {
    this.getPage();
    this.getCounts();
  },

  setup() {
    let currentInstance = getCurrentInstance();
    const {axios} = currentInstance.appContext.config.globalProperties;
    let stuList = ref([]);
    let replyList = ref([]);
    const vis = ref(false);
    const detailVis = ref(false);
    const curName = ref('');
    const curId = ref('');
    const sizes = ref('large');
    const hOk = () => {
      vis.value = false;
    }
    const questionnaireList = (id, name) => {
      vis.value = true;
      curName.value = name;
      curId.value = id;
      axios.get(`/api/ques/getStuList/${id}`).then((res) => {
        stuList.value = res.data.data;
      });
    }


    let tData = ref({});
    const visible = ref(false);
    const size = ref('large');

    const align = {
      value: 'right'
    }

    const handleClick = (name) => {
      visible.value = true;
      axios.post("/api/studentInfo/getDetail", {name}).then((res) => {
        tData.value = res.data.data;
        list.map((item) => {
          item.value = tData.value[item.label];
        })
      });
    }

    const handleDetailClick = (stuId, episodeId) => {
      detailVis.value = true;
      axios.get(`/api/reply/getReply`, {
        params: {
          stu: stuId,
          ques: episodeId
        }
      }).then((res) => {
        replyList.value = res.data.data;
        console.log(replyList.value);
      })

    }

    const handleOk = () => {
      visible.value = false;
    }

    const handleDetailOk = () => {
      detailVis.value = false;
    }

    const list = [{
      label: 'status',
      value: "",
      cName: "icon-sort",
    }, {
      label: 'Days needed',
      value: '',
      cName: "icon-arrows-alt",
    }, {
      label: 'Actual Days',
      value: '',
      cName: "icon-arrows-alt",
    }, {
      label: 'Date Created',
      value: '',
      cName: "icon-shijian",
    }, {
      label: 'Last Edited',
      value: '',
      cName: "icon-shijian",
    }, {
      label: 'Current Week',
      value: '',
      cName: "icon-accesskeys",
    }, {
      label: 'Type',
      value: '',
      cName: "icon-sort",
    }];
    return {
      visible,
      handleClick,
      handleDetailClick,
      handleOk,
      handleDetailOk,
      tData,
      list,
      size,
      align,
      stuList,
      replyList,
      vis,
      hOk,
      sizes,
      questionnaireList,
      curName,
      detailVis,
      curId
    }
  },

  components: {
    BackTemplate,
    IconUser,
    IconFont,
    IconPenFill,
    IconDesktop
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
::v-deep .arco-modal .arco-modal-header .arco-modal-title .arco-modal-title-align-center {
  font-size: 22px !important;
}

::v-deep .arco-descriptions-item-label-block {
  font-size: 16px !important;
}

::v-deep .arco-tag-size-medium {
  font-size: 14px !important;
}


body {
  margin-top: -50px;
  display: flex;
  flex-direction: column;
  text-align: center;
}

a {
  text-decoration: none;
}

* {
  box-sizing: border-box;
}


.list {
  overflow: scroll;
  overflow-x: hidden;
  /* width:50%;
  height:50%; */
  padding: 10vw 5vw 5vh;
  margin-top: -15vh;
}

.list::-webkit-scrollbar {
  display: none;
}

.list div {
  margin: 0px;
  padding: 0px;
  text-align: center;
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

a-steps {
  display: flex;
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


#bigContainer {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}

.dots {
  flex: 2;
  border: solid #aaa;
}

.studentName {
  flex: 1;
}


.btn {
  flex: 1;
}

/*  */

.number {
  color: rgba(0, 0, 0, 0.5);
}

a-steps {
  width: 30px;
}

/* 页码 */
.pagination {
  margin: 0 auto;
}

.pagination li {
  display: inline;
}

.pagination li a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color .3s;
  border: 1px solid #ddd;
  margin: 0 4px;
}


/* 页码 */
a-result {
  width: 5px;

}

/*  */

/*  */

</style>
