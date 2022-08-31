<template>
  <a-popover position="right">
    <a-button class="button" :style="{}">设置仓库</a-button>
    <template #content>
      <set-repo></set-repo>
    </template>
  </a-popover>
</template>

<script>
import SetRepo from "@/components/setRepo";

export default {
  name: "popOver",
  components: {SetRepo}
}
</script>

<style scoped>

</style>