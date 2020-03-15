<template>
  <div id="app">
    <TodosPage />
  </div>
</template>

<script>
import TodosPage from "./pages/TodosPage";
export default {
  name: "App",
  components: {
    TodosPage
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 60px;
  width: 100%;
  min-height: 100vh;
  background-color: #383a42;
}
</style>
