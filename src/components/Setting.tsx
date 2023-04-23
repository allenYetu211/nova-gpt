/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-23 22:05:39
 * @LastEditTime: 2023-04-24 00:31:54
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/components/Setting.tsx
 */
import {
  Box,
  Text,
  createStyles,
  Flex,
  Divider,
  TextInput,
  NumberInput,
  Slider,
  Select,
} from '@mantine/core'
import { useSettingStore } from '@/stores/SettingStore'
import { updateOpenAIConfig } from '@/stores/SettingAction'
import { keepDecimal } from '@/utils'
import { useRef } from 'react'

export const useStyles = createStyles((theme) => ({
  settingItem: {
    background: theme.colorScheme === 'dark' ? '#2c3453' : '#fff',
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
    margin: `${theme.spacing.md} 0 ${theme.spacing.md} 0`,
    [`& > .item`]: {
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[2]
      }`,
    },
  },
}))

export const Setting = () => {
  const { classes, cx } = useStyles()
  return (
    <>
      <Text ta="left" fz="xl" fw={700}>
        Setting
      </Text>

      <Box w="80%" sx={{ margin: '0 auto' }}>
        <Text fz="md" fw={500}>
          Open AI
        </Text>
        <Box className={classes.settingItem}>
          <OpenAIConfig />
        </Box>
      </Box>
    </>
  )
}

const OpenAIConfig = () => {
  const selectEl = useRef<HTMLInputElement>(null)
  const max_tokens = useSettingStore((state) => state.openAI.config.max_tokens)
  const key = useSettingStore((state) => state.openAI.key)
  const models = useSettingStore((state) => state.openAI.models)
  const currentModels = useSettingStore((state) => state.openAI.config.model)
  const presence_penalty = useSettingStore(
    (state) => state.openAI.config.presence_penalty,
  )
  const temperature = useSettingStore(
    (state) => state.openAI.config.temperature,
  )

  const config = [
    {
      name: 'key',
      introduction: 'Open AI API key',
      template: (
        <TextInput
          value={key}
          size="xs"
          sx={{ width: '100%' }}
          onChange={(e) => updateOpenAIConfig({ key: e.currentTarget.value })}
          placeholder="sk-xxxxxxx-xxxxx-xxx-xxxxx"
        />
      ),
    },
    {
      name: 'max_tokens',
      introduction: '单次交互所用的最大 Token 数',
      template: (
        <NumberInput
          max={2048}
          min={100}
          size="xs"
          sx={{ width: '100%' }}
          onBlur={(e) =>
            updateOpenAIConfig({ max_tokens: Number(e.currentTarget.value) })
          }
          defaultValue={max_tokens}
        />
      ),
    },
    {
      name: 'temperature',
      introduction: '回答随随机性 |  取值范围建议：0.7~ 1.0',
      template: (
        <Flex justify="flex-end" align="center">
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
            onChangeEnd={(value) => {
              updateOpenAIConfig({ temperature: keepDecimal(value, 1) })
            }}
            sx={{ width: '100px' }}
          />

          <Text
            size="xs"
            sx={(theme) => ({
              paddingLeft: theme.spacing.lg,
              width: '50px',
            })}
          >
            {temperature}
          </Text>
        </Flex>
      ),
    },
    {
      name: 'presence_penalty',
      introduction: 'GPT 惩罚机制 |  取值范围建议：0.9~ 1.2',
      template: (
        <Flex justify="flex-end" align="center">
          <Slider
            size="xs"
            radius="xs"
            min={-2}
            max={2}
            label={(value) => value.toFixed(1)}
            step={0.1}
            onChangeEnd={(value) => {
              updateOpenAIConfig({ presence_penalty: keepDecimal(value, 1) })
            }}
            defaultValue={presence_penalty}
            showLabelOnHover={false}
            labelAlwaysOn={false}
            sx={{ width: '100px' }}
          />
          <Text
            size="xs"
            sx={(theme) => ({
              paddingLeft: theme.spacing.lg,
              width: '50px',
            })}
          >
            {presence_penalty}
          </Text>
        </Flex>
      ),
    },
    {
      name: 'models',
      introduction: '选择模型',
      template: (
        <Select
          ref={selectEl}
          size="xs"
          searchable
          sx={{ width: '100%' }}
          onSearchChange={(value) => {
            updateOpenAIConfig({ model: value })
          }}
          defaultValue={currentModels}
          nothingFound="No options"
          data={models}
        />
      ),
    },
  ]
  return (
    <>
      {config.map((item, index) => {
        return (
          <>
            <Flex justify="space-between" align="center" key={index}>
              <Box>
                <Text fz="md" fw={500}>
                  {item.name}
                </Text>

                <Text fz="xs" fw={300}>
                  {item.introduction}
                </Text>
              </Box>
              <Box>{item.template}</Box>
            </Flex>
            {index !== config.length - 1 && (
              <Divider my="sm" variant="dashed" />
            )}
          </>
        )
      })}
    </>
  )
}
