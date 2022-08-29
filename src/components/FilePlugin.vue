<template>
    <!-- <div class="a-file">
        <div class="file-icon"></div>
        <p class="file-name">12313</p>
    </div> -->
    
    <div class="a-file">
        <div class="file-icon" ><img :src="require('../assets/img/file.png')"  alt="屁都没有"/></div>
        <p class="file-name">{{fileName}}</p>
    </div>
</template>
<script>
    export default{
        props: {
            fileName: String,
        },
    }
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
    .a-file{
        display: flex;
        flex-direction: column;
        width: 500px;
        height: 500px;
        align-items: center;
    }
    .file-name{
        padding: 0px;
        margin: 0px;
        font-size:4vh;
    }
    
</style>