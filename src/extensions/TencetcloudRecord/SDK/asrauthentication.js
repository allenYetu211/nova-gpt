/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-17 11:23:24
 * @LastEditTime: 2023-04-17 14:09:12
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/core/TencetcloudRecord/SDK/asrauthentication.js
 */
/** 获取签名 start */
import crypto from "crypto-js";

function toUint8Array(wordArray) {
  // Shortcuts
  const words = wordArray.words;
  const sigBytes = wordArray.sigBytes;

  // Convert
  const u8 = new Uint8Array(sigBytes);
  for (let i = 0; i < sigBytes; i++) {
    u8[i] = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
  }
  return u8;
}

function Uint8ArrayToString(fileData) {
  let dataString = "";
  for (let i = 0; i < fileData.length; i++) {
    dataString += String.fromCharCode(fileData[i]);
  }
  return dataString;
}
// 签名函数示例
export function signCallback(signStr, key) {
  const secretKey = key;
  // const secretKey = config.secretKey;
  const hash = crypto.HmacSHA1(signStr, secretKey);
  const bytes = Uint8ArrayToString(toUint8Array(hash));
  return window.btoa(bytes);
}

/** 获取签名 end */
