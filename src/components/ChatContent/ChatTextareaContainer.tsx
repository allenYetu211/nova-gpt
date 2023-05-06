/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-14 16:09:48
 * @LastEditTime: 2023-05-06 18:24:14
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/ChatContent/ChatTextareaContainer.tsx
 */

import { ActionIcon, Box, Flex, Group, Menu, Switch, createStyles } from '@mantine/core';

import { ChatTextareaInput } from '@/components/ChatContent/ChatTextareaInput';
import { UICard } from '@/components/Common/UICard';
import i18n from '@/i18n';
import { InstallExtension } from '@/models/InstallExtension';
import { update } from '@/stores/ChatAction';
import { useChatStore } from '@/stores/ChatStore';
import { switchColorScheme, updateOpenAIConfig } from '@/stores/SettingAction';
import { useSettingStore } from '@/stores/SettingStore';
import { userMessage } from '@/stores/SubmitAction';

import {
	IconCheck,
	IconDotsVertical,
	IconMicrophone,
	IconMicrophoneOff,
	IconMoonStars,
	IconSend,
	IconSun,
} from '@tabler/icons-react';
import { Fragment, useEffect, useRef } from 'react';
import { UIButton } from '@/components/Common';

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
		marginLeft: theme.spacing.xs,
		borderRadius: theme.radius.xl,
		backgroundColor: theme.colors.darkButton[0],
		boxShadow: theme.colors.darkButton[0],
	},
	iconItem: {
		margin: `4px`,
	},
	menu: {
		border: 'none',
	},
	// send: {

	// },
}));

export function ChatTextarea() {
	const { classes, theme } = useStyles();
	const tcr = useRef<InstallExtension>();
	const textareaMessage = useChatStore((state) => state.textareaMessage);
	const isRecording = useChatStore((state) => state.isRecording);
	const colorScheme = useSettingStore((state) => state.colorScheme);

	useEffect(() => {
		if (!tcr.current) {
			tcr.current = new InstallExtension();
			addListen();
		}
	}, []);

	const addListen = () => {
		InstallExtension.emitter.on('ResultChange', (text: string) => {
			// useChatStore.setState({ textareaMessage: text });
			update({ textareaMessage: text });
		});
	};

	const startRecord = async () => {
		await tcr.current?.startRecord();
		update({ textareaMessage: '', isRecording: true });
	};

	const stopRecord = async () => {
		await tcr.current?.stopRecord();
		update({ isRecording: false });
	};

	const onChangeText = (text: string) => {
		update({ textareaMessage: text });
	};

	return (
		<>
			<UICard
				container={
					<Flex justify="space-between" align="center" w="100%">
						<Group spacing="xs">
							<ActionIcon
								color="gray"
								size="lg"
								className={classes.iconItem}
								onClick={isRecording ? stopRecord : startRecord}
							>
								{isRecording ? (
									<IconMicrophone size="1.25rem" />
								) : (
									<IconMicrophoneOff size="1.25rem" />
								)}
							</ActionIcon>
							<SettingMenu />
						</Group>

						<Group position="center">
							<Switch
								checked={colorScheme === 'light' ? true : false}
								onChange={(event) => {
									switchColorScheme(event.currentTarget.checked ? 'light' : 'dark');
								}}
								color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
								onLabel={<IconSun size="1rem" stroke={2.5} color={theme.colors.yellow[4]} />}
								offLabel={<IconMoonStars size="1rem" stroke={2.5} color={theme.colors.dark[2]} />}
							/>
						</Group>
					</Flex>
				}
			>
				<Box
					sx={{
						position: 'relative',
					}}
				>
					<ChatTextareaInput
						message={textareaMessage}
						update={onChangeText}
						onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
							if (e.key !== 'Enter') return;
							if (e.ctrlKey && e.key === 'Enter') {
								userMessage();
							}
						}}
					/>
					<UIButton
						sx={{ position: 'absolute', right: theme.spacing.xs, bottom: theme.spacing.xs }}
						leftIcon={<IconSend size="1.25rem" />}
						fz={theme.fontSizes.xs}
						radius={theme.radius.xl}
						// variant="filled"
						onClick={userMessage}
					>
						{i18n.send}
					</UIButton>
				</Box>
			</UICard>
		</>
	);
}

const SettingMenu = () => {
	const { classes } = useStyles();
	const recordModel = useChatStore((state) => state.recordModel);
	const model = useSettingStore((state) => state.openAI.config.model);

	const MenuItems = [
		{
			label: 'Open AI',
			items: [
				{
					name: 'gpt-3.5-turbo',
					checked: model === 'gpt-3.5-turbo',
					onClick: () => {
						updateOpenAIConfig({ model: 'gpt-3.5-turbo' });
					},
				},
				{
					name: 'gpt-3.5-turbo-0301',
					checked: model === 'gpt-3.5-turbo-0301',
					onClick: () => {
						updateOpenAIConfig({ model: 'gpt-3.5-turbo-0301' });
					},
				},
				{
					name: 'gpt-4-32k-0314',
					checked: model === 'gpt-4-32k-0314',
					onClick: () => {
						updateOpenAIConfig({ model: 'gpt-4-32k-0314' });
					},
				},
				{
					name: 'gpt-4',
					checked: model === 'gpt-4',
					onClick: () => {
						updateOpenAIConfig({ model: 'gpt-4' });
					},
				},
			],
		},
		{
			label: 'Record',
			items: [
				{
					name: 'Tencet',
					checked: recordModel === 'Tencet',
				},
				{
					name: 'Aliyun',
					checked: recordModel === 'Aliyun',
					disabled: true,
				},
				{
					name: 'Local',
					checked: recordModel === 'Local',
					disabled: true,
				},
			],
		},
	];
	return (
		<Menu position="top" radius="lg" shadow="md" width={200}>
			<Menu.Target>
				<ActionIcon className={classes.iconItem} color="gray" size="1.25rem" onClick={userMessage}>
					<IconDotsVertical fontSize="xs" />
				</ActionIcon>
			</Menu.Target>

			<Menu.Dropdown>
				{MenuItems.map((menu, index) => (
					<Fragment key={index}>
						<Menu.Label>{menu.label}</Menu.Label>
						{menu.items.map((item, key) => (
							<MenuItem key={key} item={item} />
						))}
					</Fragment>
				))}
			</Menu.Dropdown>
		</Menu>
	);
};

const MenuItem = ({
	item,
}: {
	item: {
		name: string;
		checked: boolean;
		disabled?: boolean;
		onClick?: () => void;
	};
}) => {
	return (
		<Menu.Item
			onClick={item.onClick}
			disabled={item.disabled}
			icon={
				<IconCheck
					style={{
						visibility: item.checked ? 'visible' : 'hidden',
					}}
					size={14}
				/>
			}
		>
			{item.name}
		</Menu.Item>
	);
};
