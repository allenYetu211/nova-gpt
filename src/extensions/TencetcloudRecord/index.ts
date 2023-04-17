/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-17 10:36:51
 * @LastEditTime: 2023-04-17 17:33:34
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/extensions/TencetcloudRecord/index.ts
 */
import { InstallExtension } from '@/core/InstallExtension'
import webRecorder from './SDK/webRecorder'
import SpeechRecognizer from './SDK/speechRecognizer'
import { signCallback } from './SDK/asrauthentication'

const config = {
  secretkey:process.env.NEXT_PUBLIC_SECRET_KEY,
  secretid: process.env.NEXT_PUBLIC_SECRET_ID,
  appid: process.env.NEXT_PUBLIC_APPID,
  signCallback: signCallback, // 鉴权函数 用户提供鉴权函数，不传则为null
  // 用户参数
  // 实时识别接口参数
  engine_model_type: '16k_zh', // 引擎
  voice_format: 1,
  // 以下为非必填参数，可跟据业务自行修改
  hotword_id: '08003a00000000000000000000000000',
  needvad: 1,
  filter_dirty: 1,
  filter_modal: 1,
  filter_punc: 1,
  convert_num_mode: 1,
  word_info: 2
}


export class TencetCloudRecord {
  private recorder: webRecorder | null = null;
  private speechRecognizer: SpeechRecognizer | null = null;
  private isCanSendData: boolean = false;
  private isCanStop: boolean = false;
  private  resultText: string = ''


  constructor () {
  }

  public startRecord() {
    this.recorder = new webRecorder()
    const self = this
    this.recorder.OnReceivedData = (res) => {
      // res 为采集到浏览器数据
      if (self.isCanSendData) {
        // 发送数据
        self.speechRecognizer!.write(res);
      }
    };
    // 录音失败时
    this.recorder.OnError = (err) => {
      this.recorder!.stop();
    };
    this.recorder.start();

    if (!this.speechRecognizer) {
      this.speechRecognizer = new SpeechRecognizer(config);
      this.addListenerCallBack()

      // 建立连接
      this.speechRecognizer!.start();
    }
  }

  public stopRecord() {
    if (this.isCanStop) {
      this.speechRecognizer!.stop();
    }
  }

  private addListenerCallBack() {
    this.speechRecognizer!.OnRecognitionStart = (res) => {
      console.log('开始识别', res);
      this.isCanSendData = true;
      this.isCanStop = true;
    };
    // @ts-ignore 
    this.speechRecognizer!.OnRecognitionResultChange = (res: any) => {
      const currentText = `${this.resultText}${res.result.voice_text_str}`;
      InstallExtension.emitter.emit('ResultChange', currentText)
    };
    // @ts-ignore 一句话结束
    this.speechRecognizer!.OnSentenceEnd = (res: any) => {
      this.resultText += res.result.voice_text_str;
      InstallExtension.emitter.emit('SentenceEnd', this.resultText)
    };
    // @ts-ignore 识别结束
    this.speechRecognizer!.OnRecognitionComplete = (res: any) => {
      console.log('识别结束', res);
      this.isCanSendData = false;
      InstallExtension.emitter.emit('RecognitionComplete', res)
    };
    // @ts-ignore 识别错误
    this.speechRecognizer!.OnError = (res: any) => {
      console.log('识别失败', res);
      this.isCanSendData = false;
      InstallExtension.emitter.emit('Error', res)
    };

  }

  static extensionName = 'TencetCloudRecord'
}

InstallExtension.use(TencetCloudRecord.extensionName, TencetCloudRecord)