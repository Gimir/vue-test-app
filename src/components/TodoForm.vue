<template>
  <div class="addFormContainer">
    <div v-show="!formActive" class="openFormBtn" @click="toggleForm">
      <div class="plusIcon"></div>
      <p>Add card</p>
    </div>
    <form v-show="formActive" @submit.prevent class="todoForm">
      <textarea v-model="inputValue" />
      <button :disabled="!isInputValid" @click.prevent="onAddClick">Add card</button>
      <CloseBtn :styles="btnStyles" @onClose="toggleForm" />
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import CloseBtn from "./CloseBtn";
export default {
  components: {
    CloseBtn
  },

  props: ["row_id"],

  data() {
    return {
      formActive: false,
      inputValue: "",
      isInputValid: false
    };
  },

  methods: {
    ...mapActions(["addTodo"]),

    onAddClick: function() {
      const payload = {
        row_id: this.row_id,
        text: this.inputValue
      };
      this.addTodo(payload);
      this.formActive = false;
      this.inputValue = "";
    },

    toggleForm: function() {
      this.formActive = !this.formActive;
    }
  },

  watch: {
    inputValue: function() {
      if (this.inputValue) this.isInputValid = true;
      else this.isInputValid = false;
    }
  },

  computed: {
    btnStyles() {
      return {
        width: "20px",
        height: "20px",
        position: "absolute",
        bottom: "15px",
        right: "20px"
      };
    }
  }
};
</script>

<style scoped>
.addFormContainer {
  width: 100%;
  position: relative;
}
form.todoForm {
  width: 100%;
  padding: 10px;
}
form.todoForm > textarea {
  width: 100%;
  height: 80px;
  background-color: #515051;
  color: #b9babd;
  padding: 5px;
  margin-bottom: 10px;
  border: none;
  resize: none;
  font-size: 16px;
}
form.todoForm > button {
  width: 60%;
  height: 30px;
  border: none;
  background-color: #626062;
  color: #b9babd;
  line-height: 25px;
  font-size: 15px;
  padding: 0 15px;
  cursor: pointer;
}
form.todoForm > button:disabled:hover {
  cursor: default;
}

.openFormBtn {
  height: 40px;
  width: 100%;
  position: relative;
  cursor: pointer;
  color: #b9babd;
}
.openFormBtn:hover {
  background-color: #1f1f23;
}
.openFormBtn > p {
  margin-left: 40px;
  line-height: 40px;
}
.openFormBtn > .plusIcon {
  width: 12px;
  height: 2px;
  background-color: #b9babd;
  position: absolute;
  left: 10px;
  top: 50%;
  margin-top: -1px;
}
.openFormBtn > .plusIcon:after {
  content: "";
  width: 100%;
  height: 2px;
  background-color: #b9babd;
  position: absolute;
  left: 0;
  top: 0;
  transform: rotate(90deg);
}
</style>