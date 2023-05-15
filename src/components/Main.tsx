/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-14 12:08:23
 * @LastEditTime: 2023-05-15 11:18:29
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/Main.tsx
 */
import { ChatContent } from '@/components/ChatContent';
import { ChatTextarea } from '@/components/ChatContent/ChatTextareaContainer';
import { Box, MantineTheme, createStyles } from '@mantine/core';
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
	const { chatsLength, activeChat } = useChatStore((state) => ({
		chatsLength: state.chats.length,
		activeChat: state.chats.find((item) => item.id === state.activeChatId),
	}));

	const { classes } = useStyles();

	return (
		<div className={classes.mainContainer}>
			{!chatsLength ? (
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
	);
}
