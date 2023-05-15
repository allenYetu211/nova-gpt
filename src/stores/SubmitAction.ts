/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-19 10:23:55
 * @LastEditTime: 2023-05-16 01:27:31
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/stores/SubmitAction.ts
 */
import { useChatStore, Message, Chat } from './ChatStore';
import { useSettingStore, SettingsForm, Language } from './SettingStore';
import { requestOpenAI } from '@/fetch/OpenAI';
import { requestBardAI } from '@/fetch/Brad';
import { updateActionsChatMessage, getActiveChat } from '@/utils';
import { createMessage } from '@/utils';
import { supabase } from '@/lib/supabaseClient';

import * as prompt from '@/prompt';
import i18n from '@/i18n';

const getChat = useChatStore.getState;
const setChat = useChatStore.setState;

const getSetting = useSettingStore.getState;

/**
 * 用户信息
 */
export const userMessage = () => {
	if (!checkConfig()) {
		return;
	}
	const { textareaMessage } = getChat();
	const userMessage = createMessage({ message: textareaMessage, role: 'user' });

	setChat(() => ({ textareaMessage: '' }));
	updateChatContentMessage([userMessage]);

	const message = submitMessageHistory();
	if (!message) {
		return;
	}
	message.push(userMessage);
	submitMessage(message);
};

/**
 * 用户提问内容，携带上下文进行咨询
 */
export const userQuestion = (question: string, message: string, messageId: Message['id']) => {
	const { activeChatId, chats } = getChat();
	const chat = chats.find((chat) => chat.id === activeChatId);
	const context = chat?.message.find((message) => message.id === messageId);
	const make = getSystemMake('questions');
	const contextUserMessage = createMessage({ message, question, role: 'user' });
	const contextMessage = createMessage({
		message: `${make}${context?.content}`,
		hide: true,
		role: 'system',
	});

	updateChatContentMessage([contextMessage, contextUserMessage]);
	submitMessage([contextMessage, contextUserMessage]);

	/**
	 * 获取上下文
	 */
};

/**
 * 生成预留的 gpt response message 消息， 并填充至展示区域
 */
const gptMessage = () => {
	const message = createMessage({ message: '', role: 'assistant' });
	updateChatContentMessage([message]);
	return message;
};

/**
 * 创建系统消息，完成特定角色任务, 获取系统的上下文
 * @param target
 * @param content
 */
export const systemMessage = (content: string) => {
	const systemMessage = createMessage({ message: content, role: 'system', hide: true });
	// const message = submitMessageHistory();
	// if (!message) {
	// 	return;
	// }
	// message.push(systemMessage);
	submitMessage([systemMessage]);
};

export const systemTranslations = (targetLanguage: Language, content: string) => {
	const message = getSystemMake('translation');
	const systemMessage = createMessage({
		message: `${message}${i18n.languages[targetLanguage]}：`,
		role: 'system',
		hide: true,
	});
	const userMessage = createMessage({
		message: content,
		question: `${i18n.targetLanguage}: ${i18n.languages[targetLanguage]}`,
		role: 'user',
	});
	updateChatContentMessage([systemMessage, userMessage]);
	submitMessage([systemMessage, userMessage]);
};

const getSystemMake = (target: keyof (typeof prompt)['zh_cn']) => {
	const language = getSetting().language;
	return prompt[language][target];
};

/**
 * 发送消息对话
 */
const submitMessage = (message: Message[]) => {
	// TODO: 根据当前是 Chat GPT，还是 Bard 选择不同的入参。
	// if (true) {
	// 	submitMessageBard(message[message.length - 1].content);
	// } else {
	const { activeChatId } = getChat();
	const { openAI } = getSetting();
	const GPTConfig = openAI.config;
	const gtpMessage = gptMessage();
	const gptResponseMessageId = gtpMessage.id;
	streamOpenAI(message, GPTConfig, activeChatId, gptResponseMessageId);
	// }
};

/**
 * 消息推送
 */
const streamOpenAI = (
	submitMessage: Message[],
	GPTConfig: SettingsForm,
	activeChatId: string,
	responseMessageId: string,
) => {
	const { openAI, accessToken } = getSetting();
	const customRequestInformation = {
		'api-key': openAI.key,
		'access-token': accessToken,
	};

	const abortController = new AbortController();
	ControllerAbort.addController(responseMessageId, abortController);

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
					updateAssistantMessage(assistantMessage.content, assistantMessage.id);
					assistantMessage.loading = false;
				}
				return chat;
			}),
		}));
	};

	const errorCallback = (content: string, type: 'USER_ABORT_ACTION' | 'TIME_OUT') => {
		if (type === 'TIME_OUT') {
			content = i18n.request.timedOut;
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

/**
 * 检查配置信息
 * @returns boolean
 */
const checkConfig = (): boolean => {
	const { activeChatId, textareaMessage } = getChat();
	const { openAI, accessToken } = getSetting();
	if (!activeChatId || !textareaMessage.trim()) {
		console.log('activeChatId or textareaMessage is null');
		return false;
	}

	if (!openAI.key && !accessToken) {
		setChat((state) => ({
			textareaMessage: '',
			chats: updateActionsChatMessage(state.chats, activeChatId, (chat) => {
				chat.message.push(
					createMessage({
						message: 'Please fill in the Open AI key or access token in the settings.',
						role: 'system',
						exception: true,
						loading: false,
					}),
				);
				return chat;
			}),
		}));
		return false;
	}
	return true;
};

/**
 * 获取携带的历史信息
 * @returns Message[]
 */
const submitMessageHistory = () => {
	const { activeChatId, chats } = getChat();
	const { openAI } = getSetting();
	const chat = getActiveChat(chats, activeChatId);
	if (!chat) {
		console.error(`chat not found:${activeChatId}`);
		return;
	}

	let submitMessage = [];
	let historyIndex = chat.message.length - 1;

	while (historyIndex >= 0 && submitMessage.length <= openAI.history - 1) {
		const message = chat.message[historyIndex];
		if (!message.exception) {
			submitMessage.unshift(chat.message[historyIndex]);
		}
		historyIndex--;
	}

	return submitMessage;
};

/**
 * Abort控制
 */
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

/**
 *  更新chat 页面 内容展现消息, 存储消息至supbase
 */
const updateChatContentMessage = (message: Message[]) => {
	if (Array.isArray(message) && message.length === 0) return;

	const { activeChatId } = getChat();
	insetSubmitMessage(message);
	setChat((state) => ({
		textareaMessage: '',
		chats: updateActionsChatMessage(state.chats, activeChatId, (chat) => {
			if (Array.isArray(message)) {
				message.forEach((item) => {
					chat.message.push(item);
				});
			} else {
				chat.message.push(message);
			}
			return chat;
		}),
	}));
};

const insetSubmitMessage = (message: Message[]) => {
	if (Array.isArray(message) && message.length === 0) return;
	const { activeChatId } = getChat();
	const updateMessage = message.map((item) => {
		return {
			...item,
			chat_id: activeChatId,
		};
	});
	supabase.insert('message', updateMessage);
	// supabase.from('message').insert(updateMessage);
};

const updateAssistantMessage = async (content: string, message_id: string) => {
	// await supabase.from('message').upsert({ id: message_id, content: content });
	supabase.upsert('message', { id: message_id, content: content });
};

/**
 * 推送消息至bard
 */

const submitMessageBard = async (message: string) => {
	const { activeChatId, chats } = getChat();
	const chat = getActiveChat(chats, activeChatId);
	const abortController = new AbortController();
	const gtpMessage = gptMessage();
	const responseMessageId = gtpMessage.id;
	ControllerAbort.addController(responseMessageId, abortController);

	const { bardCookie = '' } = getSetting();

	const data = await requestBardAI(
		message,
		chat?.contextIds ?? ['', '', ''],
		bardCookie,
		abortController,
	);

	if (!data) return;
	setChat((state) => ({
		chats: updateActionsChatMessage(state.chats, activeChatId, (chat: Chat) => {
			const assistantMessage = chat.message.find((m) => m.id === responseMessageId);
			if (assistantMessage) {
				assistantMessage.content = data.responses;
			}
			chat.contextIds = data.contextIds;
			return chat;
		}),
	}));
};
