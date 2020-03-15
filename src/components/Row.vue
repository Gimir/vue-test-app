<template>
  <div class="row">
    <h2
      class="row-title"
      :style="{backgroundColor: getColor(row.title)}"
    >{{ row.title }} ({{row.todos.length}})</h2>
    <div class="row-list">
      <Container
        :should-accept-drop="shouldAcceptDrop"
        @drop="$emit('drop', $event)"
        :get-child-payload="getChildPayload"
      >
        <Todo v-for="todo of row.todos" :key="todo.id" :todo="todo" />
      </Container>
      <TodoForm :row_id="row.id" />
    </div>
  </div>
</template>

<script>
import { Container } from "vue-smooth-dnd";
import Todo from "./Todo";
import colors from "../constants/colors";
import TodoForm from "./TodoForm";

export default {
  props: ["row"],

  components: {
    Container,
    Todo,
    TodoForm
  },

  methods: {
    getChildPayload: function(index) {
      return this.row.todos[index];
    },
    shouldAcceptDrop: function() {
      return true;
    },
    getColor: function(color) {
      return colors[color];
    }
  }
};
</script>

<style scoped>
.row {
  width: 300px;
  min-height: 50px;
  margin: 20px;
  background-color: #303038;
}
.row > .row-title {
  font-size: 22px;
  text-transform: uppercase;
  color: #f9e9c8;
  width: 100%;
  height: 30px;
  padding: 0 10px;
  line-height: 30px;
  text-align: left;
}
.row > .row-list {
  width: 100%;
  padding: 5px 10px 0 10px;
}
</style>
