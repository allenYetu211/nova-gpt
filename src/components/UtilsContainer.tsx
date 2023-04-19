/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-18 16:50:34
 * @LastEditTime: 2023-04-19 17:01:35
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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useChatStore } from '@/stores/ChatStore';
import { update } from '@/stores/ChatAction';
import { UIFormTextInput } from '@/components/UIFormTextInput';
// import { fetchModels } from '@/Fetch/OpenAI'

import {
  IconSettings
} from '@tabler/icons-react';

import { useRef } from 'react';


const useStyles = createStyles((theme) => ({
  boxContainer: {
    padding: theme.spacing.xs
  },
  boxTitle: {
    paddingBottom: theme.spacing.xs,
  }
}));

export const UtilsContainer = () => {
  const selectEl = useRef<HTMLSelectElement>(null);
  const inputEl = useRef<HTMLInputElement>(null);
  const { classes, theme } = useStyles();

  const [opened, { open, close }] = useDisclosure(false);


  const openAIKey = useChatStore((state) => state.openAIKey);
  const setOpenAIKey = (newState: string) => { update({ openAIKey: newState }) };

  const openAIModels = useChatStore((state) => state.openAIModels);
  const setOpenAITargetModels = (newState: string) => { update({ openAITargetModels: newState }) };

  const openAI_temperature = useChatStore((state) => state.openAI_temperature);
  const setOpenAI_temperature = (newState: number) => { update({ openAI_temperature: Math.round(newState * 10) / 10 }) };

  const openAI_max_tokens = useChatStore((state) => state.openAI_max_tokens);
  const setOpenAI_max_tokens = (newState: number) => { update({ openAI_max_tokens: Math.round(newState * 10) / 10 }) };

  const openAI_presence_penaltyn = useChatStore((state) => state.openAI_presence_penaltyn);
  const setOpenAI_presence_penaltyn = (newState: number) => { update({ openAI_presence_penaltyn: Math.round(newState * 10) / 10 }) };


  return (

    <>
      <Drawer
        opened={opened}
        onClose={close}
        size='lg'
      >
        <Box
          className={classes.boxContainer}
        >
          <Title
            className={classes.boxTitle}
            order={4}>Open AI Config</Title>
          <Box sx={{
            padding: theme.spacing.xs
          }} >

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
                placeholder='sk-xxxxxxx-xxxxx-xxx-xxxxx'
                defaultValue={openAIKey || ''}
              />
            </UIFormTextInput>


            <UIFormTextInput label="OpenAI Models" >
              <Select
                ref={selectEl}
                size="xs"
                searchable
                sx={{ width: '100%' }}
                defaultValue={openAIModels[0]}
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
                  setOpenAI_max_tokens(e.target.value)
                }}
                defaultValue={openAI_max_tokens}
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
                defaultValue={openAI_temperature}
                showLabelOnHover={false}
                labelAlwaysOn={false}
                onChangeEnd={setOpenAI_temperature}
                sx={{ width: '100px' }}
              />
              <Text size='xs' sx={{ paddingLeft: theme.spacing.lg, width: '50px' }}>{openAI_temperature}</Text>

            </UIFormTextInput>

            <UIFormTextInput label="OpenAI Presence Penaltyn">
              <Slider
                size="xs"
                radius="xs"
                min={-2}
                max={2}
                label={(value) => value.toFixed(1)}
                step={0.1}
                onChangeEnd={setOpenAI_presence_penaltyn}
                defaultValue={openAI_presence_penaltyn}
                showLabelOnHover={false}
                labelAlwaysOn={false}
                sx={{ width: '100px' }}
              />
              <Text size='xs' sx={{ paddingLeft: theme.spacing.lg, width: '50px' }}>{openAI_presence_penaltyn}</Text>

            </UIFormTextInput>
          </Box>
        </Box>

        <Divider />

      </Drawer >

      <Button
        onClick={open}
        sx={{ width: '100%' }}
        leftIcon={<IconSettings />}
        variant='subtle'
      >
        <Text>Settings</Text>
      </Button>

    </>
  )
}
