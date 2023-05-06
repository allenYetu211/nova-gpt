import { changeActionChat } from '@/stores/ChatAction';
import { useChatStore } from '@/stores/ChatStore';
import { ActionIcon, Box, Flex, Group, Input, Text, Title, createStyles } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useRef } from 'react';
import { UIModal, UIButton, UIActionButton } from '@/components/Common';
import i18n from '@/i18n';

const useStyles = createStyles((theme) => ({
	titleContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: theme.spacing.md,
		borderRadius: theme.radius.md,
		boxShadow: theme.colorScheme === 'dark' ? `1px 10px 50px ${theme.colors.dark[8]}` : `0`,
		background: theme.colorScheme === 'dark' ? theme.colors.gradient[2] : theme.colors.light[0],
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

export const ChatTitlesContainer = () => {
	const { classes } = useStyles();
	const activeChatId = useChatStore((state) => state.activeChatId);
	const chats = useChatStore((state) => state.chats);
	const activeChat = chats.find((item) => item.id === activeChatId);
	const inputValue = useRef<string>('');
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Group position="apart" className={classes.titleContainer}>
				<Box>
					<Title order={5}>{activeChat?.title}</Title>
					<Text fz="xs">{dayjs(activeChat!.createdAt).format('YYYY/MM/DD HH:mm:ss')}</Text>
				</Box>

				<Box>
					<UIActionButton onClick={open}>
						<IconEdit />
					</UIActionButton>
				</Box>
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
						defaultValue={activeChat!.title}
						placeholder={i18n.changeTitlePlaceholder}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							inputValue.current = e.target.value;
						}}
					/>

					<UIButton
						onClick={() => {
							changeActionChat(activeChat!.id, {
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
};
