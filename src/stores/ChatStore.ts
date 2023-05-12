/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-18 11:28:09
 * @LastEditTime: 2023-05-12 14:35:50
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/stores/ChatStore.ts
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RolePlayType } from '@/role';

export const excludeKeys = ['textareaMessage', 'isRecording', 'loadingChats'];

export interface Message {
	content: string;
	id: string;
	created_at: Date;
	role: 'user' | 'system' | 'assistant';
	question?: string;
	hide?: boolean;
	exception?: boolean;
	loading?: boolean;
	preamble?: boolean;
}

export interface Chat {
	id: string;
	message: Message[];
	created_at: Date;

	/**
	 * 存储前置消息用于展示修改，生成新的 session
	 */
	preamble_message?: {
		[key in string]: Message;
	};

	// 机器人名称
	title: RolePlayType['title'];
	// 标签图标
	// 机器人头像
	avatar?: RolePlayType['avatar'];
	user_avatar?: RolePlayType['user_avatar'];
	system_avatar?: RolePlayType['system_avatar'];
	openAiConfig?: RolePlayType['openAiConfig'];
}

export interface ChatState {
	/**
	 * Chat Components Messages
	 */
	chats: Chat[];
	activeChatId: string;
	/**
	 *  Textarea Components State
	 */
	isRecording: boolean;
	textareaMessage: string;
	recordItems: { value: string; label: string }[];
	recordModel: string;
}

export const initialState = {
	loadingChats: [],
	chats: [],
	activeChatId: '',

	isRecording: false,
	textareaMessage: '',
	recordItems: [],
	recordModel: '',
};

const store = () => ({ ...initialState } as ChatState);

export const useChatStore = create<ChatState>()(
	persist(store, {
		name: 'chat-store',
		partialize: (state) =>
			Object.fromEntries(Object.entries(state).filter(([key]) => !excludeKeys.includes(key))),
	}),
);
