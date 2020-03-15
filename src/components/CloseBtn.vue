<template>
  <div :style="[styles]" @click="$emit('onClose')">
    <span></span>
  </div>
</template>


<script>
export default {
  props: ["styles"]
};
</script>


<style scoped>
div {
  position: relative;
  cursor: pointer;
}
span {
  display: block;
  width: 100%;
  height: 2px;
  position: absolute;
  left: 50%;
  margin-left: -50%;
  top: 50%;
  margin-top: -1px;
  transform: rotate(45deg);
  background-color: #515051;
}
span:after {
  content: "";
  width: 100%;
  height: 2px;
  position: absolute;
  left: 50%;
  margin-left: -50%;
  top: 50%;
  margin-top: -1px;
  transform: rotate(-90deg);
  background-color: #515051;
}
</style>
  