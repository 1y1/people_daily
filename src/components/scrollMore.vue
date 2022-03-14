<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      isLoad: true,
      msg: "正在加载",
    };
  },
  mounted() {
    //开启滚动事件
    window.addEventListener("scroll", this.onScroll);
  },
  unmounted() {
    //关闭滚动事件
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      //可滚动容器的高度
      let innerHeight = this.$el.clientHeight;
      //屏幕尺寸高度
      let outerHeight = document.documentElement.clientHeight;
      //可滚动容器超出当前窗口显示范围的高度
      let scrollTop = document.documentElement.scrollTop;
      //避免切换时读取到异常高度
      if (scrollTop == 0) {
        innerHeight = 10000;
      }
      //scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时，出现innerHeight < (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
      // console.log(innerHeight + " " + outerHeight + " " + scrollTop);
      if (this.isLoad) {
        // console.log(1);
        if (innerHeight - 10 <= outerHeight + scrollTop) {
          //此处添加自定义操作
          this.$emit("loadMore");
        }
      }
    },
  },
});
</script>

<style lang="scss" scoped></style>
