import { changeActionChat } from '@/stores/ChatAction';
import { Chat, Message, useChatStore } from '@/stores/ChatStore';
import { Menu, Box, Flex, Group, Input, Text, Title, createStyles } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconShare, IconMarkdown, IconPng } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useRef } from 'react';
import { UIModal, UIButton, UIActionButton } from '@/components/Common';
import i18n from '@/i18n';
import { downloadAsCapture, downloadAsMarkdown } from '@/utils/download';

const useStyles = createStyles((theme) => ({
	titleContainer: {
		border: '0.1rem solid #5C6077',
		borderWidth: `0 0 0.1rem 0`,
		// position: 'absolute',
		// top: 0,
		// left: 0,
		right: theme.spacing.md,
		// boxShadow: theme.colorScheme === 'dark' ? `1px 10px 50px ${theme.colors.dark[8]}` : `0`,
		// background: theme.colorScheme === 'dark' ? theme.colors.gradient[2] : theme.colors.light[0],
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.dark[9],
		padding: `5px ${theme.spacing.md}`,
	},

	changeTitleInput: {
		width: '100%',
		[`& .mantine-Input-input`]: {
			flex: 1,
			border: `none`,
			backgroundColor: 'transparent',
		},
	},
}));

interface ChatTitlesContainerUIProps {
	message: Message[];
	chat: Chat;
	share?: boolean;
}

export function ChatTitlesContainer(props: ChatTitlesContainerUIProps) {
	const { message, chat, share = false } = props;
	const { classes } = useStyles();
	const inputValue = useRef<string>('');
	const [opened, { open, close }] = useDisclosure(false);

	const download = (type: 'png' | 'md') => {
		console.log('message download', type, !!message.length);
		if (!message.length) {
			return;
		}

		const time = dayjs(chat.created_at).format('YYYY/MM/DD HH:mm:ss');

		if (type === 'png') {
			downloadAsCapture(`${chat.title}-${time}.png`, {
				title: chat.title,
				time,
			});
		} else {
			console.log('downloadAsMarkdown');
			downloadAsMarkdown(message, `${chat.title}-${time}.md`);
		}
	};

	return (
		<>
			<Group position="apart" className={classes.titleContainer}>
				<Box>
					<Title order={5}>{chat.title}</Title>
					<Text fz="xs">{dayjs(chat.created_at).format('YYYY/MM/DD HH:mm:ss')}</Text>
				</Box>

				<Group sx={{ position: 'relative' }}>
					<ShareChatHistory download={download} share={share} />
					{!share && (
						<UIActionButton onClick={open}>
							<IconEdit />
						</UIActionButton>
					)}
				</Group>
			</Group>

			<UIModal
				opened={opened}
				onClose={close}
				container={
					<>
						<Title
							order={5}
							sx={(theme) => ({
								padding: `${theme.spacing.xs} 0 `,
							})}
						>
							{i18n.changeTitle}
						</Title>
					</>
				}
			>
				<Flex
					gap={10}
					sx={() => ({
						width: '100%',
					})}
				>
					<Input
						className={classes.changeTitleInput}
						defaultValue={chat.title}
						placeholder={i18n.changeTitlePlaceholder}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							inputValue.current = e.target.value;
						}}
					/>

					<UIButton
						onClick={() => {
							changeActionChat(chat.id, {
								title: inputValue.current,
							});
							close();
						}}
					>
						{i18n.confirm}
					</UIButton>
				</Flex>
			</UIModal>
		</>
	);
}

function ShareChatHistory({
	download,
	share,
}: {
	download: (type: 'png' | 'md') => void;
	share: boolean;
}) {
	return (
		<Menu trigger="hover" shadow="md" width={200}>
			<Menu.Target>
				<UIActionButton>
					<IconShare />
				</UIActionButton>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Label>Download Content</Menu.Label>
				<Menu.Item
					onClick={() => {
						download('md');
					}}
					icon={<IconMarkdown size={14} />}
				>
					Markdown
				</Menu.Item>

				<Menu.Item
					onClick={() => {
						download('png');
					}}
					icon={<IconPng size={14} />}
				>
					Picture
				</Menu.Item>

				{!share && (
					<>
						<Menu.Label>Share</Menu.Label>
						<Menu.Item icon={<IconShare size={14} />}>Share Link</Menu.Item>
					</>
				)}
			</Menu.Dropdown>
		</Menu>
	);
}
