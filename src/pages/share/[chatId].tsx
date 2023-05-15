/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-07 16:45:14
 * @LastEditTime: 2023-05-15 11:22:33
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
import i18n from '@/i18n';

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
									<ChatMessage
										system_avatar={chat[0].system_avatar}
										user_avatar={chat[0].user_avatar}
										avatar={chat[0].avatar}
										key={item.id}
										message={item}
										share={true}
									/>
								);
							})}
					</div>
				</>
			) : (
				<div> {i18n.share.not_found}</div>
			)}
		</div>
	);
};

export async function getServerSideProps({ params }: { params: any }) {
	let { data: message }: any = await supabase.select('message', '*', {
		key: 'chat_id',
		value: params.chatId,
	});

	let { data: chat }: any = await supabase.select('chat', '*', {
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
