/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-18 12:36:37
 * @LastEditTime: 2023-05-16 16:31:53
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/stores/ChatAction.ts
 */
import i18n from '@/i18n';
import type { RolePlayType } from '@/role';
import { createMessage } from '@/utils';
import { v4 as uuidv4 } from 'uuid';
import { Chat, ChatState, useChatStore, Message } from './ChatStore';
import { useSettingStore } from './SettingStore';
import { supabase } from '@/lib/supabaseClient';

import { updateActionsChatMessage } from '@/utils';

const setChat = useChatStore.setState;
const getSetting = useSettingStore.getState;

export const update = (newState: Partial<ChatState>) => setChat(() => newState);

export const newChat = (role?: RolePlayType | 'OPEN AI' | 'BARD AI') => {
	const id = uuidv4();

	let defaultInitChat: Chat = {
		id,
		message: [
			createMessage({
				message: i18n.chat.firstQuestion,
				role: 'assistant',
				loading: false,
				exception: false,
			}),
		],
		avatar: '🤖',
		user_avatar: '😁',
		system_avatar: '👩🏻‍🏫',
		created_at: new Date(),
		title: 'New Session',
		ai_type: 'OPEN AI',
		preamble_message: {},
	};

	if (role && typeof role !== 'string') {
		const { message, ...other } = role;
		const newMessage = [
			Object.assign(defaultInitChat.message[0], role.message, {
				preamble: true,
			}),
		];

		defaultInitChat = Object.assign(defaultInitChat, {
			message: newMessage,
			preamble_message: {
				[newMessage[0].id]: newMessage[0],
			},
			...other,
		});
	} else if (role && typeof role === 'string' && role !== 'OPEN AI') {
		defaultInitChat = Object.assign(defaultInitChat, {
			avatar: '🦄',
			ai_type: role,
		});
	}

	console.log('defaultInitChat', defaultInitChat);

	setChat((state) => ({
		activeChatId: id,
		chats: state.chats.concat(defaultInitChat),
	}));

	if (!getSetting().userState) {
		return;
	}

	supabase.insert('chat', [
		{
			id,
			created_at: defaultInitChat.created_at,
			title: defaultInitChat.title,
			avatar: defaultInitChat.avatar || '🤖',
			user_avatar: defaultInitChat.user_avatar || '😁',
			system_avatar: defaultInitChat.system_avatar || '👩🏻‍🏫',
		},
	]);
};

export const setActiveChatId = (id: string | undefined) => {
	setChat(() => ({
		activeChatId: id || '',
	}));
};

export const deleteChat = (id: string) => {
	setChat((state) => {
		let chats = state.chats.filter((chat) => chat.id !== id);
		let activeChatId = chats.length > 0 ? chats[chats.length - 1].id : '';
		return {
			activeChatId,
			chats,
		};
	});
};

export const changeActionChat = (id: string, newTitle?: Partial<Omit<Chat, 'message'>>) => {
	if (!newTitle) return;
	setChat((state) => ({
		chats: state.chats.map((chat) => {
			if (chat.id === id) {
				chat = { ...chat, ...newTitle };
			}
			return chat;
		}),
	}));
};

/**
 * 修改message 状态，设置为前置消息， 历史消息与其中进行比对
 * @param activeChatId
 * @param messageId
 * @param newMessage
 */
export const changeMessageState = (
	activeChatId: string,
	messageId: string,
	newMessage: Partial<Partial<Pick<Message, 'hide' | 'loading' | 'preamble' | 'exception'>>>,
) => {
	setChat((state) => {
		const newChats = updateActionsChatMessage(state.chats, activeChatId, (chat: Chat) => {
			const assistantMessage = chat.message.find((m) => m.id === messageId);
			if (assistantMessage) {
				Object.assign(assistantMessage, newMessage);
				const hasPreamble = newMessage?.preamble;
				if (hasPreamble) {
					chat.preamble_message ??= {};
					chat.preamble_message[assistantMessage?.id] = assistantMessage!;
				} else {
					delete chat.preamble_message?.[assistantMessage?.id];
				}
			}
			return chat;
		});

		return {
			chats: newChats,
		};
	});
};

export const deleteMessage = (messageId: string) => {
	setChat((state) => ({
		chats: updateActionsChatMessage(state.chats, state.activeChatId, (chat: Chat) => {
			if (chat.preamble_message && chat.preamble_message[messageId]) {
				delete chat.preamble_message[messageId];
			}
			chat.message = chat.message.filter((item) => item.id !== messageId);
			return chat;
		}),
	}));
};
