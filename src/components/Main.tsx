/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-14 12:08:23
 * @LastEditTime: 2023-04-24 22:53:06
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/Main.tsx
 */
import { ChatContent } from '@/components/ChatContent'
import { ChatTextarea } from '@/components/ChatTextareaContainer'
import { useSettingStore } from '@/stores/SettingStore'
import { MantineTheme, createStyles } from '@mantine/core'
import { Setting } from './Setting'

const useStyles = createStyles((theme: MantineTheme) => {
  return {
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    chatTextareaContainer: {},
  }
})

export function Main() {
  const isSetting = useSettingStore((state) => state.isSetting)
  const { classes } = useStyles()

  return (
    <>
      {isSetting ? (
        <Setting />
      ) : (
        <div className={classes.mainContainer}>
          <ChatContent />
          <ChatTextarea />
        </div>
      )}
    </>
  )
}
