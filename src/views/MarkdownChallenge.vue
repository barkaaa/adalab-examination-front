<template>
  <div class="box">
    <markdown-preview value="content" />
  </div>
</template>

<script>
import { MarkdownPreview } from 'vue-meditor'
export default {
  name: "MarkdownChallenge",
  components:{
    MarkdownPreview
  },
  data() {
    return {
      content: ""
    }
  },
  mounted() {

    this.content = " # adalab-examination-front\n" +
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
        "See [Configuration Reference](https://cli.vuejs.org/config/).\n" +
        " # adalab-examination-front\n" +
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
        "See [Configuration Reference](https://cli.vuejs.org/config/).\n"
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
