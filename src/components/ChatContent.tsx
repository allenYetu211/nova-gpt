/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-20 00:19:37
 * @LastEditTime: 2023-05-02 22:10:04
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/ChatContent.tsx
 */

import { changeChatTitle } from '@/stores/ChatAction';
import { useChatStore } from '@/stores/ChatStore';
import {
	ActionIcon,
	Box,
	Button,
	Flex,
	Group,
	Input,
	Modal,
	Text,
	Title,
	createStyles,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { memo, useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatQuestionFloat } from './ChatQuestionFloat';

const useStyles = createStyles((theme) => ({
	container: {
		paddingTop: '3rem',
		paddingBottom: theme.spacing.md,
		paddingRight: theme.spacing.md,
		flex: 1,
		overflow: 'auto',
		marginRight: `-${theme.spacing.md}`,
		position: 'relative',
	},
	titleContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: theme.spacing.md,
		borderRadius: theme.radius.md,
		boxShadow: `1px 2px 25px ${theme.colors.dark[9]}`,
		background: theme.colorScheme === 'dark' ? theme.colors.gradient[4] : theme.colors.light[0],
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.dark[9],
		padding: `3px ${theme.spacing.md}`,
	},
}));

export const ChatContent = memo(() => {
	const { classes } = useStyles();
	const activeChatId = useChatStore((state) => state.activeChatId);
	const chats = useChatStore((state) => state.chats);
	const activeChat = chats.find((item) => item.id === activeChatId);
	const contentRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const lastMessage = activeChat?.message[activeChat?.message.length - 1];
	const prevHeight = useRef<number>(0);
	const chatElRef = useRef(null);
	const inputValue = useRef<string>('');
	const isScroll = useRef<boolean>(false);
	const [opened, { open, close }] = useDisclosure(false);

	useEffect(() => {
		isScroll.current = true;
	}, [lastMessage]);

	useEffect(() => {
		const currHeight = contentRef.current?.getBoundingClientRect().height || 0;
		if (currHeight > prevHeight.current) {
			prevHeight.current = currHeight;
			updateScroll();
		}
	}, [lastMessage?.content]);

	const updateScroll = () => {
		if (!isScroll.current) {
			return;
		}
		const height = contentRef.current?.getBoundingClientRect().height;
		containerRef.current!.scrollTop = height!;
	};

	const onMouseUp = (event: React.MouseEvent<HTMLElement, MouseEvent>, id: string) => {
		const x_up = event.clientX;
		const y_up = event.clientY;
		// @ts-ignore
		chatElRef.current!.onSelectedPosition(containerRef.current!.scrollTop + y_up, x_up, id);
	};

	return (
		<div className={classes.container} ref={containerRef}>
			<ChatQuestionFloat ref={chatElRef} />

			<Box className={classes.titleContainer}>
				<Title order={5}>
					<Group>
						<span>{activeChat?.title}</span>

						<ActionIcon size="xs" onClick={open}>
							<IconEdit size="0.75rem" />
						</ActionIcon>
					</Group>
				</Title>
				<Text fz="xs">{dayjs(activeChat!.createdAt).format('YYYY/MM/DD HH:mm:ss')}</Text>
			</Box>

			<Modal opened={opened} onClose={close} title="Change Title">
				<Flex gap={10}>
					<Input
						sx={{ flex: 1 }}
						defaultValue={activeChat!.title}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							inputValue.current = e.target.value;
						}}
					/>
					<Button
						onClick={() => {
							changeChatTitle(activeChat!.id, inputValue.current);
							close();
						}}
					>
						确认
					</Button>
				</Flex>
			</Modal>

			<div className="allow-select-region" ref={contentRef}>
				{activeChat &&
					activeChat.message.map((item) => {
						if (item.hide) {
							return null;
						}
						return <ChatMessage onMouseUp={onMouseUp} key={item.id} message={item} />;
					})}
			</div>
		</div>
	);
});
