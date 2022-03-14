<template>
  <div>
    <ul class="audioList">
      <li
        v-for="(item, index) in audioList"
        :key="item.id"
        @click="to_detail(item, index)"
      >
        <img
          :src="'https://imagev2.xmcdn.com/' + item.trackInfo.cover"
          alt=""
        />
        <h2 class="title">{{ item.trackInfo.title }}</h2>
        <span class="createTime">{{ item.trackInfo.createdAt }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    audioList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  methods: {
    to_detail(item: { id: number }, index: number) {
      this.$router.push({
        name: "articleDetail",
        params: { id: item.id, index },
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.audioList {
  list-style: none;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    img {
      width: 50px;
      height: 50px;
      border-radius: 10px;
    }
    .title {
      font-size: 14px;
      font-weight: normal;
      flex: 1;
      padding: 0 6px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .createTime {
      color: #aaa;
    }
  }
}
</style>
