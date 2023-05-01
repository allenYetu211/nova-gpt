/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-20 00:19:37
 * @LastEditTime: 2023-05-01 13:14:47
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/ChatContent.tsx
 */

import { useChatStore } from '@/stores/ChatStore';
import { createStyles } from '@mantine/core';
import { memo, useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatQuestionFloat } from './ChatQuestionFloat';

const useStyles = createStyles((theme) => ({
	container: {
		paddingBottom: theme.spacing.md,
		flex: 1,
		overflow: 'auto',
		marginRight: `-${theme.spacing.md}`,
		paddingRight: theme.spacing.md,
		position: 'relative',
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
	const isScroll = useRef<boolean>(false);

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

	const onMouseUp = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		const x_up = event.clientX;
		const y_up = event.clientY;
		// @ts-ignore
		chatElRef.current!.onSelectedPosition(containerRef.current!.scrollTop + y_up, x_up);
	};

	return (
		<div className={classes.container} ref={containerRef}>
			<ChatQuestionFloat ref={chatElRef} />
			<div className="allow-select-region" onMouseUp={onMouseUp} ref={contentRef}>
				{activeChat &&
					activeChat.message.map((item) => {
						return <ChatMessage key={item.id} message={item} />;
					})}
			</div>
		</div>
	);
});
