<template>
  <div class="box">
    <div class="top">
      <span class="username">{{ uName }}</span>
      <img :src="avatar" class="avatar" alt=""/>
      <pop-over></pop-over>
    </div>
    <div class="bottom">
      <div class="countdown">
        <a-col :flex="1">
          <a-countdown
              :value="new Date(cDate).getTime()+1000 * 60 * 60 * 24 * 7"
              :now="new Date(cDate).getTime()"
              format="D 天 H 时 m 分"
          />
        </a-col>
      </div>
    </div>

  </div>
</template>

<script>
import {ref} from "vue";
import {Message} from "@arco-design/web-vue";
import PopOver from "@/components/popOver";

export default {
  components: {PopOver},
  props: [
    'uName', 'avatar', 'cDate'
  ],
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
  mounted() {
  }
}
</script>

<style scoped lang="less">
.box {
  padding: 3% 4% 3% 4%;
  width: 92%;
  border-radius: 10px;
  border: 3px solid #000;
}

.top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10%;
  flex-grow: 1;
  overflow: auto;
}

.username {
  font-size: 120%;
}

.avatar {
  width: 10%
}

.repo {

}

.bottom {
  display: flex;
  justify-content: center;
}

.countdown {
  font-size: 10%;
  margin-bottom: 3%;
}


</style>
