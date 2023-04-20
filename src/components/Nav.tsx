/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-14 15:01:08
 * @LastEditTime: 2023-04-20 16:34:40
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/components/Nav.tsx
 */
import {
  Group,
  Button,
  Divider,
  Text,
  Flex,
  Navbar,
  createStyles,
  Box,
  ActionIcon,
} from '@mantine/core'

import { IconPlus, IconEdit } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useChatStore, ChatState } from '@/stores/ChatStore'
import { newChat, changeActiveChatId } from '@/stores/ChatAction'
import { UtilsContainer } from '@/components/UtilsContainer'
import { ChatSessionInput } from '@/components/ChatSessionInput'

const useStyles = createStyles((theme) => ({
  chatItem: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    width: '100%',
    padding: theme.spacing.xs,
    borderRadius: theme.radius.md,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },
  },
  chatItemActive: {
    backgroundColor: theme.colors.dark[8],
  },
  sessionContainer: {
    height: '100%',
  },
  chatContainer: {
    flex: 1,
    width: '100%',
    overflow: 'auto',
  },
}))

export function Nav() {
  const [chats, setChats] = useState<ChatState['chats'] | null>(null)
  const { classes, cx } = useStyles()
  const chatsStore = useChatStore((state) => state.chats)
  const activeChatId = useChatStore((state) => state.activeChatId)

  useEffect(() => {
    setChats(useChatStore.getState().chats)
  }, [chatsStore])

  const chatsList = chats
    ? Object.entries(chats).map(([id, chat]) => (
        <Box
          key={id}
          className={cx(classes.chatItem, {
            [classes.chatItemActive]: activeChatId === id,
          })}
          onClick={() => changeActiveChatId(id)}
        >
          <ChatSessionInput title={chat.title} id={id} />
        </Box>
      ))
    : []

  chatsList.reverse()

  return (
    <Navbar width={{ base: 230 }} p="xs">
      <Button
        leftIcon={<IconPlus />}
        variant="subtle"
        onClick={newChat}
        uppercase
      >
        New Chat Session
      </Button>

      <Divider my="sm" variant="dashed" />

      <Flex
        mih={50}
        gap="md"
        justify="space-evenly"
        align="center"
        direction="column"
        wrap="wrap"
        className={classes.sessionContainer}
      >
        <Flex
          justify="flex-start"
          align="center"
          direction="column"
          wrap="nowrap"
          gap="md"
          className={classes.chatContainer}
        >
          {chatsList}
        </Flex>

        <UtilsContainer />
      </Flex>
    </Navbar>
  )
}
