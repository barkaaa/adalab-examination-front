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
      111
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
  height: 1024px;
  background-color: #eee;

  aside {
    .timer {
      margin: 67px 31px 0 31px;
      border-bottom: 2px solid #000;
      padding: 33px;
    }

    .leaderboard {

    }
    .footer{

    }

  }

  main {
    background-color: #000;
  }
}

</style>