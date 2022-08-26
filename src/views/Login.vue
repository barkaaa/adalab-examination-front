<template>
  <div id="building">

  </div>

  <div class="main" :style="mainStyle">
    <h1>Adalab Management</h1>
    <input
        class="input"
        type="text"
        name="username"
        id="username"
        placeholder="User Name"
        :style="input"
        v-model="username"
    />
    <br/>
    <br/>
    <input
        type="password"
        name="password"
        id="password"
        placeholder="PASSW0RD"
        :style="input"
        v-model="password"
    />
    <br/>
    <br/>
    <input
        type="button"
        value="Done!"
        class="button"
        id="done"
        :style="inputStyle"
        @click="login"
    />
    <br/>

  </div>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  //Custom style for main and input for make the page responsive:
  methods: {
    async login() {
      let res = await this.axios.post("/api/manage/login", {
        username: this.username, password: this.password
      }).then(() => {
        this.$router.push({path: "/userManagement"})
      })

    }
  },
  props: {
    mainStyle: String,
    inputStyle: String,
  },

  async created() {
    let res = await fetch("api/login").then((res) => {
      res.json()
    });
    console.log(res)
  }
}
</script>

<style>
/* Import Poppins font: */
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

.main {
  background: rgb(239, 237, 237);
  position: absolute;
  top: 20%;
  left: 30%;
  width: 40%;
  text-align: center;
  padding: 5px;
  border-radius: 1.5rem;
  box-shadow: 0px 0px 8px -5px #000000;
  padding-top: 3%;
  padding-bottom: 5%;
  font-family: "Poppins", sans-serif;
}

h1 {
  cursor: default;
  user-select: none;
}

input {
  border-radius: 1.5rem;
  border: none;
  padding: 10px;
  text-align: center;
  outline: none;
  margin: 10px;
  width: 30%;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
}

input:hover {
  box-shadow: 0 0 8px -5px #000000;
}

input:active {
  box-shadow: 0 0 8px -5px #000000;
}

#done {
  background: lightgreen;
}

#building {
  background: url("../assets/img/loginbackground.jpg");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}

.button {
  cursor: pointer;
  user-select: none;
}

</style>