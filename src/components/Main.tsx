/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-14 12:08:23
 * @LastEditTime: 2023-05-08 23:36:31
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/Main.tsx
 */
import { ChatContent } from '@/components/ChatContent';
import { ChatTextarea } from '@/components/ChatContent/ChatTextareaContainer';
import { Box, MantineTheme, createStyles } from '@mantine/core';
import { Setting } from './Setting';
import { EmptyChats } from './Empty';
import { useChatStore } from '@/stores/ChatStore';

import { ChatTitlesContainer } from '@/components/ChatContent/ChatTitle';

const useStyles = createStyles((theme: MantineTheme) => {
	return {
		mainContainer: {
			display: 'flex',
			flexDirection: 'column',
			height: '100%',
		},
		chatTextareaContainer: {},
	};
});

export function Main() {
	const { cl, activeChatId, activeChat } = useChatStore((state) => ({
		cl: state.chats.length,
		activeChatId: state.activeChatId,
		activeChat: state.chats.find((item) => item.id === state.activeChatId),
	}));

	const { classes } = useStyles();

	return (
		<>
			<Setting />
			<div className={classes.mainContainer}>
				{!cl ? (
					<EmptyChats />
				) : (
					<>
						{activeChat && <ChatTitlesContainer message={activeChat?.message} chat={activeChat} />}
						<ChatContent />
						<Box
							sx={{
								padding: `0 calc(var(--mantine-footer-height, 0px) + 2rem) calc(var(--mantine-footer-height, 0px) + 3rem)`,
							}}
						>
							<ChatTextarea />
						</Box>
					</>
				)}
			</div>
		</>
	);
}
