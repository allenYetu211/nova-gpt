/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-18 17:34:12
 * @LastEditTime: 2023-04-20 13:55:59
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/components/ChatSessionInput.tsx
 */

import {
  Input,
  Text,
  Flex,
  ActionIcon,
  createStyles,
  Tooltip,
  Group,
  CloseButton,
} from '@mantine/core'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { useState, useRef, memo, useMemo, useCallback } from 'react'
import { findChat, deleteChat, changeChat } from '@/stores/ChatAction'

interface ChatSessionInputProps {
  title: string
  id: string
}

export const ChatSessionInput = memo((props: ChatSessionInputProps) => {
  const [editState, setEditState] = useState<boolean>(false)
  const inputEl = useRef<HTMLInputElement>(null)

  const onEditClick = () => {
    setEditState(true)
    setTimeout(() => {
      inputEl.current?.focus()
    }, 0)
  }

  const onEditBlur = useCallback(() => {
    changeChat(props.id, { title: inputEl.current?.value })
    setEditState(false)
  }, [props.id])

  const onDeleteClick = () => {
    deleteChat(props.id)
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
        {editState ? (
          <Input
            ref={inputEl}
            defaultValue={props.title}
            onBlur={onEditBlur}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onEditBlur()
              }
            }}
            size="xs"
            sx={() => ({
              border: 'none',
              borderRadius: 0,
              flex: 1,
            })}
          />
        ) : (
          <Tooltip position="top-start" withArrow label={props.title}>
            <Text sx={() => ({ flex: 1 })} truncate size="xs">
              {props.title || ''}
            </Text>
          </Tooltip>
        )}

        <Group>
          <ActionIcon size="xs" radius="md" variant="default">
            <IconEdit onClick={onEditClick} size="0.75rem" />
          </ActionIcon>

          <ActionIcon size="xs" radius="md" variant="default">
            <IconTrash onClick={onDeleteClick} size="0.75rem" />
          </ActionIcon>
        </Group>
      </Flex>
    </>
  )
})
