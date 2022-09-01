<template>




    <div class="folderContainer">
        <div class="folderWrapper">
            <div class="folder">
                <div class="front"></div>
                <div class="center"></div>
                <div class="back"></div>
            </div>
            
            <div class="folderName">
                <span>{{folderName}}</span>
            </div>
       
            <div class="folderTime">
                <span>2021/07/17 10:49</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "fileCard",
        props:{
            folderName:String,
            // keyAndValue:Array
        }
    }
</script>

<style scoped>
    .folderContainer {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
    }

    .folder {
        width: 110px;
        height: 80px;
        perspective: 600px;
        transform-style: preserve-3d;
        cursor: pointer;
    }
    .folderWrapper{
        padding: 20px 20px 10px 20px;
        position: relative;
        transition: all .2s ease;
        border-radius: 6px;
        cursor: pointer;
    }
    .folderWrapper:hover{
        background-color: #ffffff;
    }

    .folder div.back, .folder div.front {
        position: absolute;
        top: 0;
        left: 0;
        width: 110px;
        height: 80px;
        background-color: #c5b7f1;
    }

    .folder div.center {
        width: 90px;
        height: 60px;
        background-color: #ffffff;
        position: absolute;
        top: 5px;
        left: 10px;
        z-index: 2;
        border-radius: 6px;
    }

    .folder .front {
        background-image: linear-gradient(to left, #24d5ff 0%, #1eb2ff 45%, #1890ff 100%);
        border-radius: 6px;
        z-index: 3;
        /* 若想把文件夹名字放到文件夹上面，则需要以下属性
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        color: rgba(0,0,0,1);
        font-weight: 500;
        line-height: 16px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;*/
        box-shadow: 0 1px rgba(255, 255, 255, 0.25) inset, 0 -2px 2px rgba(0, 0, 0, 0.1);
        transform: rotateX(-30deg);
        transform-origin: bottom;
        transition: all .2s ease;

    }

    .folder:hover .front {
        transform: rotateX(-40deg);
    }

    .folder .back:before {
        content: " ";
        position: absolute;
        left: 0;
        top: -10px;
        width: 40px;
        height: 10px;
        border-radius: 6px 6px 0 0;
        background-color: #1eb2ff;
    }

    .folder .back {
        background-image: linear-gradient(to top, #24d5ff 0%, #1eb2ff 45%, #1eb2ff 100%);
        border-radius: 0 6px 6px 6px;
        box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.15);
    }

    .folderName {
        margin-top: 10px;
        font-size: 14px;
        font-weight: 500;
        color: rgb(37, 48, 43);
    }

    .folderTime {
        width: 100%;
        text-align: center;
        font-size: 12px;
        line-height: 1.6;
        color: rgba(37, 48, 43, .36);
        max-width: 100%;
        overflow: hidden;
        white-space: nowrap;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
    }
    /* 模态 */
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
    /* 模态 */
</style>
