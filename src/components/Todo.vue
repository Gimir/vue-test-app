<template>
  <Draggable>
    <div class="todo">
      <p>{{todo.body}}</p>
      <CloseBtn :styles="btnStyles" @onClose="removeTodo([todo.row_id, todo.id])" />
    </div>
  </Draggable>
</template>

<script>
import { Draggable } from "vue-smooth-dnd";
import { mapActions } from "vuex";
import CloseBtn from "./CloseBtn";
export default {
  components: {
    Draggable,
    CloseBtn
  },
  props: ["todo"],
  methods: mapActions(["removeTodo"]),
  computed: {
    btnStyles() {
      return {
        width: "15px",
        height: "15px",
        position: "absolute",
        right: "10px",
        top: "10px"
      };
    }
  }
};
</script>

<style scoped>
.todo {
  width: 100%;
  min-height: 80px;
  margin: 5px 0;
  padding: 10px 5px;
  background-color: #1f1f23;
  color: #a3a9a9;
  position: relative;
  font-size: 16px;
}
</style>