/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-14 12:08:23
 * @LastEditTime: 2023-05-05 09:48:13
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/Main.tsx
 */
import { ChatContent } from '@/components/ChatContent';
import { ChatTextarea } from '@/components/ChatContent/ChatTextareaContainer';
import { MantineTheme, createStyles } from '@mantine/core';
import { Setting } from './Setting';
import { EmptyChats } from './Empty';
import { useChatStore } from '@/stores/ChatStore';

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
	const notChats = useChatStore((state) => !state.chats.length);
	const { classes } = useStyles();

	return (
		<>
			<Setting />
			<div className={classes.mainContainer}>
				{notChats ? <EmptyChats /> : <ChatContent />}
				<ChatTextarea />
			</div>
		</>
	);
}
