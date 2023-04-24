/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-20 13:35:02
 * @LastEditTime: 2023-04-24 22:52:55
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/ChatMessage.tsx
 */
import { Markdown } from '@/components/Markdown'
import IconBot from '@/images/svg/bot'
import IconUser from '@/images/svg/user'
import { Message } from '@/stores/ChatStore'
import { Box, createStyles, Flex } from '@mantine/core'
import { FC } from 'react'

interface ChatMessageProps {
  message: Message
}

const useStyles = createStyles((theme) => {
  return {
    container: {
      padding: theme.spacing.xs,
      borderRadius: theme.radius.md,
      marginBottom: theme.spacing.xs,
      display: 'inline-block',
      maxWidth: '80%',
    },

    user: {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : // '#2c324f'
            theme.colors.gray[0],
    },
    assistant: {
      background:
        theme.colorScheme === 'dark'
          ? theme.colors.gradient[1]
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
  const { content, role } = message
  const { classes, cx, theme } = useStyles()

  return (
    <>
      <Flex
        justify={role === 'user' ? 'flex-end' : 'flex-start'}
        align="flex-start"
        // align="flex-end"
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
