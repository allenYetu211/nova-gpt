import {
  Flex,
  Text,
  TextInput,
  ActionIcon,
  Box
} from "@mantine/core";
import { IconRefresh } from '@tabler/icons-react'
import type { FC, PropsWithChildren } from 'react'
import type { TextInputProps } from '@mantine/core'

interface UIFormTextInputProps extends TextInputProps {
  onChecked?: () => void;
}

export const UIFormTextInput: FC<PropsWithChildren<UIFormTextInputProps>> = (props) => {
  const { label, onChecked, children } = props
  return (

    <Flex
      justify='space-evenly'
      align='center'
      sx={(theme) => ({
        paddingBottom: theme.spacing.xs,
      })}
    >
      <Text
        sx={
          (theme) => ({
            textAlign: 'left',
            width: '40%',
            paddingRight: theme.spacing.xs
          })
        }
        size='sm'
      >
        {label}
      </Text>

      <Flex
        justify='flex-end'
        align='center'
        sx={
          (theme) => ({
            flex: 1,
            display: 'flex',

          })
        }>
        {children}
      </Flex>

      {
        onChecked && (
          <ActionIcon
            sx={(theme) => ({
              marginLeft: theme.spacing.xs
            })}
            size="xs"
            onClick={onChecked}>
            <IconRefresh size="0.725rem" />
          </ActionIcon>
        )
      }


    </Flex>
  );
};