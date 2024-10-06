<template>
  <div id="app">
    <PostComponent/>
  </div>
</template>

<script>
import PostComponent from "./components/Post";
export default {
  name: "App",
  components: {
    PostComponent
  },
  data: () => ({
  }),
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50
}
</style>