/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-19 10:23:55
 * @LastEditTime: 2023-04-19 10:54:09
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/stores/submitAction.ts
 */
import { useChatStore, ChatState, Message, Chat } from "./ChatStore";
import { findChat } from "./ChatAction";
import { v4 as uuidv4 } from "uuid";

const get = useChatStore.getState;
const set = useChatStore.setState;


export const submitMessage = () => {
  const activeChatId = get().activeChatId;
  const textareaMessage = get().textareaMessage;
  const chat = findChat(activeChatId)

  const newMessage: Message = {
    message: textareaMessage,
    role: 'user',
    id: uuidv4(),
    createdAt: new Date()
  }

  chat?.message.push(newMessage)

  /**
   * 提交最后 4 条内容
   */
  const submit = chat?.message.slice(-4)

  if (chat) {
    set((state) => {
      return {
        ...state,
        textareaMessage: '',
        chats: state.chats.map((chat) => {
          if (chat.id === activeChatId) {
            return {
              ...chat,
              message: chat.message
            }
          }
          return chat
        })
      }
    })
  }

}
