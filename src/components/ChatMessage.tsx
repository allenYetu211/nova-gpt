/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-20 13:35:02
 * @LastEditTime: 2023-04-23 14:27:08
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/components/ChatMessage.tsx
 */
import { FC } from 'react'
import { Message } from '@/stores/ChatStore'
import { Box, createStyles, Text, Flex } from '@mantine/core'
import IconBot from '@/images/svg/bot'
import IconUser from '@/images/svg/user'
import { Markdown } from '@/components/Markdown'

interface ChatMessageProps {
  message: Message
}

const useStyles = createStyles((theme) => {
  return {
    container: {
      padding: theme.spacing.xs,
      borderRadius: theme.radius.sm,
      marginBottom: theme.spacing.xs,
      display: 'inline-block',
      maxWidth: '80%',
      // display: 'flex',
    },

    user: {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[0],
    },
    assistant: {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
    icon: {
      width: 40,
      height: 40,
      padding: theme.spacing.xs,
    },
  }
})

export const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  const { content, createdAt, role } = message
  const { classes, cx, theme } = useStyles()

  return (
    <>
      <Flex
        justify={role === 'user' ? 'flex-end' : 'flex-start'}
        align="center"
        sx={{
          fontSize: theme.fontSizes.sm,
        }}
      >
        {role === 'assistant' && <IconBot className={classes.icon} />}

        <Box
          className={cx(classes.container, 'markdown-body', {
            [classes.user]: role === 'user',
            [classes.assistant]: role === 'assistant',
          })}
        >
          <Markdown content={content} />
        </Box>
        {role === 'user' && <IconUser className={classes.icon} />}
      </Flex>
    </>
  )
}
