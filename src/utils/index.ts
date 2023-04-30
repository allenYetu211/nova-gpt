/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-19 23:58:12
 * @LastEditTime: 2023-04-30 16:06:10
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/utils/index.ts
 */
import { Chat } from '@/stores/ChatStore';

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

export const initStateMessage = (message: string) => {
	return {
		content: message,
		role: 'system',
		id: '',
		exception: true,
		loading: false,
		createdAt: new Date(),
	};
};
