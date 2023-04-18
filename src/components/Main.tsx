/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-14 12:08:23
 * @LastEditTime: 2023-04-18 23:37:53
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
        <h3>修改内容  </h3>
      </div>

      <ChatTextarea />
    </div>
  )

}