<template>
  <div class="box">
    <div class="top">
      <span class="username">George</span>
      <img src="../assets/user-avatar-full-fill.png" class="avatar" alt=""/>
    </div>
    <div class="bottom">
      <div class="countdown">23:59:50</div>
    </div>

  </div>
</template>

<script>
export default {
  name: "CountDown"
}
</script>

<style scoped lang="less">
.box {
  padding: 16px 22px 22px 13px;
  width: 249px;
  height: 112px;
  border-radius: 15px;
  border: 2px solid #000;

  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;

    .username {
      font-size: 18px;
    }
    .avatar{
      width: 32px;
    }
  }

  .bottom {
   display: flex;
    justify-content: center;
    .countdown {
      font-size: 36px;
      margin-bottom: 6px;
    }
  }

}

</style>