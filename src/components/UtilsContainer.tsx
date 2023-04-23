/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-18 16:50:34
 * @LastEditTime: 2023-04-23 19:31:01
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/components/UtilsContainer.tsx
 */
import {
  Button,
  Text,
  Box,
  TextInput,
  Drawer,
  Title,
  createStyles,
  Divider,
  Select,
  Slider,
  NumberInput,
} from '@mantine/core'
import { IconSettings } from '@tabler/icons-react'
import { useRef, memo } from 'react'

import { useDisclosure } from '@mantine/hooks'
// import { useChatStore } from '@/stores/ChatStore'
// import { update } from '@/stores/ChatAction'

import { useSettingStore } from '@/stores/SettingStore'
import { updateOpenAIConfig } from '@/stores/SettingAction'
import { UIFormTextInput } from '@/components/UIFormTextInput'
import { keepDecimal } from '@/utils'

const useStyles = createStyles((theme) => ({
  boxContainer: {
    padding: theme.spacing.xs,
  },
  boxTitle: {
    paddingBottom: theme.spacing.xs,
  },
}))

export const UtilsContainer = memo(() => {
  const selectEl = useRef<HTMLInputElement>(null)
  const inputEl = useRef<HTMLInputElement>(null)
  const { classes, theme } = useStyles()
  const [opened, { open, close }] = useDisclosure(false)

  const openAIKey = useSettingStore((state) => state.openAI.key)
  const setOpenAIKey = (newState: string) => {
    updateOpenAIConfig({ key: newState })
  }

  const openAIModels = useSettingStore((state) => state.openAI.models)

  const openAITargetModels = useSettingStore(
    (state) => state.openAI.config.model,
  )
  const setOpenAITargetModels = (newState: string) => {
    updateOpenAIConfig({ model: newState })
  }

  const temperature = useSettingStore(
    (state) => state.openAI.config.temperature,
  )
  const setTemperature = (newState: number) => {
    updateOpenAIConfig({ temperature: keepDecimal(newState, 1) })
  }

  const max_tokens = useSettingStore((state) => state.openAI.config.max_tokens)
  const setMax_tokens = (newState: string) => {
    updateOpenAIConfig({ max_tokens: Number(newState) })
  }

  const presence_penalty = useSettingStore(
    (state) => state.openAI.config.presence_penalty,
  )
  const setPresence_penalty = (newState: number) => {
    updateOpenAIConfig({ presence_penalty: keepDecimal(newState, 1) })
  }

  return (
    <>
      <Drawer opened={opened} onClose={close} size="lg">
        <Box className={classes.boxContainer}>
          <Title className={classes.boxTitle} order={4}>
            Open AI Config
          </Title>
          <Box
            sx={{
              padding: theme.spacing.xs,
            }}
          >
            {/* OPEN AI KEY */}
            <UIFormTextInput
              onChecked={() => {
                console.log(inputEl.current?.value)
              }}
              label="OpenAI Key"
            >
              <TextInput
                ref={inputEl}
                size="xs"
                sx={{ width: '100%' }}
                onChange={(e) => setOpenAIKey(e.target.value)}
                placeholder="sk-xxxxxxx-xxxxx-xxx-xxxxx"
                value={openAIKey || ''}
              />
            </UIFormTextInput>

            <UIFormTextInput label="OpenAI Models">
              <Select
                ref={selectEl}
                size="xs"
                searchable
                sx={{ width: '100%' }}
                onSearchChange={() => {
                  setOpenAITargetModels(selectEl.current?.value || '')
                }}
                defaultValue={openAITargetModels}
                nothingFound="No options"
                data={openAIModels}
              />
            </UIFormTextInput>

            <UIFormTextInput label="OpenAI Max Tokens">
              <NumberInput
                max={5000}
                min={500}
                size="xs"
                sx={{ width: '100%' }}
                onBlur={(e: any) => {
                  setMax_tokens(e.target.value)
                }}
                defaultValue={max_tokens}
              />
            </UIFormTextInput>

            <UIFormTextInput label="OpenAI Temperature">
              <Slider
                size="xs"
                radius="xs"
                min={0}
                max={2}
                label={(value) => value.toFixed(1)}
                step={0.1}
                defaultValue={temperature}
                showLabelOnHover={false}
                labelAlwaysOn={false}
                onChangeEnd={setTemperature}
                sx={{ width: '100px' }}
              />
              <Text
                size="xs"
                sx={{ paddingLeft: theme.spacing.lg, width: '50px' }}
              >
                {temperature}
              </Text>
            </UIFormTextInput>

            <UIFormTextInput label="OpenAI Presence Penalty">
              <Slider
                size="xs"
                radius="xs"
                min={-2}
                max={2}
                label={(value) => value.toFixed(1)}
                step={0.1}
                onChangeEnd={(value) => {
                  setPresence_penalty(value)
                }}
                defaultValue={presence_penalty}
                showLabelOnHover={false}
                labelAlwaysOn={false}
                sx={{ width: '100px' }}
              />
              <Text
                size="xs"
                sx={{ paddingLeft: theme.spacing.lg, width: '50px' }}
              >
                {presence_penalty}
              </Text>
            </UIFormTextInput>
          </Box>
        </Box>

        <Divider />
      </Drawer>

      <Button
        onClick={open}
        sx={{ width: '100%' }}
        color="gray"
        leftIcon={<IconSettings />}
        variant="subtle"
      >
        <Text>Settings</Text>
      </Button>
    </>
  )
})
