<template>
  <!-- <a-steps :current="2" line-less>
      <a-step></a-step>
      <a-step></a-step>
      <a-step></a-step>
      <a-step></a-step>
      <a-step></a-step>
      <a-step></a-step>
      <a-step></a-step>
      <a-step></a-step>
      <a-step></a-step>
      <a-step></a-step>
      <a-step></a-step>
      <a-step></a-step>
      <a-step></a-step>
      <a-step></a-step>

    </a-steps> -->

  <!-- item.clear -->
  <div id="open-modal" class="modal-window">
    <div>
      <a href="#" title="Close" class="modal-close">Close</a>
      <div>
        
        <VueTable></VueTable>
        <!--  -->
        <a-table :columns="columns" :data="tableData" :column-resizable="true" :pagination="pagination" class="table">
          <template #columns>
            <a-table-column title="测评结果">
              <template #cell="{ record }">
                <!-- :status="[record.curEpisode<9 ? 'success':'error']" -->
                <a-result status="success" style="width:1vw; " ></a-result>
                <!-- <a-button href="#open-modal">删除</a-button> -->
              </template>
            </a-table-column>
            <a-table-column title="commitID&Link" data-index="link"></a-table-column>
            <a-table-column title="关卡" data-index="episode"></a-table-column>
            <a-table-column title="提交时间" data-index="commitTime"></a-table-column>
            <a-table-column title="当前关卡" data-index="curEpisode"></a-table-column>
          </template>
        </a-table>
       
        <!--  -->
        <!-- {{ arr1 }}
        {{ arr2 }} -->
      </div>
    </div>
  </div>

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
  


  <div id="open-modal2" class="modal-window">
    <div>
      <a href="#" title="Close" class="modal-close">Close</a>
      <div>
        <FilePlugin></FilePlugin>
      </div>
    </div>
  </div>







<!-- <a-select :style="{width:'520px'}" placeholder="Please select ..." allow-search>
      <a-option>待开发</a-option>
      <a-option>待开发</a-option>
      <a-option>待开发</a-option>
      不开发了   开尼玛
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
          v-for="count in 13"
          class="dot"
          :class="[count < item.episode ? 'statusGreen' : 'statusNormal']"
          @click="getPersonelInfo(item, count)"
        >
          <p class="number">{{ count }}</p>
        </div>
      </div>
      <div
        class="btn"
        style="align-items: center; display: flex; justify-content: center"
      >
        <a href="#open-modal" @click="getTableData(item)"
          ><icon-history :style="[{ fontSize: '25px' }, { color: 'grey' }]"
        /></a>
        
          <icon-user @click="handleClick(item.name)" :style="[{ fontSize: '25px' }, { color: 'grey' }]"
        />
        <a :href="'https://' + item.name + '.github.io'"
          ><icon-desktop :style="[{ fontSize: '25px' }, { color: 'grey' }]"
        /></a>
      </div>
      <br />
    </div>
  </div>

  <!-- <a-steps label-placement="vertical" :current="3">
    <a-step></a-step>
    <a-step></a-step>
    <a-step></a-step>
    <a-step></a-step>
    <a-step></a-step>
    <a-step></a-step>
    <a-step></a-step>
    <a-step></a-step>
    <a-step></a-step>
    <a-step></a-step>
    <a-step></a-step>
    <a-step></a-step>
    <a-step></a-step>
    <a-step></a-step>
    <a-step></a-step>
  </a-steps> -->
  <ul class="pagination" >
  <li><a href="#" @click="getPreviousPage">«上一页</a></li>
  <li><a href="#" @click="getNextPage">下一页»</a></li>
  </ul>

</template>

<script>
import VueTable from "./VueTable.vue";


import {IconBarChart, IconPen, IconRobot, IconUser} from "@arco-design/web-vue/es/icon";
import {getCurrentInstance, ref} from "vue";
import {Icon} from '@arco-design/web-vue';
import FilePlugin from "./FilePlugin.vue";
const IconFont = Icon.addFromIconFontCn({src: 'https://at.alicdn.com/t/c/font_3611034_pmqkuts7v7b.js'});
export default {
  name: "RankingPluginDetail",
  props: {
    // users: Array,
    pageNum: Number,
    step:Number,
    fileSrc:Array,
    allUsrFile:Array,

  },
  data() {
    return {
      // arr1: {},
      // arr2: {},
      page:0,
      totalPage:0,
      users:[],
      columns:[
        {
          title: '测评？果',
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
      },{
        title: '当前关卡',
        dataIndex: 'curEpisode',
      }
      ],
      pagination: {
        pageSize: 4,
      },
      tableData: [12,123123,1231231],
      mydata:[],
      
    };
  },
  methods: {
    getData() {
      this.axios
        .post("/api/studentInfo/studentCode/FilesTree/DingZHneg", { step: 1 })
        .then((res) => {
          console.log(res.data);
          this.arr1 = res.data;
        });
    },
    getPersonelInfo(user, level) {
      const url  = `/api/studentInfo/studentCode/FilesTree/${user.name}`
      this.axios
        .post(url, { step: level })
        .then((res) => {
          console.log(res.data);
          this.arr2 = res.data;
        });
    },
    onClickMenuItem(key) {
      this.$router.push(key);
    },
    getTableData(item){
      const url =`/api/studentInfo/getSubmission/${item.name}`
      this.axios
      .get(url)
      .then((res) => {
        this.tableData = res.data;
        console.log(res.data);
      });
    },
    getPreviousPage(){
      if(this.page>1){
        this.page--;
        this.getPage();
      }
    },
    getNextPage(){
      if(this.page<this.totalPage){
        this.page++;
        this.getPage();
      }
    },
    getTotalPage(){
      const url =`/api/studentInfo/getTotalPages/14`
      this.axios
      .get(url)
      .then((res) => {
        this.totalPage = res.data;
        console.log(res.data);
      });
    },
    getPage(){
      this.axios.get(`/api/studentInfo/getPagingRanking/${this.page}`)
      .then(res=>{
        this.users = res.data;
        //console.log(res.data[0].id);
      });
    }
  },
  // created() {
  //   fetch("/api/studentInfo/getRanking")
  //       .then((res) => res.json())
  //       .then((response) => {
  //         this.tableData.link = response.name;
  //       });
  // },
  mounted(){
    this.getTotalPage();
    this.getPage();
    

  },
  // setup() {
  //   const columns = [
  //     {
  //       title: 'commitID&Link',
  //       dataIndex: 'link',
  //     },
  //     {
  //       title: '关卡',
  //       dataIndex: 'episode',
  //     },
  //     {
  //       title: '提交时间',
  //       dataIndex: 'commitTime',
  //     }
  //   ];
  //   const data = reactive([{
  //     key: '1',
  //     result: 11,
  //     link:12,
  //     episode:12,
  //     commitTime:12
  //   }, {
  //     key: '2',
  //     result: 11,
  //     link:12,
  //     episode:12,
  //     commitTime:12

  //   }, {
  //     key: '3',
  //     result: 11,
  //     link:12,
  //     episode:12,
  //     commitTime:12
  //   }, {
  //     key: '4',
  //     result: 11,
  //     link:12,
  //     episode:12,
  //     commitTime:12
  //   }]);
  //   return {
  //     columns,
  //     data,
  //   }
  // },
  setup() {
    let tData = ref({});
    const visible = ref(false);
    const size = ref('large');
    let currentInstance = getCurrentInstance();
    const {axios} = currentInstance.appContext.config.globalProperties
    const align = {
      value: 'right'
    }
    const handleClick =(name) => {
      visible.value = true;
      axios.post("/api/studentInfo/getDetail", {name}).then((res)=> {
        tData.value = res.data;
        list.map((item) => {
          item.value = tData.value[item.label];
        })
      });
    }
    const handleOk = () => {
      visible.value = false;
    }
    const list = [{
      label: 'name',
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
      handleOk,
      tData,
      list,
      size,
      align
    }
  },
  // created() {
  //   fetch("/api/studentInfo/getRanking")
  //       .then((res) => res.json())
  //       .then((response) => {
  //         this.tableData = response;
  //       });
  // },


  components: {
    VueTable,
    IconBarChart,
    IconPen,
    IconUser,
    IconRobot,
    IconFont,
    FilePlugin
},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
html {
  scrollbar-width: none;
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
  background-color: pink;
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
    padding-left: 430px;
    /* padding: 0px; */
    margin: 0;
}

ul.pagination li {display: inline;}

ul.pagination li a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    transition: background-color .3s;
    border: 1px solid #ddd;
    margin: 0 4px;
}

ul.pagination li a.active {
    background-color: #4CAF50;
    color: white;
    border: 1px solid #4CAF50;
}


ul.pagination li a:hover:not(.active) {background-color: #ddd;}
/* 页码 */
a-result{
  width:5px;
}
</style>
