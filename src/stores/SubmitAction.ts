/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-19 10:23:55
 * @LastEditTime: 2023-04-29 15:53:13
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/stores/SubmitAction.ts
 */
import { useChatStore, Message, Chat } from './ChatStore';
import { useSettingStore } from './SettingStore';
import { requestOpenAI } from '@/fetch/Request';
import { updateActionsChatMessage, getActiveChat } from '@/utils';
import { v4 as uuidv4 } from 'uuid';

const getChat = useChatStore.getState;
const setChat = useChatStore.setState;

const getSetting = useSettingStore.getState;

export const submitMessage = () => {
	const { activeChatId, textareaMessage, chats } = getChat();
	const { openAI } = getSetting();
	if (!openAI.key || !activeChatId || !textareaMessage.length) {
		return;
	}

	const newMessage: Message = {
		content: textareaMessage,
		role: 'user',
		id: uuidv4(),
		createdAt: new Date(),
	};

	/**
	 * 提交最后 4 条内容
	 */

	const chat = getActiveChat(chats, activeChatId);
	if (!chat) {
		console.error(`chat not found:${activeChatId}`);
		return;
	}

	const submitMessage = chat?.message.slice((openAI.history - 1) * -1);
	submitMessage.push(newMessage);

	setChat((state) => ({
		textareaMessage: '',
		chats: updateActionsChatMessage(state.chats, activeChatId, (message) => {
			message.push(newMessage);
			return message;
		}),
	}));

	const abortController = new AbortController();
	const GPTConfig = openAI.config;
	const openAIKey = openAI.key;
	const responseMessageId = uuidv4();

	const botResponseMessage: Message = {
		content: '',
		role: 'assistant',
		id: responseMessageId,
		createdAt: new Date(),
	};

	setChat((state) => {
		const loadingChats = [...state.loadingChats];
		loadingChats.push(responseMessageId);
		return {
			loadingChats,
			chats: updateActionsChatMessage(state.chats, activeChatId, (message: Chat['message']) => {
				message.push(botResponseMessage);
				return message;
			}),
		};
	});

	const callback = (content: string) => {
		setChat((state) => ({
			chats: updateActionsChatMessage(state.chats, activeChatId, (message: Chat['message']) => {
				const assistantMessage = message.find((m) => m.id === responseMessageId);
				if (assistantMessage) {
					assistantMessage.content += content;
				}
				return message;
			}),
		}));
	};

	const endCallback = () => {
		setChat((state) => {
			return {
				loadingChats: state.loadingChats.filter((id) => id !== responseMessageId),
			};
		});
	};

	const errorCallback = (content: string) => {
		console.log('content', content);
	};

	requestOpenAI(
		submitMessage || [],
		GPTConfig,
		openAIKey,
		abortController,
		callback,
		endCallback,
		errorCallback,
	);
};
