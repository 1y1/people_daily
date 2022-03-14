<template>
  <scrollMore @loadMore="loadMore">
    <div class="home">
      <imgCover></imgCover>
      <audio-list :audioList="audioList"></audio-list>
      <!-- <aplayer autoplay :music="audio[0]" :list="audio" :showlrc="true"></aplayer> -->
    </div>
  </scrollMore>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, inject } from "vue";
import scrollMore from "@/components/scrollMore.vue"; // @ is an alias to /src
import imgCover from "@/components/imgCover.vue"; // @ is an alias to /src
import audioList from "@/components/audioList.vue"; // @ is an alias to /src
import Api from "@/api/api";

export default defineComponent({
  name: "HomeView",
  components: {
    scrollMore,
    imgCover,
    audioList,
  },
  setup() {
    let audioList: Array<object> | undefined = inject("audioList");
    let page = 1;
    let isLoading = ref(true);
    function getAudioList() {
      let params = {
        albumId: 54492283,
        page,
        pageSize: 10,
        asc: true,
        countKeys: "play,comment",
        v: 1646360891448,
      };
      Api.getAudioList(params).then((res: any) => {
        console.log(res);
        page++;
        audioList?.push(...res.data.trackDetailInfos);
        if (page > Math.ceil(res.data.totalCount / res.data.pageSize)) {
          console.log("没有更多了");
          isLoading.value = false;
        }
      });
    }
    function loadMore() {
      if (isLoading.value) {
        getAudioList();
      }
    }
    onMounted(() => {
      getAudioList();
    });
    // console.log(audioList);

    return { audioList, loadMore };
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
.home {
  padding: 10px;
}
</style>
