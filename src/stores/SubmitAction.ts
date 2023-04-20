/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-19 10:23:55
 * @LastEditTime: 2023-04-21 01:01:59
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/stores/SubmitAction.ts
 */
import { useChatStore, ChatState, Message, Chat } from './ChatStore'
// import { findChat } from './ChatAction'
import { streamCompletion } from '@/fetchs/openAI'
import produce from 'immer'
import { v4 as uuidv4 } from 'uuid'

const get = useChatStore.getState
const set = useChatStore.setState

export const submitMessage = () => {
  const { openAIKey, activeChatId, textareaMessage, chats } = get()
  if (
    !openAIKey ||
    !activeChatId ||
    !textareaMessage.length ||
    !chats[activeChatId]
  ) {
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
  const submitMessage = chats[activeChatId].message.slice(
    (get().openAIHistory - 1) * -1,
  )

  submitMessage.push(newMessage)
  console.log('submitMessage', submitMessage)
  /**
   * 将用户数据存储至 store中
   */
  pushActiveMessage(activeChatId, newMessage)
  set(() => ({ textareaMessage: '' }))

  const abortController = new AbortController()
  const GPTConfig = get().openAIConfig
  let firstResponse = true
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
      if (firstResponse) {
        pushActiveMessage(activeChatId, botResponseMessage)
        firstResponse = false
      }

      set(
        produce((draft) => {
          const len = draft.chats[activeChatId].message.length
          draft.chats[activeChatId].message[len - 1].content += content
        }),
      )
    },
    (endChat: any) => {
      console.log('enendChat', endChat)
    },
  )
}

const pushActiveMessage = (activeChatId: string, message: Message) => {
  set(
    produce((draft) => {
      draft.chats[activeChatId].message.push(message)
    }),
  )
}
