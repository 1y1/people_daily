<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, reactive, provide } from "vue";
export default defineComponent({
  setup() {
    provide("audioList", reactive([]));
  },
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
