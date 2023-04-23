/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-14 15:01:08
 * @LastEditTime: 2023-04-24 00:38:11
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/components/Nav.tsx
 */
import { Button, Divider, Flex, Navbar, createStyles, Box } from '@mantine/core'

import { IconPlus, IconSettings } from '@tabler/icons-react'
import { useChatStore } from '@/stores/ChatStore'
import { switchIsSetting } from '@/stores/SettingAction'
import { newChat, changeActiveChatId } from '@/stores/ChatAction'
import { ChatSessionInput } from '@/components/ChatSessionInput'

const useStyles = createStyles((theme) => ({
  chatItem: {
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
    // backgroundColor: theme.colors.dark[8],
    backgroundColor: `#2c3453`,
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
  const { classes, cx } = useStyles()
  const chats = useChatStore((state) => state.chats)
  const activeChatId = useChatStore((state) => state.activeChatId)

  const chatsList = chats
    ? chats.map((chat) => {
        return (
          <Box
            key={chat.id}
            className={cx(classes.chatItem, {
              [classes.chatItemActive]: activeChatId === chat.id,
            })}
            onClick={() => changeActiveChatId(chat.id)}
          >
            <ChatSessionInput title={chat.title} id={chat.id} />
          </Box>
        )
      })
    : []

  chatsList.reverse()

  return (
    <Navbar
      width={{ base: 330 }}
      sx={() => ({
        padding: '20px',
        backgroundColor: 'transparent',
        border: 'none',
      })}
      p="xs"
    >
      <Flex
        direction="column"
        sx={(theme) => ({
          height: '100%',
          background:
            theme.colorScheme === 'dark'
              ? // theme.colors.dark[7]
                `linear-gradient(to bottom, #262d42 60%, transparent)`
              : theme.colors.gray[0],
          borderRadius: theme.radius.xl,
          padding: theme.spacing.xl,
          boxShadow: theme.shadows.xl,
        })}
      >
        <Flex>
          <Button
            leftIcon={<IconPlus />}
            variant="subtle"
            color="gray"
            onClick={newChat}
            uppercase
          >
            New
          </Button>

          <Button
            onClick={switchIsSetting}
            sx={{ width: '100%' }}
            color="gray"
            leftIcon={<IconSettings />}
            variant="subtle"
          >
            Settings
          </Button>
        </Flex>

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
        </Flex>
      </Flex>
    </Navbar>
  )
}
