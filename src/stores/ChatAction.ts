/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-18 12:36:37
 * @LastEditTime: 2023-04-24 23:51:32
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/stores/ChatAction.ts
 */
import { useChatStore, ChatState } from './ChatStore'
import { v4 as uuidv4 } from 'uuid'

const getChat = useChatStore.getState
const setChat = useChatStore.setState

export const update = (newState: Partial<ChatState>) => setChat(() => newState)

export const newChat = () => {
  const id = uuidv4()
  setChat((state) => ({
    activeChatId: id,
    chats: state.chats.concat({
      id,
      message: [
        {
          id: uuidv4(),
          content: '有什么能帮到你的呢?',
          createdAt: new Date(),
          role: 'assistant',
        },
      ],
      createdAt: new Date(),
      title: 'New Chat',
    }),
  }))
}

export const changeActiveChatId = (id: string) => {
  setChat(() => ({
    activeChatId: id,
  }))
}

export const deleteChat = (id: string) => {
  setChat((state) => ({
    chats: state.chats.filter((chat) => {
      return chat.id !== id
    }),
  }))
}

export const changeChatTitle = (id: string, newTitle?: string) => {
  if (!newTitle) return
  setChat((state) => ({
    chats: state.chats.map((chat) => {
      if (chat.id === id) {
        chat.title = newTitle
      }
      return chat
    }),
  }))
}
