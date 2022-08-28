<template>
  <div class="succBox">
    <img src="../assets/img/success.png">
    <div class="text">You have passed all challenges. <strong>Congratulations!</strong> </div>
    <a class="more" href="https://pdai.tech/">Go Ahead</a>
  </div>
</template>

<script>
export default {
  name: "Success"
}
</script>

<style scoped lang="less">
.succBox {
  display: flex;
  flex-direction: column;
  align-items:  center;
  img{
    width: 40%;
  }
  .text{
    font-size: 23px;
  }

  .more{
    text-decoration: none;
    margin-top: 30px;
    padding: 15px 30px;
    border-radius: 6px;
    color: #fff;
    background-color: #0b66ff;
  }
}
</style>