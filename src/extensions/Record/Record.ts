import Recorder from "@/extensions/Record/index";
import { Player } from "@/utils/MicrophoneRecord";
import { AliyunTransformAudio } from "@/Transform/AliyunTransform";
import { v4 as uuidv4 } from "uuid";

const token = `7bce9de7bf1242de9e060caa6bdcd72c`;

const config = {
  sampleBits: 16,
  sampleRate: 16000,
  numChannels: 1,
  compiling: true, // 是否开启边录音边转化（后期改用web worker）
};

export class Record {
  private recorder: Recorder | null = null;
  private playTimer: NodeJS.Timeout | null = null;
  private aliyun: AliyunTransformAudio | null = null;

  constructor() {
    this.init();
  }

  init() {
    console.log("init>>>");
    this.recorder = new Recorder(config);

    this.recorder.onprocess = function (duration) {
      // this.setState({
      //     duration: duration.toFixed(5),
      // });
      // 推荐使用 onprogress
    };

    // this.recorder.onprogress = (params) => {
    //   // 此处控制数据的收集频率
    //   if (config.compiling) {
    //     console.log('音频总数据：', params.data);
    //   }
    // }

    this.recorder.onplay = () => {
      console.log("%c回调监听，开始播放音频", "color: #2196f3");
    };
    this.recorder.onpauseplay = () => {
      console.log("%c回调监听，暂停播放音频", "color: #2196f3");
    };
    this.recorder.onresumeplay = () => {
      console.log("%c回调监听，恢复播放音频", "color: #2196f3");
    };
    this.recorder.onstopplay = () => {
      console.log("%c回调监听，停止播放音频", "color: #2196f3");
    };
    this.recorder.onplayend = () => {
      console.log("%c回调监听，音频已经完成播放", "color: #2196f3");
      // 播放结束后，停止绘制canavs
      // this.stopDrawPlay();
    };

    if (config.compiling) {
      this.compiling();
    }
  }

  /**
   * 实时转播信息
   */
  handleMessage() {
    if (this.aliyun) return;
    this.aliyun = new AliyunTransformAudio();
    this.aliyun.event!.on("message", (event) => {
      console.log("message", event);
    });
  }

  /**
   * 实时录播
   */
  compiling() {
    this.playTimer = setInterval(() => {
      if (!this.recorder) {
        return;
      }

      let newData = this.recorder.getNextData();
      if (!newData.length) {
        return;
      }

      let byteLength = newData[0].byteLength;
      let buffer = new ArrayBuffer(newData.length * byteLength);

      let dataView = new DataView(buffer);

      // // 数据合并
      for (let i = 0, iLen = newData.length; i < iLen; ++i) {
        for (let j = 0, jLen = newData[i].byteLength; j < jLen; ++j) {
          dataView.setInt8(i * byteLength + j, newData[i].getInt8(j));
        }
      }

      console.log("dataView", dataView);
      this.aliyun?.sendBlob(new Blob([dataView]));

      // // 将录音数据转成WAV格式，并播放
      // let audioDB = encodeWAV(dataView, config.sampleRate, config.sampleRate, config.numChannels, config.sampleBits, false)
      // this.aliyun?.sendBlob(new Blob([audioDB.buffer], { type: 'audio/wav' }))
    }, 500);
  }

  startRecord() {
    try {
      this.recorder!.start().then(() => {
        this.handleMessage();
        return Promise.resolve();
      });
    } catch (error: any) {
      return Promise.reject(`异常了,${error.name}:${error.message}`);
    }
  }

  stopRecord() {
    this.aliyun?.send({
      headers: {
        message_id: uuidv4().replace(/-/g, ""),
        name: "StopTranscription",
      },
    });
    this.playTimer && clearInterval(this.playTimer);
    this.recorder!.stop();
  }

  playRecord() {
    this.recorder?.play();
  }
}
