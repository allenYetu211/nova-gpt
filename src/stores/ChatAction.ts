/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-18 12:36:37
 * @LastEditTime: 2023-05-04 10:49:50
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/stores/ChatAction.ts
 */
import i18n from '@/i18n';
import { useChatStore, ChatState } from './ChatStore';
import { v4 as uuidv4 } from 'uuid';

const setChat = useChatStore.setState;

export const update = (newState: Partial<ChatState>) => setChat(() => newState);

export const newChat = () => {
	const id = uuidv4();
	setChat((state) => ({
		activeChatId: id,
		chats: state.chats.concat({
			id,
			message: [
				{
					id: uuidv4(),
					content: i18n.chat.firstQuestion,
					createdAt: new Date(),
					role: 'assistant',
				},
			],
			createdAt: new Date(),
			title: 'New Chat',
		}),
	}));
};

export const changeActiveChatId = (id: string) => {
	setChat(() => ({
		activeChatId: id,
	}));
};

export const deleteChat = (id: string) => {
	setChat((state) => ({
		activeChatId: id === state.activeChatId ? state.chats[0].id : state.activeChatId,
		chats: state.chats.filter((chat) => chat.id !== id),
	}));
};

export const changeChatTitle = (id: string, newTitle?: string) => {
	if (!newTitle) return;
	setChat((state) => ({
		chats: state.chats.map((chat) => {
			if (chat.id === id) {
				chat.title = newTitle;
			}
			return chat;
		}),
	}));
};
