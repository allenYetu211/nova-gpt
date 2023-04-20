/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-14 12:08:23
 * @LastEditTime: 2023-04-20 00:42:49
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/components/Main.tsx
 */
import {
  MantineProvider,
  MantineTheme,
  createStyles,
  AppShell,
  Navbar,
  Header
} from '@mantine/core';

import { ChatTextarea } from '@/components/ChatTextarea'
import { ChatContent } from '@/components/ChatContent'


const useStyles = createStyles((theme: MantineTheme) => {
  return {
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    message: {
      paddingBottom: theme.spacing.md,
      flex: 1,
      overflow: 'auto',
    },

    chatTextareaContainer: {

    }

  }
})


export function Main() {

  const { classes, theme } = useStyles();

  return (
    <div className={classes.mainContainer}>

      <div className={classes.message}>
        <ChatContent />
      </div>

      <ChatTextarea />
    </div>
  )

}