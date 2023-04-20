/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-20 00:19:37
 * @LastEditTime: 2023-04-20 17:17:16
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/components/ChatContent.tsx
 */

import { Box, createStyles, Text } from '@mantine/core'
import { useChatStore, Chat } from '@/stores/ChatStore'
import { ChatMessage } from './ChatMessage'
import { useEffect } from 'react'

export const ChatContent = () => {
  const activeChatId = useChatStore((state) => state.activeChatId)
  const chats = useChatStore((state) => state.chats)

  const activeChat = chats[activeChatId!]

  return (
    <>
      {activeChat &&
        activeChat.message.map((item) => {
          return <ChatMessage key={item.id} message={item} />
        })}
    </>
  )
}
