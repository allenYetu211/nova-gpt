/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-19 23:58:12
 * @LastEditTime: 2023-04-30 16:06:10
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/utils/index.ts
 */
import { Chat, Message } from '@/stores/ChatStore';
import { v4 as uuidv4 } from 'uuid';

export function keepDecimal(num: number, decimal: number) {
	return Math.round(num * Math.pow(10, decimal)) / Math.pow(10, decimal);
}

export function updateActionsChatMessage(
	chats: Chat[],
	id: string,
	callback: (message: Chat) => Chat,
) {
	return chats.map((chat) => {
		if (chat.id === id) {
			chat = callback(chat);
			// chat.message = callback(chat.message);
		}
		return chat;
	});
}

export const getActiveChat = (chats: Chat[], id: string) => {
	return chats.find((chat) => chat.id === id);
};

export const copyToClipboard = async (text: string) => {
	try {
		await navigator.clipboard.writeText(text);
	} catch (error) {
		const textArea = document.createElement('textarea');
		textArea.value = text;
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		try {
			document.execCommand('copy');
		} catch (error) {
			// showToast(Locale.Copy.Failed);
		}
		document.body.removeChild(textArea);
	}
};

/**
 * 创建新信息
 * @param message 信息
 * @param role 角色
 * @param hide 是否隐藏信息
 * @param exception 是否为异常状态
 * @param loading  是否为loading状态
 * @returns Message
 */

export const createMessage = (container: {
	message: string;
	role: Message['role'];
	hide?: boolean;
	question?: string;
	exception?: boolean;
	loading?: boolean;
	// 🌟
	preamble?: boolean;
}): Message => {
	const {
		message,
		role,
		question = '',
		hide = false,
		exception = false,
		loading = true,
		preamble = false,
	} = container;

	return {
		preamble,
		content: message,
		role,
		question,
		id: uuidv4(),
		hide,
		exception,
		loading,
		created_at: new Date(),
	};
};
