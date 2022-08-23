<template>
  <div class="main-box">
    <aside>
      <div class="timer">
        <timer/>
      </div>
      <div class="leaderboard">
        111
      </div>
      <div class="footer"></div>
    </aside>
    <main>
      <router-view/>
    </main>
  </div>

</template>

<script>
import Timer from "@/components/Timer";

export default {
  name: "Challenge",
  components: {
    Timer
  }
}
</script>

<style scoped lang="less">
.main-box {
  display: flex;
  height: 800px;
  background-color: #eee;

  aside {
    .timer {
      margin: 60px 30px 0 30px;
      border-bottom: 2px solid #000;
      padding-bottom: 33px;
    }

    .leaderboard {

    }
    .footer{

    }

  }

  main {

  }
}

</style>