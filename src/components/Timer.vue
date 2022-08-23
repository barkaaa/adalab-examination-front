<template>
  <div class="box">
    <div class="top">
      <span class="username">username</span>
      <img src="../assets/user-avatar-full-fill.png" class="avatar" alt=""/>
    </div>
    <div class="bottom">
      <div class="countdown">
        <a-col :flex="1">
          <a-countdown
              title="还剩："
              :value="now + 1000 * 60 * 60 * 24 * 4"
              :now="now"
              format="D 天 H 时 m 分"
          />
        </a-col>
      </div>
    </div>

  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "CountDown",
  setup() {
    const now = Date.now();
    const start = ref(false);

    const handleFinish = () => {
      Message.info('Finish');
    };

    return {
      now,
      start,
      handleFinish,
    };
  },
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

    .avatar {
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
