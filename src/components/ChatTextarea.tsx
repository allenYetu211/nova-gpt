/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-14 16:09:48
 * @LastEditTime: 2023-04-17 16:33:09
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/components/ChatTextarea.tsx
 */

import {
  Textarea,
  ActionIcon,
  Button,
  createStyles,
  Select,
  Flex
} from '@mantine/core';

import {
  IconMicrophone2,
  IconSend,
  IconMicrophone2Off
} from '@tabler/icons-react';

import { useEffect, useRef, useState } from 'react';
import { InstallExtension } from '@/core/InstallExtension';



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
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`
  },

  utilsContainer: {
    paddingLeft: `${theme.spacing.xs} ${theme.spacing.sm}`
  }
}));



export function ChatTextarea() {
  const { classes } = useStyles();
  const [isOpen, setOpen] = useState(false);
  const [textarea, setTextarea] = useState<string>('')
  const [selectData, setSelectData] = useState< {value: string, label: string}[]>([])
  const [selectValue, setSelectValue] = useState<string>('')
  const tcr = useRef<InstallExtension>()

  useEffect(() => {
    if (!tcr.current) {
      tcr.current = new InstallExtension()
      setSelectData(tcr.current.extensions)
      setSelectValue(tcr.current.extensions[0].value)
      addListen()
    }
  }, [])

  const addListen = () => {
    InstallExtension.emitter.on('ResultChange', (text: string) => {
      setTextarea(text)
    })
  }

  const startRecord = async () => {
    await tcr.current?.startRecord()
    setTextarea('')
    setOpen(true)
  }


  const playRecord = async () => {
    await tcr.current?.stopRecord()
    setOpen(false)

  }

  const onChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextarea(e.target.value)
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
        <ActionIcon color="cyan" size="lg" onClick={isOpen ? playRecord : startRecord}>
          {
            isOpen ? <IconMicrophone2 size="1.625rem" /> : <IconMicrophone2Off size="1.625rem" />
          }
        </ActionIcon>

        <Select
          placeholder="Pick one"
          value={selectValue}
          data={selectData}
        />
      </Flex>

      <div className={classes.container}>
        <Textarea
          className={classes.textarea}
          placeholder="Your question"
          value={textarea}
          onChange={onChangeTextarea}
          withAsterisk
        />
        <div className={classes.iconContainer}>
          <ActionIcon color="cyan" size="lg">
            <IconSend size="1.625rem" />
          </ActionIcon>
        </div>
      </div>
    </div>
  )
}