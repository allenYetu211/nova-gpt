/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-19 10:23:55
 * @LastEditTime: 2023-05-01 01:07:28
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
	const { openAI, accessToken } = getSetting();
	if (!activeChatId || !textareaMessage.length) {
		console.log('activeChatId or textareaMessage is null');
		return;
	}

	if (!openAI.key && !accessToken) {
		setChat((state) => ({
			textareaMessage: '',
			chats: updateActionsChatMessage(state.chats, activeChatId, (chat) => {
				chat.message.push({
					content: 'Please fill in the Open AI key or access token in the settings.',
					role: 'system',
					id: uuidv4(),
					exception: true,
					loading: false,
					createdAt: new Date(),
				});
				return chat;
			}),
		}));
		return;
	}

	/**
	 * 提交最后 4 条内容
	 */

	const chat = getActiveChat(chats, activeChatId);
	if (!chat) {
		console.error(`chat not found:${activeChatId}`);
		return;
	}

	let submitMessage = [];
	let historyIndex = chat.message.length - 1;

	while (historyIndex > 0 && submitMessage.length <= openAI.history - 1) {
		const message = chat.message[historyIndex];
		if (!message.exception) {
			submitMessage.unshift(chat.message[historyIndex]);
		}
		historyIndex--;
	}

	const newMessage: Message = {
		content: textareaMessage,
		role: 'user',
		id: uuidv4(),
		exception: false,
		loading: true,
		createdAt: new Date(),
	};

	submitMessage.push(newMessage);

	setChat((state) => ({
		textareaMessage: '',
		chats: updateActionsChatMessage(state.chats, activeChatId, (chat) => {
			chat.message.push(newMessage);
			return chat;
		}),
	}));

	const abortController = new AbortController();
	const GPTConfig = openAI.config;
	const responseMessageId = uuidv4();
	const customRequestInformation = {
		'api-key': openAI.key,
		'access-token': accessToken,
	};

	ControllerAbort.addController(responseMessageId, abortController);

	const botResponseMessage: Message = {
		content: '',
		role: 'assistant',
		id: responseMessageId,
		createdAt: new Date(),
		loading: true,
		exception: false,
	};

	setChat((state) => {
		return {
			chats: updateActionsChatMessage(state.chats, activeChatId, (chat: Chat) => {
				chat.message.push(botResponseMessage);
				return chat;
			}),
		};
	});

	const callback = (content: string) => {
		setChat((state) => ({
			chats: updateActionsChatMessage(state.chats, activeChatId, (chat: Chat) => {
				const assistantMessage = chat.message.find((m) => m.id === responseMessageId);
				if (assistantMessage) {
					assistantMessage.content += content;
				}
				return chat;
			}),
		}));
	};

	const endCallback = () => {
		ControllerAbort.remove(responseMessageId);
		setChat((state) => ({
			chats: updateActionsChatMessage(state.chats, activeChatId, (chat: Chat) => {
				const assistantMessage = chat.message.find((m) => m.id === responseMessageId);
				if (assistantMessage) {
					assistantMessage.loading = false;
				}
				return chat;
			}),
		}));
	};

	const errorCallback = (content: string, type: 'USER_ABORT_ACTION' | 'TIME_OUT') => {
		if (type === 'TIME_OUT') {
			content = '[Request] 请求超时';
		}

		setChat((state) => {
			return {
				chats: updateActionsChatMessage(state.chats, activeChatId, (chat: Chat) => {
					const assistantMessage = chat.message.find((m) => m.id === responseMessageId);
					if (type !== 'USER_ABORT_ACTION' && assistantMessage) {
						assistantMessage.content = `${content}`;
						assistantMessage!.exception = true;
					}
					assistantMessage!.loading = false;
					return chat;
				}),
			};
		});
	};

	requestOpenAI(
		submitMessage || [],
		GPTConfig,
		customRequestInformation,
		abortController,
		callback,
		endCallback,
		errorCallback,
	);
};

export const ControllerAbort = {
	controllers: {} as Record<string, AbortController>,

	addController(key: string, controller: AbortController) {
		this.controllers[key] = controller;
	},

	stop(key: string) {
		const controller = this.controllers[key];
		controller?.abort({
			type: 'USER_ABORT_ACTION',
		});
	},

	stopAll() {
		Object.values(this.controllers).forEach((v) => v.abort());
	},

	hasPending() {
		return Object.values(this.controllers).length > 0;
	},

	remove(key: string) {
		delete this.controllers[key];
	},
};
