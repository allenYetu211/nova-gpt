/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-16 12:52:14
 * @LastEditTime: 2023-04-20 14:55:49
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/utils/WsRequest.ts
 */
import EventEmitter from "eventemitter3";

export class WSRequest {
  private url: string;
  private ws: WebSocket | null = null;
  private headers?: { [key: string]: string };
  public event: EventEmitter = new EventEmitter();

  constructor(url: string, headers: { [key: string]: string } = {}) {
    this.url = url;
    this.headers = headers;
    console.log("this.event", this.event);
  }

  public connect(): void {
    try {
      console.log("this.url", this.url);
      this.ws = new WebSocket(this.url);
      this.addEvent();
    } catch (e) {
      console.log(`Error connecting to ${this.url}: ${e}`);
    }
  }

  public addEvent() {
    this.ws!.addEventListener("open", this.onOpen.bind(this));
    this.ws!.addEventListener("message", this.onMessage.bind(this));
    this.ws!.addEventListener("close", this.onClose.bind(this));
    this.ws!.addEventListener("error", this.onError.bind(this));
  }

  public removeEvent() {
    this.ws!.removeEventListener("open", this.onOpen.bind(this));
    this.ws!.removeEventListener("message", this.onMessage.bind(this));
    this.ws!.removeEventListener("close", this.onClose.bind(this));
    this.ws!.removeEventListener("error", this.onError.bind(this));
  }

  public send(data: any) {
    this.ws!.send(data);
  }

  private onOpen(event: Event): void {
    this.event.emit("open", event);
  }

  private onMessage(event: MessageEvent): void {
    this.event.emit("message", JSON.parse(event.data));
  }

  private onError(event: Event): void {
    this.event.emit("error", event);
  }

  private onClose(event: CloseEvent): void {
    this.event.emit("close", event);
  }
}
