/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-14 16:09:48
 * @LastEditTime: 2023-05-03 08:54:44
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/ChatTextareaContainer.tsx
 */

import { ActionIcon, Box, createStyles, Flex, Group, Menu, Button } from '@mantine/core';

import {
	IconMicrophone,
	IconMicrophoneOff,
	IconSend,
	IconDotsVertical,
	IconCheck,
} from '@tabler/icons-react';

import { useEffect, useRef, Fragment } from 'react';
import { InstallExtension } from '@/models/InstallExtension';
import { useChatStore } from '@/stores/ChatStore';
import { useSettingStore } from '@/stores/SettingStore';
import { updateOpenAIConfig } from '@/stores/SettingAction';
import { userMessage } from '@/stores/SubmitAction';
import { update } from '@/stores/ChatAction';
import { UICard } from '@/components/UICard';
import { ChatTextareaInput } from '@/components/ChatTextareaInput';

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
	send: {
		position: 'absolute',
		right: theme.spacing.xs,
		bottom: theme.spacing.xs,
		background: theme.colors.dark[6],
		color: theme.colors.dark[0],
	},
}));

export function ChatTextarea() {
	const { classes, theme } = useStyles();
	const tcr = useRef<InstallExtension>();
	const textareaMessage = useChatStore((state) => state.textareaMessage);
	const isRecording = useChatStore((state) => state.isRecording);

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
					<>
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
					</>
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
					<Button
						className={classes.send}
						leftIcon={<IconSend size="1.25rem" />}
						variant="white"
						fz={theme.fontSizes.xs}
						radius={theme.radius.xl}
					>
						Send
					</Button>
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
