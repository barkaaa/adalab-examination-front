<template>
  <div>登录
    <a-button type="primary">Primary</a-button>
  </div>
</template>

<script>
export default {
  name: "Login",
  created() {
    this.axios.get("/login").then((data) => {
      console.log(data)
    })
  }
}
</script>

<style scoped>

</style>