<template>
  <div class="imgCover">
    <img :src="imgSrc" alt="" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "imgCover",
  props: {
    msg: String,
  },
  data() {
    return {
      imgSrc:
        "https://img0.baidu.com/it/u=3360361350,3827825601&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281",
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.imgCover {
  img {
    width: 100%;
    border-radius: 20px;
  }
}
</style>
