<template>
  <div class="navBar">
    <span class="arrowLeft" @click="goBack"></span>
    <h2>详情</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  methods: {
    goBack() {
      console.log("houtui");
      this.$router.go(-1);
    },
  },
});
</script>

<style lang="scss" scoped>
.navBar {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  .arrowLeft {
    width: 30px;
    height: 30px;
    position: relative;
  }
  .arrowLeft::before {
    content: " ";
    display: inline-block;
    height: 8px;
    width: 8px;
    border-width: 1px 1px 0 0;
    border-color: #2b2a2a;
    border-style: solid;
    -webkit-transform: matrix(-0.71, 0.71, 0.71, 0.71, 0, 0);
    transform: matrix(-0.71, 0.71, 0.71, 0.71, 0, 0);
    position: absolute;
    top: 10px;
    left: 4px;
  }
  h2 {
    flex: 1;
    text-align: center;
    color: #2b2a2a;
    font-weight: normal;
  }
}
</style>
