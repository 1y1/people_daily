const url = "https://m.ximalaya.com/";

const config = {
  apiConfig: {
    getAudioList: url + "m-revision/common/album/queryAlbumTrackRecordsByPage",
    getAudioDetail: url + "m-revision/page/track/queryTrackPage",
  },
};

export default config;
