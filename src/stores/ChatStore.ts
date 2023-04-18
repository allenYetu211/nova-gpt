/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-18 11:28:09
 * @LastEditTime: 2023-04-18 15:26:29
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/stores/ChatStore.ts
 */
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const excludeKeys = [
  ''];

export interface Chat {
  id: string,
  message: string[],
  createdAt: Date,
  title: string,
}

export interface ChatState {
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
