<template>
  <div id="app">

    <span>{{ name }}</span>
    <input v-model="name">
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "Test",
  setup() {
    const name = ref("111");
    return {name}
  }
}
</script>

<style scoped>

</style>