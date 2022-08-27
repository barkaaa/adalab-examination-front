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
        <a-trigger trigger="click">
    <a-button>Click Me</a-button>
    <template #content>
      <div class="trigger-demo-nest">
        <a-empty />
        <a-trigger position="right">
          <a-button>Hover Me</a-button>
          <template #content>
            <div class="trigger-demo-nest">
              <a-empty />
              <a-trigger trigger="click" position="right">
                <a-button>Click Me</a-button>
                <template #content>
                  <div class="trigger-demo-nest">
                    <a-empty />
                    <a-trigger position="right">
                      <a-button>Hover Me</a-button>
                      <template #content>
                        <a-empty class="trigger-demo-nest" />
                      </template>
                    </a-trigger>
                  </div>
                </template>
              </a-trigger>
            </div>
          </template>
        </a-trigger>
      </div>
    </template>
  </a-trigger>
      <!--  -->
      {{arr1}}
      {{arr2}}
      </div>
    </div>
  </div>

  <div class="list">
    <div id="bigContainer" v-for="(item, i) in users">
      <p class="studentName" @click="getData()">{{ item.name }}</p>
      <!-- <a class="btn" href="#open-modal"><p>{{ item.name }}</p></a> -->
      <div class="dots"
        style="
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        "
      >
        <div
          v-for="count in 13"
          class="dot"
          :class="[count <= item.ranking ? 'statusGreen' : 'statusNormal']"
          @click="getPersonelInfo('DingZHneg',count)"
        >
          <p class="number">{{ count }}</p>
        </div>
      </div>
      <div class="btn">
        <a href="#open-modal" @click="getPersonelInfo('DingZHneg',count)"><icon-history :style="[{ fontSize: '25px' }, { color: 'grey' }]" /></a>
        <a href="#open-modal"><icon-user :style="[{ fontSize: '25px' }, { color: 'grey' }]" /></a>
        <a href="#open-modal"><icon-desktop :style="[{ fontSize: '25px' }, { color: 'grey' }]" /></a>
      </div>
      <br />
    </div>
  </div>
 
  <a-steps label-placement="vertical" :current="3" >
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
  </a-steps>

</template>

<script>
import VueTable from "./VueTable.vue";
export default {
    name: "RankingPluginDetail",
    props: {
        users: Array,
    },
     data() {
        return {
            arr1: {},
            arr2: {}
        };
    },
    methods: {
        getData() {
            this.axios.post("api/student/studentCode/FilesTree/DingZHneg", { step: 1 }).then((res) => {
                console.log(res.data);
                this.arr1 = res.data;
            });
        },
        getPersonelInfo(user, level) {
            this.axios.post("api/student/studentCode/FilesTree/DingZHneg", { step: 1 }).then((res) => {
                console.log(res.data);
                this.arr2 = res.data;
            });
        },
    },
   
    components: { VueTable }
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
#bigContainer{
  display: flex;
}
.dots{
  flex: 2;
  border-style: solid;
  border: #aaa;
}
.studentName{
  flex:1;
  
}
.btn{
  flex:1;
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
.number{
  color:rgba(0, 0, 0, 0.5);
}
a-steps{
  width: 30px;
}
</style>

