<template>


<div id="open-modal" class="modal-window">
    <div>
 
      <div>
        <h1>确认删除？</h1>
        <a-button href="#" class="modal-close" @click="delete">确定</a-button>
        <a-button href ='#' class="modal-close">取消</a-button>
      </div>
    </div>
  </div>

    <a-table :data="data" style="margin-top: 30px">
    <template #columns>
      <a-table-column title="Tag" data-index="address"></a-table-column>
      <a-table-column title="Optional">
        <template #cell="{ record}">
          <a-button href="#open-modal">删除</a-button>
        </template>
      </a-table-column>
    </template>
  </a-table>
  <a-space direction="vertical" :style="{ width: '100%' }">
  <a-upload :custom-request="customRequest" />
    <a-upload action="/api/episode/docker" />
  </a-space>
</template>

<script>
import { Upload } from '@arco-design/web-vue';
import { reactive } from 'vue';
export default {
  name: "ImgSet",
  setup() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Salary',
        dataIndex: 'salary',
      },
      {
        title: 'Address',
        dataIndex: 'address',
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
     {
        title:'Optional',
        // dataIndex:''
        slotName: 'optional'
     }
    ];
    const data = reactive([{
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com'
    }, {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com'
    }, {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com'
    }, {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com'
    }, {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com'
    }]);



    const customRequest = (option) => {
      const {onProgress, onError, onSuccess, fileItem, name} = option
      const xhr = new XMLHttpRequest();
      if (xhr.upload) {
        xhr.upload.onprogress = function (event) {
          let percent;
          if (event.total > 0) {
            // 0 ~ 1
            percent = event.loaded / event.total;
          }
          onProgress(percent, event);
        };
      }
      xhr.onerror = function error(e) {
        onError(e);
      };
      xhr.onload = function onload() {
        if (xhr.status < 200 || xhr.status >= 300) {
          return onError(xhr.responseText);
        }
        onSuccess(xhr.response);
      };

      const formData = new FormData();
      formData.append('docker', fileItem.file);
      xhr.open('post', '/api/episode/docker', true);
      xhr.send(formData);

      return {
        abort() {
          xhr.abort()
        }
      }
    };




    return {
      columns,
      data,
        customRequest,
    }
  },
  methods:{
    delete(){
        document.getElementsByClassName('a-table-column').remove;
    },
    upload(){

    }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  width: 20vw;
  height: 20vh;
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
  /* position: absolute; */
  right: 0;
  text-align: center;
  top: 0;
  width: 70px;
  text-decoration: none;
}
.modal-close:hover {
  color: black;
}
/* 模态 */
</style>
