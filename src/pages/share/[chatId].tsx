/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-07 16:45:14
 * @LastEditTime: 2023-05-08 17:53:54
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/pages/share/[chatId].tsx
 */
import { useEffect } from 'react';
import { ChatMessage } from '@/components/ChatContent/ChatMessage';
import { useRouter } from 'next/router';
import { setActiveChatId } from '@/stores/ChatAction';
import { supabase } from '@/lib/supabaseClient';
import { Message, Chat } from '@/stores/ChatStore';
import { ChatTitlesContainer } from '@/components/ChatContent/ChatTitle';
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
	container: {
		width: '80%',
		margin: '0 auto',
		minHeight: '100vh',
		position: 'relative',
		padding: '3rem 0',
	},
}));

const ShareChat = (props: { message: Message[]; chat: Chat[] }) => {
	const router = useRouter();
	const activeChatId = router.query.chatId as string | undefined;
	const { message, chat } = props;
	const { classes } = useStyles();
	console.log('props', props);

	useEffect(() => {
		setActiveChatId(activeChatId as string | undefined);
	}, [activeChatId]);
	return (
		<div className={classes.container}>
			{chat && chat.length ? (
				<>
					<ChatTitlesContainer chat={chat[0]} message={message} share={true} />
					<div id="message-container">
						{message &&
							message.map((item) => {
								if (item.hide) {
									return null;
								}
								return (
									<ChatMessage avatar={chat[0].avatar} key={item.id} message={item} share={true} />
								);
							})}
					</div>
				</>
			) : (
				<div>内容不存在</div>
			)}
		</div>
	);
};

export async function getServerSideProps({ params }: { params: any }) {
	let { data: message } = await supabase.select('message', '*', {
		key: 'chat_id',
		value: params.chatId,
	});

	let { data: chat } = await supabase.select('chat', '*', {
		key: 'id',
		value: params.chatId,
	});

	return {
		props: {
			message,
			chat,
		},
	};
}

export default ShareChat;
