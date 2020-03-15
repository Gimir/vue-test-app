<template>
  <div id="todosPage">
    <Row
      v-for="row of allRows"
      :key="row.id"
      :row="row"
      @drop="moveTodo([$event, row.id])"
      group-name="1"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Row from "../components/Row";
export default {
  name: "TodosPage",
  components: {
    Row
  },
  async mounted() {
    this.getToken();
  },
  computed: mapGetters(["allRows", "token"]),
  methods: mapActions(["getToken", "loadTodos", "moveTodo"]),
  watch: {
    token: function() {
      if (this.token) this.loadTodos();
    }
  }
};
</script>

<style>
#todosPage {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>