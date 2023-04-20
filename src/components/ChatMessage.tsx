/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-20 13:35:02
 * @LastEditTime: 2023-04-20 14:51:38
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/components/ChatMessage.tsx
 */
import { FC } from 'react'
import { Message } from '@/stores/ChatStore'

interface ChatMessageProps {
  message: Message
}

export const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  const { content, createdAt, role } = message
  return (
    <>
      <div>21321</div>
    </>
  )
}
