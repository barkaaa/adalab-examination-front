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
    />
    <br/>
    <br/>
    <input class="input"
        type="password"
        name="password"
        id="password"
        placeholder="P@$$W0RD"
        :style="input"
    />
    <br/>
    <br/>
    <input
        type="button"
        value="Done!"
        class="button"
        id="done"
        :style="inputStyle"
    />
    <br/>

  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  //Custom style for main and input for make the page responsive:
  props: {
    mainStyle: String,
    inputStyle: String,
  },
};
</script>

<style>
/* Import Poppins font: */
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
.main {
  background: rgba(255, 255, 255, 0.4);
  position: absolute;
  top: 25%;
  left: 30%;
  width: 40%;
  text-align: center;
  padding: 5px;
  border-radius: 3rem;
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
  border-radius: 3rem;
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
#building{
  background:url("../assets/img/loginbackground.jpg");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}
.button {
  cursor: pointer;
  user-select: none;
}

</style>