/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-14 11:27:09
 * @LastEditTime: 2023-05-07 16:41:44
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/pages/index.tsx
 */

// import { Main } from '@/components/Main';
import { EmptyChats } from '@/components/Empty';
import { useChatStore } from '@/stores/ChatStore';
import { useRouter } from 'next/router';
import '@/extensions';

export default function Home() {
	const router = useRouter();
	const chats = useChatStore((state) => state.chats);
	const activeChatId = useChatStore((state) => state.activeChatId);
	const activeChat = chats.find((chat) => chat.id === activeChatId);

	if (!activeChat) {
		// 没有指定的Chat，如果chats里面有长度， 则跳转至第一个chat
		if (chats.length) {
			router.push(`/chat/${chats[chats.length - 1].id}`);
			return;
		}
		return <EmptyChats />;
	} else {
		/**
		 * 如果之前已经选择过chat ， 则直接从localstorage中获取
		 */
		router.push(`/chat/${activeChat.id}`);
		return;
	}
}
