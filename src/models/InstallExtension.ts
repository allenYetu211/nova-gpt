/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-17 14:25:03
 * @LastEditTime: 2023-04-24 11:59:11
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/models/InstallExtension.ts
 */
import Eventemitter from "eventemitter3";
import { useChatStore } from "@/stores/ChatStore";
type Objects = {
  startRecord: () => void;
  stopRecord: () => void;
};

const setChat = useChatStore.setState;

export class InstallExtension {
  static extension: { [key: string]: new (...args: any[]) => object } = {};
  public transformExtensions: { [key: string]: object } = {};
  public extensions: { value: string; label: string }[] = [];
  public currUseExtension: string = "";
  static emitter: Eventemitter = new Eventemitter();

  constructor() {
    this.install();

    setChat((state) => ({
      recordItems: this.extensions,
      recordModel: this.currUseExtension,
    }));
  }

  private getCurrExtension(): Objects {
    return this.transformExtensions[this.currUseExtension] as Objects;
  }

  public startRecord() {
    this.getCurrExtension().startRecord();
  }

  public stopRecord() {
    this.getCurrExtension().stopRecord();
  }

  private install() {
    const extensionsName = Object.keys(InstallExtension.extension);
    this.currUseExtension = extensionsName[0];
    extensionsName.forEach((item: string) => {
      const fun = new InstallExtension.extension[item](InstallExtension);
      this.transformExtensions[item] = fun;
      this.extensions.push({ value: item, label: item });
    });
  }

  static use(key: string, fun: new (...args: any[]) => object) {
    if (isClass(fun)) {
      InstallExtension.extension[key] = fun;
      return;
    }
    console.warn(`Extensions: extension ${key}, Not an Extensions class`);
  }
}

function isClass(param: any): param is new (...args: any[]) => object {
  return (
    typeof param === "function" &&
    /^\s*class\s+/.test(param.toString()) &&
    param.prototype.hasOwnProperty("constructor")
  );
}
