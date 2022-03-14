<template>
  <div class="wrap">
    <navBar></navBar>
    <audio
      @canplay="getDuration"
      @timeupdate="updateTime"
      @ended="audioEnd"
      ref="audio"
      :src="articleDetail.playPath"
      autoplay
    ></audio>
    <div class="top">
      <img
        class="bg"
        :src="'https://imagev2.xmcdn.com/' + articleDetail.cover"
        alt=""
      />
      <div class="operate">
        <img :src="'https://imagev2.xmcdn.com/' + articleDetail.cover" alt="" />
        <h2 class="title">{{ articleDetail.title }}</h2>
        <div class="operateBtn">
          <svg
            class="icon"
            :class="{ gray: index == 0 }"
            aria-hidden="true"
            @click="switchAudio('prev')"
          >
            <use xlink:href="#icon-shangyishou"></use>
          </svg>
          <svg class="icon play" aria-hidden="true" @click="play">
            <use
              :xlink:href="playFlag ? '#icon-zanting' : '#icon-bofang'"
            ></use>
          </svg>
          <svg
            class="icon"
            :class="{ gray: index == audioList.length - 1 }"
            aria-hidden="true"
            @click="switchAudio('next')"
          >
            <use xlink:href="#icon-xiayishou"></use>
          </svg>
        </div>
        <div class="progress">
          <progressCom
            @change="changeProgress"
            :percentage="percentage"
          ></progressCom>
          <div class="timeText">
            <span>{{ currentTime }}</span>
            <span>{{ duration }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content" v-html="articleDetail.content"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, Ref, ref, inject } from "vue";
import { useRouter } from "vue-router";
import navBar from "@/components/navBar.vue";
import progressCom from "@/components/progressCom.vue";
import Api from "@/api/api";
export default defineComponent({
  components: {
    navBar,
    progressCom,
  },
  setup() {
    const router = useRouter();

    // let audioList: Array<object> = router.currentRoute.value.params.audioList;
    let index: Ref<number> = ref(
      Number(router.currentRoute.value.params.index)
    );
    let articleDetail = reactive({
      title: "",
      playPath: "",
      cover: "",
      content: "",
    });
    console.log(router.currentRoute);
    getDetail(router.currentRoute.value.params.id);
    function getDetail(id: string | string[]) {
      Api.getAudioDetail("/" + id)
        .then((res: any) => {
          articleDetail.title = res.data.trackDetailInfo.trackInfo.title;
          articleDetail.playPath = res.data.trackDetailInfo.trackInfo.playPath;
          articleDetail.cover = res.data.trackDetailInfo.trackInfo.cover;
          articleDetail.content = dealContent(res.data.trackRichInfo.richIntro);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function dealContent(content: string): string {
      content = content.replaceAll(/(<br>(\s)*)+/g, "<br>");
      content = content.replaceAll(/\d(<br>)/g, "");
      let contentArr = content.split("<br>");
      let newHtml = "";
      contentArr.forEach((item) => {
        if (item.length > 20) {
          newHtml += "<p>" + item + "</p>";
        } else {
          newHtml += "<h2>" + item + "</h2>";
        }
      });
      return newHtml;
    }
    const audioList = inject("audioList");
    return { index, articleDetail, audioList, getDetail };
  },
  data() {
    return {
      percentage: 0,
      duration: "00:00",
      currentTime: "00:00",
      playFlag: true,
    };
  },
  mounted() {
    console.log("sdfj");
    console.log(this.$refs.audio);
  },
  methods: {
    getDuration() {
      let audioRef: any = this.$refs.audio;
      console.log(audioRef.duration); //此时可以获取到duration
      let duration = audioRef.duration;
      let minutes: string = Math.floor(duration / 60) + "";
      let seconds: string = Math.floor(duration % 60) + "";
      minutes = minutes.length >= 2 ? minutes : "0" + minutes;
      seconds = seconds.length >= 2 ? seconds : "0" + seconds;
      this.duration = minutes + ":" + seconds;
    },
    updateTime(e: any) {
      let audioRef: any = this.$refs.audio;
      console.log(audioRef.duration); //此时可以获取到duration
      let currentTime = e.target.currentTime; //获取audio当前播放时间
      this.percentage = (currentTime / audioRef.duration) * 100;
      let minutes: string = Math.floor(currentTime / 60) + "";
      let seconds: string = Math.floor(currentTime % 60) + "";
      minutes = minutes.length >= 2 ? minutes : "0" + minutes;
      seconds = seconds.length >= 2 ? seconds : "0" + seconds;
      this.currentTime = minutes + ":" + seconds;
    },
    changeProgress(percentage: number) {
      console.log("possesValue.value", percentage);
      this.percentage = percentage;
      let audioRef: any = this.$refs.audio;
      console.log(audioRef.duration); //此时可以获取到duration
      let currentTime = (percentage * audioRef.duration) / 100; //获取进度条中audio对应的播放时间
      audioRef.currentTime = currentTime;

      let minutes: string = Math.floor(currentTime / 60) + "";
      let seconds: string = Math.floor(currentTime % 60) + "";
      minutes = minutes.length >= 2 ? minutes : "0" + minutes;
      seconds = seconds.length >= 2 ? seconds : "0" + seconds;
      this.currentTime = minutes + ":" + seconds;
    },
    play() {
      this.playFlag = !this.playFlag;
      let audioRef: any = this.$refs.audio;
      if (this.playFlag) {
        audioRef.play();
      } else {
        audioRef.pause();
      }
    },
    //切换音频
    switchAudio(type: string) {
      let audioList: any = this.audioList;
      console.log(this.index, audioList);
      if (type == "prev") {
        //上一首
        if (this.index == 0) return false;
        this.index--;
        this.playFlag = true;
        let id: string = audioList[this.index].id;
        this.getDetail(id);
      } else if (type == "next") {
        ///下一首
        if (this.index == audioList.length - 1) return false;
        this.index++;
        this.playFlag = true;
        let id: string = audioList[this.index].id;
        this.getDetail(id);
      }
    },
    //播放结束，自动切换下一首
    audioEnd() {
      let audioList: any = this.audioList;
      if (this.index == audioList.length - 1) return false;
      this.index++;
      this.playFlag = true;
      let id: string = audioList[this.index].id;
      this.getDetail(id);
    },
  },
});
</script>
<style lang="scss" scoped>
.top {
  position: relative;
}
.bg {
  width: 100%;
  filter: blur(20px);
}
.operate {
  position: absolute;
  top: 50px;
  left: 0;
  text-align: center;
  width: 100%;
  img {
    width: 150px;
    border: 5px solid #fff;
    border-radius: 20px;
  }
  .title {
    font-size: 18px;
    color: #333;
    font-family: "微软雅黑";
    margin: 10px 0;
  }
  .operateBtn {
    font-size: 30px;
    color: #0ae84e;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 20px 0;
    .play {
      font-size: 40px;
    }
    .gray {
      color: #aaa;
    }
  }
  .progress {
    padding: 0 20px;
    input {
      width: 100%;
    }
    .timeText {
      display: flex;
      justify-content: space-between;
      margin-top: 4px;
      color: #333;
    }
  }
}
.content {
  padding: 10px;
  ::v-deep h2 {
    font-size: 18px;
    text-align: center;
    color: #1cbf4e;
    margin: 14px 0;
  }
  ::v-deep p {
    line-height: 30px;
    font-size: 14px;
    text-indent: 30px;
  }
}
</style>
