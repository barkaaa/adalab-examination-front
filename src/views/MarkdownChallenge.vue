<template>
  <div class="box">
    <div v-html="content"/>
  </div>
</template>

<script>

export default {
  name: "MarkdownChallenge",

  data() {
    return {
      content: " "
    }
  },
  mounted() {
    let md = " # adalab-examination-front\n" +
        "\n" +
        "## Project setup\n" +
        "```\n" +
        "yarn install\n" +
        "```\n" +
        "\n" +
        "### Compiles and hot-reloads for development\n" +
        "```\n" +
        "yarn serve\n" +
        "```\n" +
        "\n" +
        "### Compiles and minifies for production\n" +
        "```\n" +
        "yarn build\n" +
        "```\n" +
        "\n" +
        "### Lints and fixes files\n" +
        "```\n" +
        "yarn lint\n" +
        "```\n" +
        "\n" +
        "### Customize configuration\n" +
        "See [Configuration Reference](https://cli.vuejs.org/config/).\n";
    this.content = this.markded.parse(md);
  }
}
</script>

<style scoped lang="less">
.box {
  width: 80%;

  .content-box {
    margin-top: 4%;
  }
}

</style>
