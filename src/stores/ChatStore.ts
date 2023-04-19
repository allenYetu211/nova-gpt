/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-18 11:28:09
 * @LastEditTime: 2023-04-19 16:05:42
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/stores/ChatStore.ts
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const excludeKeys = [
  'textareaMessage',
  'isRecording',
];

export interface Message {
  message: string
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
  openAITargetModels: string
  openAIHistory: number
  openAI_temperature: number
  openAI_max_tokens: number
  openAI_presence_penaltyn: number
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
  openAIModels: ['gpt-3.5-turbo-0301', 'gpt-3.5-turbo', 'gpt-4-32k-0314', 'gpt-4-32k', 'gpt-4-0314', 'gpt-4'],
  openAITargetModels: 'gpt-3.5-turbo-0301',
  openAIHistory: 4,
  openAI_temperature: 2,
  openAI_max_tokens: 2000,
  openAI_presence_penaltyn: 1,


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
