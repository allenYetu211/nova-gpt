/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-18 11:28:09
 * @LastEditTime: 2023-04-20 00:11:28
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/stores/ChatStore.ts
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const excludeKeys = [
  'textareaMessage',
  'isRecording',
];

interface SettingsForm {
  // GPT
  model: string;
  temperature: number;
  top_p: number;
  n: number;
  stop: string;
  max_tokens: number;
  presence_penalty: number;
  frequency_penalty: number;
  logit_bias: string;
  auto_title: boolean;
}

export const defaultSettings = {
  model: "gpt-3.5-turbo",
  temperature: 1,
  top_p: 1,
  n: 1,
  stop: "",
  max_tokens: 2000,
  presence_penalty: 0,
  frequency_penalty: 0,
  logit_bias: "",
  auto_title: true,
};


export interface Message {
  content: string
  id: string
  createdAt: Date,
  role: 'user' | 'system' | 'assistant'
}

export interface Chat {
  id: string,
  message: Message[],
  createdAt: Date,
  title: string,
}

export interface ChatState {
  /**
   * open ai config
   */
  openAIKey: string
  openAIModels: string[]
  openAIHistory: number
  openAIConfig: SettingsForm;
  /**
   * Chat Components Messages
   */
  chats: Chat[],
  activeChatId: string,
  /**
   *  Textarea Components State
   */
  isRecording: boolean,
  textareaMessage: string,
  selectData: { value: string, label: string }[],
  selectValue: string,
}

export const initialState = {
  openAIKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY || '',
  openAIModels: [ 'gpt-3.5-turbo', 'gpt-3.5-turbo-0301', 'gpt-4-32k-0314', 'gpt-4-32k', 'gpt-4-0314', 'gpt-4'],
  openAIHistory: 4,
  openAIConfig: defaultSettings,

  chats: [],
  activeChatId: '',

  isRecording: false,
  textareaMessage: '',
  selectData: [],
  selectValue: '',
}

const store = () => ({ ...initialState } as ChatState);

export const useChatStore = create<ChatState>()(
  persist(store, {
    name: 'chat-store',
    partialize: (state) =>
      Object.fromEntries(
        Object.entries(state).filter(([key]) => !excludeKeys.includes(key))
      ),
  })
)
