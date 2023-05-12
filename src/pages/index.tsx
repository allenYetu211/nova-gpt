/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-14 11:27:09
 * @LastEditTime: 2023-05-12 12:03:56
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/pages/index.tsx
 */

import { Main } from '@/components/Main';
import { addPermissions } from '@/stores/UserAction';
import { useEffect, useMemo } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useChatStore } from '@/stores/ChatStore';
import { setActiveChatId } from '@/stores/ChatAction';
import '@/extensions';

export default function Home() {
	const chats = useChatStore((state) => state.chats);
	const activeChatId = useChatStore((state) => state.activeChatId);
	const activeChat = useMemo(() => {
		return chats.find((chat) => chat.id === activeChatId);
	}, [chats, activeChatId]);

	useEffect(() => {
		if (!activeChat && chats.length > 0) {
			setActiveChatId(chats[chats.length - 1].id);
		}
		addPermissions('chat');
	}, []);

	return (
		<MainLayout>
			<Main />
		</MainLayout>
	);
}
