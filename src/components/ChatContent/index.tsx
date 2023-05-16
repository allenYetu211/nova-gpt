/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-20 00:19:37
 * @LastEditTime: 2023-05-16 15:28:13
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/ChatContent/index.tsx
 */

import { useChatStore } from '@/stores/ChatStore';
import { Ref, memo, useEffect, useRef } from 'react';
import { ChatMessage } from '@/components/ChatContent/ChatMessage';
import { update, changeMessageState, deleteMessage } from '@/stores/ChatAction';
import { ChatQuestionFloat, RefCallbackFunc } from '@/components/ChatContent/ChatQuestionFloat';
import { Group, Text, createStyles } from '@mantine/core';
import { UIBadge } from '../Common';
import { copyToClipboard } from '@/utils';
import { notifications } from '@/components/Common';

const useStyles = createStyles((theme) => ({
	container: {
		padding: `0 calc(var(--mantine-footer-height, 0px) + 2rem) calc(var(--mantine-footer-height, 0px) + 3rem)`,
		[`@media (max-width: ${theme.breakpoints.sm})`]: {
			padding: `0  1rem`,
		},
		flex: 1,
		overflow: 'auto',
		position: 'relative',
	},
}));

export const ChatContent = memo(() => {
	const { classes, cx } = useStyles();
	const activeChatId = useChatStore((state) => state.activeChatId);
	const chats = useChatStore((state) => state.chats);
	const activeChat = chats.find((item) => item.id === activeChatId);
	const contentRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const lastMessage = activeChat?.message[activeChat?.message.length - 1];
	const prevHeight = useRef<number>(0);
	const chatElRef = useRef<Ref<RefCallbackFunc>>(null);
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

	const onMouseUp = (event: React.MouseEvent<HTMLElement, MouseEvent>, id: string) => {
		const x_up = event.clientX;
		const y_up = event.clientY;
		chatElRef.current &&
			// @ts-ignore
			chatElRef.current.onSelectedPosition(containerRef.current!.scrollTop + y_up - 40, x_up, id);
		event.stopPropagation();
	};

	return (
		<div className={classes.container} ref={containerRef}>
			<ChatQuestionFloat ref={chatElRef} updateScroll={updateScroll} />

			<div id="message-container" className={cx('allow-select-region')} ref={contentRef}>
				{activeChat &&
					activeChat.message.map((item) => {
						if (item.hide) {
							return null;
						}
						return (
							<ChatMessage
								system_avatar={activeChat.system_avatar}
								user_avatar={activeChat.user_avatar}
								avatar={activeChat.avatar}
								onMouseUp={onMouseUp}
								key={item.id}
								message={item}
							>
								<Group
									spacing="lg"
									sx={(theme) => ({
										marginBottom: theme.spacing.xs,
									})}
									position={item.role === 'user' ? 'right' : 'left'}
								>
									<UIBadge
										onClick={() => {
											changeMessageState(activeChatId, item.id, {
												preamble: !item.preamble || false,
											});
										}}
									>
										<Text fz="xs">{item.preamble ? '🌟 前置消息' : '➕ 添加前置消息'}</Text>
									</UIBadge>

									<UIBadge
										onClick={() => {
											update({ textareaMessage: item.content });
										}}
									>
										<Text fz="xs">🔁 重发</Text>
									</UIBadge>

                  <UIBadge
										onClick={() => {
											deleteMessage(item.id)
										}}
									>
										<Text fz="xs">🚮 删除</Text>
									</UIBadge>


									<UIBadge
										onClick={() => {
											copyToClipboard(item.content);
											notifications.show({
												message: '复制成功',
											});
										}}
									>
										<Text fz="xs">🏃🏼‍♀️ 复制</Text>
									</UIBadge>
								</Group>
							</ChatMessage>
						);
					})}
			</div>
		</div>
	);
});
