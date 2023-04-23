/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-14 16:09:48
 * @LastEditTime: 2023-04-23 19:02:41
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/components/ChatTextareaContainer.tsx
 */

import {
  Textarea,
  ActionIcon,
  Box,
  createStyles,
  Select,
  Flex,
} from '@mantine/core'

import {
  IconMicrophone2,
  IconSend,
  IconMicrophone2Off,
} from '@tabler/icons-react'

import { useEffect, useRef } from 'react'
import { InstallExtension } from '@/models/InstallExtension'
import { useChatStore } from '@/stores/ChatStore'
import { submitMessage } from '@/stores/SubmitAction'
import { update } from '@/stores/ChatAction'
import { ChatTextareaInput } from '@/components/ChatTextareaInput'

const useStyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  textarea: {
    flex: 1,
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    transform: 'translate(5%, 10%)',
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.darkButton[0],
    boxShadow: theme.colors.darkButton[0],
  },

  utilsContainer: {
    paddingLeft: `${theme.spacing.xs} ${theme.spacing.sm}`,
  },
}))

export function ChatTextarea() {
  const { classes } = useStyles()
  const tcr = useRef<InstallExtension>()

  const isRecording = useChatStore((state) => state.isRecording)
  const selectValue = useChatStore((state) => state.selectValue)
  const selectData = useChatStore((state) => state.selectData)

  useEffect(() => {
    if (!tcr.current) {
      tcr.current = new InstallExtension()
      update({
        selectData: tcr.current.extensions,
        selectValue: tcr.current.extensions[0].value,
      })
      addListen()
    }
  }, [])

  const addListen = () => {
    InstallExtension.emitter.on('ResultChange', (text: string) => {
      useChatStore.setState({ textareaMessage: text })
    })
  }

  const startRecord = async () => {
    await tcr.current?.startRecord()
    update({ textareaMessage: '', isRecording: true })
  }

  const stopRecord = async () => {
    await tcr.current?.stopRecord()
    update({ isRecording: false })
  }

  return (
    <div>
      <Flex
        className={classes.utilsContainer}
        mih={50}
        gap="md"
        justify="space-between"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <ActionIcon
          color="cyan"
          size="lg"
          onClick={isRecording ? stopRecord : startRecord}
        >
          {isRecording ? (
            <IconMicrophone2 size="1.625rem" />
          ) : (
            <IconMicrophone2Off size="1.625rem" />
          )}
        </ActionIcon>

        <Select placeholder="Pick one" value={selectValue} data={selectData} />
      </Flex>

      <Box className={classes.container}>
        <ChatTextareaInput />
        <Box className={classes.iconContainer}>
          <ActionIcon color="gray" size="lg" onClick={submitMessage}>
            <IconSend size="1.625rem" />
          </ActionIcon>
        </Box>
      </Box>
    </div>
  )
}
