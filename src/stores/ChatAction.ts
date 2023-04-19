/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-18 12:36:37
 * @LastEditTime: 2023-04-20 00:05:04
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/stores/ChatAction.ts
 */
import { useChatStore, ChatState, Chat } from "./ChatStore";
import { v4 as uuidv4 } from "uuid";

const get = useChatStore.getState;
const set = useChatStore.setState;



export const update = (newState: Partial<ChatState>) => set(() => newState);

export const updateOpenAIConfig = (newState: Partial<ChatState['openAIConfig']>) => {
  const openAIConfig = get().openAIConfig

  set((state) => ({
    ...state,
    openAIConfig: {
      ...openAIConfig,
      ...newState
    }
  }))
}


export const newChat = () => {
  const id = uuidv4()
  set((state) => ({
    activeChatId: id,
    chats: [
      ...state.chats,
      {
        id,
        message: [],
        createdAt: new Date(),
        title: 'New Chat'
      }
    ]
  }))
}

export const getChatGPTConfig = () => {
  const {

  } = get();
  return {}
}

export const changeActiveChatId = (id: string) => {
  set(() => ({
    activeChatId: id
  }))
}

export const findChat = (id: string) => {
  const chats = get().chats;
  return chats.find((chat) => chat.id === id);
}

export const deleteChat = (id: string) => {
  const chat = findChat(id)
  if (chat) {
    set((state) => {
      const chats = state.chats.filter((chat) => chat.id !== id)
      return {
        chats
      }
    })
  }
}


export const changeChat = (id: string, newState: Partial<Chat>) => {
  const chat = findChat(id)
  if (chat) {
    set((state) => {
      const chats = state.chats.map((chat) => {
        if (chat.id === id) {
          return {
            ...chat,
            ...newState
          }
        }
        return chat
      })
      return {
        chats
      }
    })
  }
} 