/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-19 10:23:55
 * @LastEditTime: 2023-04-23 10:30:20
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/stores/SubmitAction.ts
 */
import { useChatStore, ChatState, Message, Chat } from './ChatStore'
// import { findChat } from './ChatAction'
import { streamCompletion } from '@/fetchs/openAI'
import { updateActionsChatMessage, getActiveChat } from '@/utils'
import produce from 'immer'
import { v4 as uuidv4 } from 'uuid'

const get = useChatStore.getState
const set = useChatStore.setState

export const submitMessage = () => {
  const { openAIKey, activeChatId, textareaMessage, chats } = get()
  if (!openAIKey || !activeChatId || !textareaMessage.length) {
    return
  }

  const newMessage: Message = {
    content: textareaMessage,
    role: 'user',
    id: uuidv4(),
    createdAt: new Date(),
  }

  /**
   * 提交最后 4 条内容
   */

  const chat = getActiveChat(chats, activeChatId)
  if (!chat) {
    console.error(`chat not found:${activeChatId}`)
    return
  }

  const submitMessage = chat?.message.slice((get().openAIHistory - 1) * -1)
  submitMessage.push(newMessage)
  /**
   * 将用户数据存储至 store中
   */
  set((state) => ({
    textareaMessage: '',
    chats: updateActionsChatMessage(state.chats, activeChatId, (message) => {
      message.push(newMessage)
      return message
    }),
  }))

  const abortController = new AbortController()
  const GPTConfig = get().openAIConfig
  const responseMessageId = uuidv4()

  const botResponseMessage: Message = {
    content: '',
    role: 'assistant',
    id: responseMessageId,
    createdAt: new Date(),
  }

  streamCompletion(
    submitMessage || [],
    GPTConfig,
    openAIKey,
    abortController,
    (content: any) => {
      set((state) => ({
        chats: updateActionsChatMessage(
          state.chats,
          activeChatId,
          (message: Chat['message']) => {
            const assistantMessage = message.find(
              (m) => m.id === responseMessageId,
            )
            if (assistantMessage) {
              assistantMessage.content += content
            } else {
              message.push(Object.assign(botResponseMessage, { content }))
            }
            return message
          },
        ),
      }))
    },
    (endChat: any) => {
      console.log('enendChat', endChat)
    },
  )
}
