/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-14 15:03:15
 * @LastEditTime: 2023-04-20 13:55:49
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/components/ChatSession.tsx
 */

import { Flex, Button } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useChatStore } from '@/stores/ChatStore'

export function ChatSession() {
  const { chats } = useChatStore((state) => {
    return {
      ...state,
    }
  })

  return (
    <>
      {!chats.length ? (
        <Button leftIcon={<IconPlus />} variant="subtle" uppercase>
          Create New Chat Session
        </Button>
      ) : (
        <Flex
          mih={50}
          bg="rgba(0, 0, 0, .3)"
          gap="xl"
          justify="flex-end"
          align="flex-start"
          direction="column"
          wrap="nowrap"
        >
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </Flex>
      )}
    </>
  )
}
