/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-23 22:05:39
 * @LastEditTime: 2023-05-02 11:18:45
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/Setting.tsx
 */
import {
	switchIsSetting,
	updateAccessToken,
	updateOpenAIConfig,
	updateOpenAIHistory,
	updateOpenAIKey,
	updateLanguage,
} from '@/stores/SettingAction';
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
import { Fragment, useRef } from 'react';

export const useStyles = createStyles((theme) => ({
	settingItem: {
		background: theme.colorScheme === 'dark' ? '#2c3453' : '#fff',
		padding: theme.spacing.md,
		borderRadius: theme.radius.md,
		boxShadow: theme.shadows.md,
		margin: `${theme.spacing.md} 0 ${theme.spacing.md} 0`,
		[`& > .item`]: {
			borderBottom: `1px solid ${
				theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
			}`,
		},
		[`.mantine-Slider-bar`]: {
			background: theme.colors.gradient[3],
		},
	},
}));

export const Setting = () => {
	const isSetting = useSettingStore((state) => state.isSetting);

	return (
		<Box
			sx={(theme) => ({
				position: 'absolute',
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				zIndex: 1000,
				padding: theme.spacing.md,
				background: theme.colors.gradient[0],
				transition: 'all 0.3s ease',
				opacity: isSetting ? 1 : 0,
				pointerEvents: isSetting ? 'all' : 'none',
			})}
		>
			<Flex
				justify="space-between"
				align="center"
				sx={(theme) => ({ margin: `${theme.spacing.xl} 0` })}
			>
				<Text ta="left" fz="xl" fw={700}>
					{/* Setting */}
				</Text>

				<ActionIcon onClick={switchIsSetting}>
					<IconX />
				</ActionIcon>
			</Flex>

			<Box
				sx={(theme) => ({
					margin: '0 auto',
					width: '40%',
					[`@media (max-width: ${theme.breakpoints.sm})`]: {
						width: '100%',
					},
				})}
			>
				<Config />
			</Box>
		</Box>
	);
};

const Config = () => {
	const { classes, cx } = useStyles();
	const max_tokens = useSettingStore((state) => state.openAI.config.max_tokens);
	const key = useSettingStore((state) => state.openAI.key);
	const models = useSettingStore((state) => state.openAI.models);
	const history = useSettingStore((state) => state.openAI.history);
	const currentModels = useSettingStore((state) => state.openAI.config.model);
	const presence_penalty = useSettingStore((state) => state.openAI.config.presence_penalty);
	const temperature = useSettingStore((state) => state.openAI.config.temperature);
	const accessToken = useSettingStore((state) => state.accessToken);

	const language = useSettingStore((state) => state.language);
	const languages = useSettingStore((state) => state.languages);

	const config = {
		'Open AI': [
			{
				name: 'key',
				introduction: 'Open AI API key',
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
				name: 'max_tokens',
				introduction: '单次交互所用的最大 Token 数',
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
				name: 'models',
				introduction: '选择模型',
				template: (
					<Select
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
				name: 'history',
				introduction: '携带最大历史信息',
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
				name: 'Token',
				introduction: 'Nova Access Token',
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
				name: 'language',
				introduction: '选择语言',
				template: (
					<Select
						size="xs"
						sx={{ width: '100%' }}
						onSearchChange={(value: Language) => {
							updateLanguage(value);
						}}
						defaultValue={language}
						nothingFound="No options"
						data={languages}
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
