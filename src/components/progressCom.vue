<template>
  <div class="progressWrap" ref="progressWrap" @click.self="change($event)">
    <div
      class="posses"
      :style="{ width: percentage + '%' }"
      @click.self="change($event)"
    >
      <div class="point"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  props: {
    percentage: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    change(e: any) {
      console.log("出发了change");
      let progressWrap: any = this.$refs.progressWrap;
      console.log("width", progressWrap.clientWidth);
      console.log("e", e);
      let possesValue = (e.offsetX / progressWrap.clientWidth) * 100;
      this.$emit("change", possesValue);
    },
  },
});
</script>

<style lang="scss" scoped>
.progressWrap {
  position: relative;
  width: 100%;
  height: 10px;
  background: #fff;
  border-radius: 10px;
  .posses {
    position: absolute;
    height: 10px;
    border-radius: 10px;
    background: #0ae84e;
  }
  .point {
    width: 16px;
    height: 16px;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    right: -4px;
    top: -4px;
  }
}
</style>
