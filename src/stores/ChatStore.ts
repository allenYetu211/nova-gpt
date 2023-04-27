/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-18 11:28:09
 * @LastEditTime: 2023-04-23 14:59:40
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/stores/ChatStore.ts
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const excludeKeys = ['textareaMessage', 'isRecording']

export interface Message {
  content: string
  id: string
  createdAt: Date
  role: 'user' | 'system' | 'assistant'
}

export interface Chat {
  id: string
  message: Message[]
  createdAt: Date
  title: string
}

export interface ChatState {
  /**
   * Chat Components Messages
   */
  chats: Chat[]
  activeChatId: string | undefined
  /**
   *  Textarea Components State
   */
  isRecording: boolean
  textareaMessage: string
  recordItems: { value: string; label: string }[]
  recordModel: string
}

export const initialState = {
  chats: [],
  activeChatId: undefined,

  isRecording: false,
  textareaMessage: '',
  recordItems: [],
  recordModel: '',
}

const store = () => ({ ...initialState } as ChatState)

export const useChatStore = create<ChatState>()(
  persist(store, {
    name: 'chat-store',
    partialize: (state) =>
      Object.fromEntries(
        Object.entries(state).filter(([key]) => !excludeKeys.includes(key)),
      ),
  }),
)
