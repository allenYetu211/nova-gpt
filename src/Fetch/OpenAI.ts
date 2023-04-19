/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-19 10:58:17
 * @LastEditTime: 2023-04-19 12:30:06
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/Fetch/OpenAI.ts
 */
import axios from 'axios';


const fetchOpenAIData = async (url: string, key: string) => {

  try {
    const { data } = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${key}`
      }
    })
    return data;
  } catch (e) {
    console.error(e);
  }
}

export const fetchModels = async (key: string) => {
  try {
    const res = await fetchOpenAIData('https://api.openai.com/v1/models', key)
    return res;
  } catch(e) {
    console.warn(e);
    return []
  }
}