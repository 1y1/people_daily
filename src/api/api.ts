import axios from "axios";
import config from "./config";

export default {
  _doGetPromise(url: string, params: any, options: any) {
    const timeout = options?.timeout;
    return new Promise(function (resolve, reject) {
      axios
        .get(url, {
          params: params,
          timeout: timeout || 6000,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getAudioList(params?: object, options?: any) {
    return this._doGetPromise(config.apiConfig.getAudioList, params, options);
  },
  getAudioDetail(params?: string, options?: any) {
    return this._doGetPromise(
      config.apiConfig.getAudioDetail + params,
      null,
      options
    );
  },
};
