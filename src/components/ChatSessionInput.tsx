/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-18 17:34:12
 * @LastEditTime: 2023-04-19 00:06:24
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/components/ChatSessionInput.tsx
 */
import {
  Input,
  Text,
  Flex,
  ActionIcon,
  createStyles,
  Tooltip
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useState, useRef, memo } from "react";
import { findChat, changeChat } from '@/stores/ChatAction'


interface ChatSessionInputProps {
  title: string;
  id: string;
}



export const ChatSessionInput = memo((props: ChatSessionInputProps) => {
  const [editState, setEditState] = useState<boolean>(false)
  const chat = findChat(props.id)
  const inputEl = useRef<HTMLInputElement>(null)

  const onEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeChat(props.id, { title: e.target.value })
  }

  const onEditClick = () => {
    setEditState(true)
    setTimeout(() => {
      inputEl.current?.focus()
    }, 0)
  }

  const onEditBlur = () => {
    setEditState(false)
  }


  return (
    <>
      <Flex
        gap="md"
        justify="space-between"
        align="center"
        direction="row"
        wrap="wrap"

      >
        {
          editState ?
            <Input
              ref={inputEl}
              onChange={onEdit}
              value={chat?.title || ''}
              onBlur={onEditBlur}
              size="xs"
              sx={() => ({
                border: 'none',
                borderRadius: 0,
                flex: 1
              })}
            />
            :
            <Tooltip
              position="top-start"
              withArrow
              label={chat?.title}>
              <Text
                sx={() => ({ flex: 1 })}
                truncate size="xs">{chat?.title || ''}</Text>
            </Tooltip>
        }


        <ActionIcon>
          <IconEdit onClick={onEditClick} size="1.125rem" />
        </ActionIcon>
      </Flex>
    </>
  )
})
