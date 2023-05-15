/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-23 22:05:39
 * @LastEditTime: 2023-05-15 11:25:43
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/Common/Setting.tsx
 */
import {
	// switchIsSetting,
	updateAccessToken,
	updateOpenAIConfig,
	updateOpenAIHistory,
	updateOpenAIKey,
	updateLanguage,
	updateSupabase,
} from '@/stores/SettingAction';

import { modal } from '@/components/Common';

import { useSettingStore, Language } from '@/stores/SettingStore';
import { keepDecimal } from '@/utils';
import {
	ActionIcon,
	Box,
	Divider,
	Flex,
	Input,
	NumberInput,
	Select,
	Slider,
	Text,
	createStyles,
} from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { Fragment } from 'react';
import i18n from '@/i18n';
import { UISelect } from '@/components/Common/UISelect';

export const useStyles = createStyles((theme) => ({
	settingItem: {
		background:
			theme.colorScheme === 'dark'
				? theme.colors.dark_background[0]
				: theme.colors.light_background[1],
		padding: theme.spacing.md,
		borderRadius: theme.radius.md,
		boxShadow: theme.shadows.md,
		margin: `${theme.spacing.md} 0 ${theme.spacing.md} 0`,
		[`& > .item`]: {
			borderBottom: `1px solid ${
				theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.light[2]
			}`,
		},
		[`.mantine-Slider-bar`]: {
			background: theme.colorScheme === 'dark' ? theme.colors.gradient[3] : theme.colors.light[2],
		},
		[`.mantine-Slider-thumb`]: {
			borderColor: theme.colors.light[3],
		},
	},
}));

export const openSettingModal = () => {
	modal.open({
		title: 'Setting',
		children: <Setting />,
		size: 'xl',
	});
};

const Setting = () => {
	const { classes } = useStyles();
	const max_tokens = useSettingStore((state) => state.openAI.config.max_tokens);
	const key = useSettingStore((state) => state.openAI.key);
	const models = useSettingStore((state) => state.openAI.models);
	const history = useSettingStore((state) => state.openAI.history);
	const currentModels = useSettingStore((state) => state.openAI.config.model);
	const presence_penalty = useSettingStore((state) => state.openAI.config.presence_penalty);
	const temperature = useSettingStore((state) => state.openAI.config.temperature);
	const accessToken = useSettingStore((state) => state.accessToken);

	const supabase = useSettingStore((state) => state.supabase);

	const language = useSettingStore((state) => state.language);
	const languages = useSettingStore((state) => state.languages);

	const config = {
		'Open AI': [
			{
				name: i18n.setting.openai.key.title,
				introduction: i18n.setting.openai.key.introduction,
				template: (
					<Input
						value={key}
						size="xs"
						sx={{ width: '100%' }}
						onChange={(e) => {
							updateOpenAIKey(e.target.value);
						}}
						placeholder="sk-xxxxxxx-xxxxx-xxx-xxxxx"
					/>
				),
			},
			{
				name: i18n.setting.openai.tokens.title,
				introduction: i18n.setting.openai.tokens.introduction,
				template: (
					<NumberInput
						max={2048}
						min={100}
						size="xs"
						sx={{ width: '100%' }}
						onBlur={(e) => updateOpenAIConfig({ max_tokens: Number(e.currentTarget.value) })}
						defaultValue={max_tokens}
					/>
				),
			},
			{
				name: i18n.setting.openai.temperature.title,
				introduction: i18n.setting.openai.temperature.introduction,
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
							// style={(theme) => ({
							//   background: theme.colors.gradient[3],
							// })}
							onChangeEnd={(value) => {
								updateOpenAIConfig({ temperature: keepDecimal(value, 1) });
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
				name: i18n.setting.openai.presence_penalty.title,
				introduction: i18n.setting.openai.presence_penalty.introduction,
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
								updateOpenAIConfig({ presence_penalty: keepDecimal(value, 1) });
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
				name: i18n.setting.openai.models.title,
				introduction: i18n.setting.openai.models.title,
				template: (
					<UISelect
						size="xs"
						sx={{ width: '100%' }}
						onSearchChange={(value) => {
							updateOpenAIConfig({ model: value });
						}}
						defaultValue={currentModels}
						nothingFound="No options"
						data={models}
					/>
				),
			},
			{
				name: i18n.setting.openai.history.title,
				introduction: i18n.setting.openai.history.introduction,
				template: (
					<Flex justify="flex-end" align="center">
						<Slider
							size="xs"
							radius="xs"
							min={0}
							max={20}
							label={(value) => value.toFixed(0)}
							step={1}
							onChangeEnd={(value) => {
								updateOpenAIHistory(keepDecimal(value, 1));
							}}
							defaultValue={history}
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
							{history}
						</Text>
					</Flex>
				),
			},
		],
		'Access Token': [
			{
				name: i18n.setting.access.token.title,
				introduction: i18n.setting.access.token.introduction,
				template: (
					<Input
						value={accessToken}
						size="xs"
						sx={{ width: '100%' }}
						onChange={(e) => {
							updateAccessToken(e.target.value);
						}}
						placeholder="NOVA-xxx"
					/>
				),
			},
		],
		'System Setting': [
			{
				name: i18n.setting.system.language.title,
				introduction: i18n.setting.system.language.introduction,
				template: (
					<UISelect
						size="xs"
						sx={{ width: '100%' }}
						onSearchChange={(value: Language) => {
							if (language !== value) {
								updateLanguage(value);
								window.location.reload();
							}
						}}
						defaultValue={language}
						nothingFound="No options"
						data={languages}
					/>
				),
			},
		],

		'Supabase Setting': [
			{
				name: i18n.setting.supabase.url.title,
				introduction: i18n.setting.supabase.url.introduction,
				template: (
					<Input
						value={supabase.url}
						size="xs"
						sx={{ width: '100%' }}
						onChange={(e) => {
							updateSupabase({ url: e.target.value });
						}}
						placeholder="https://xxxxxx.supabase.co"
					/>
				),
			},
			{
				name: i18n.setting.supabase.token.title,
				introduction: i18n.setting.supabase.token.introduction,
				template: (
					<Input
						value={supabase.token}
						size="xs"
						sx={{ width: '100%' }}
						onChange={(e) => {
							updateSupabase({ token: e.target.value });
						}}
						placeholder="xxx.xxx.xxx"
					/>
				),
			},
		],
	};
	return (
		<>
			{Object.entries(config).map(([key, config]) => (
				<Fragment key={key}>
					<Text fz="md" fw={500}>
						{key}
					</Text>
					<Box className={classes.settingItem}>
						{config.map((item, index) => {
							return (
								<Fragment key={index}>
									<Flex justify="space-between" align="center">
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
									{index !== config.length - 1 && <Divider my="sm" variant="dashed" />}
								</Fragment>
							);
						})}
					</Box>
				</Fragment>
			))}
		</>
	);
};
