/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-03 10:41:08
 * @LastEditTime: 2023-05-03 11:54:33
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/i18n/index.ts
 */
import { zh_cn } from './zh_cn';
import { en } from './en';
import { useSettingStore } from '@/stores/SettingStore';

const getSetting = useSettingStore.getState;
const language = getSetting().language;

export default {
	zh_cn,
	en,
}[language] as typeof zh_cn;
