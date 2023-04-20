/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-19 10:23:55
 * @LastEditTime: 2023-04-20 14:55:27
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/stores/SubmitAction.ts
 */
import { useChatStore, ChatState, Message, Chat } from './ChatStore'
import { findChat } from './ChatAction'
import { streamCompletion } from '@/fetch/openAI'
import { v4 as uuidv4 } from 'uuid'

const get = useChatStore.getState
const set = useChatStore.setState

export const submitMessage = () => {
  const activeChatId = get().activeChatId
  const textareaMessage = get().textareaMessage
  if (!activeChatId) return
  const chat = findChat(activeChatId)

  const newMessage: Message = {
    content: textareaMessage,
    role: 'user',
    id: uuidv4(),
    createdAt: new Date(),
  }

  chat?.message.push(newMessage)

  /**
   * 提交最后 4 条内容
   */
  const submitMessage = chat?.message.slice(get().openAIHistory * -1)

  if (chat) {
    set((state) => {
      return {
        ...state,
        textareaMessage: '',
        chats: state.chats.map((chat) => {
          if (chat.id === activeChatId) {
            return {
              ...chat,
              message: chat.message,
            }
          }
          return chat
        }),
      }
    })
  }

  const GPTConfig = get().openAIConfig

  const openAIKey = get().openAIKey
  if (openAIKey === undefined) {
    console.error('API key not set')
    return
  }

  const abortController = new AbortController()

  streamCompletion(
    submitMessage || [],
    GPTConfig,
    openAIKey,
    abortController,
    callback,
    endCallback,
  )
}

const callback = (content: any) => {
  console.log('content', content)
}

const endCallback = (endChat: any) => {
  endChat
}
