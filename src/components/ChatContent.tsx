/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-20 00:19:37
 * @LastEditTime: 2023-04-20 11:32:39
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/components/ChatContent.tsx
 */

import {
  Box,
  createStyles,
  Text
} from '@mantine/core';
import { findChat } from '@/stores/ChatAction';
import { useChatStore, Chat } from '@/stores/ChatStore';
import { useEffect, useState } from 'react'


export const ChatContent = () => {
  const activeChatId = useChatStore((state) => state.activeChatId);

  // const activeChat = useChatStore((state) => {
  //   return state.chats.find((item: Chat) => item.id === activeChatId)
  // })

  const chats = useChatStore((state) => state.chats);

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  console.log('activeChat', activeChat)
  return (
    <>
      {
         activeChat?.message!.map((item) => {
          return (
            <Box key={item.id}>
              <Text>{item.content}</Text>
            </Box>
          )
        })
      }
    </>
  )
}