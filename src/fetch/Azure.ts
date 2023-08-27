/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-26 09:44:32
 * @LastEditTime: 2023-08-27 12:08:17
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/fetch/Azure.ts
 */
// import i18n from '@/i18n';
// import { Message } from '@/stores/ChatStore';
// import { SettingsForm, paramKeys, paramAzureKeys } from '@/stores/SettingStore';
// import { handlerError } from '@/utils/TransformData';

// type ChatCompletionParams = Omit<SettingsForm, 'auto_title'>;

// export const requestAzureOpenAI = async (
// 	messages: Message[],
// 	token: string,
// 	params: ChatCompletionParams,
// 	abortController: AbortController,
// 	callback: (value: string) => void,
// 	endCallback: (value?: string) => void,
// 	errorCallback: (body: string, type: 'USER_ABORT_ACTION' | 'TIME_OUT') => void,
// ) => {
// 	const requestTimeout = setTimeout(() => {
// 		abortController.abort({ type: 'TIME_OUT' });
// 	}, 30000);
// 	const submitParams = Object.fromEntries(
// 		Object.entries(params).filter(([key]) => paramAzureKeys.includes(key)),
// 	);
// 	const payload = JSON.stringify({
// 		messages: messages.map(({ content, role }) => ({ content, role })),
// 		...{
// 			...submitParams,
// 			max_tokens: params.max_tokens || undefined,
// 		},
// 	});

// 	try {
// 		const response = await fetch(`${process.env.NEXT_PUBLIC_SERVICE_HOST}azure_openai`, {
// 			method: 'POST',
// 			body: payload,
// 			headers: {
// 				Authorization: `Bearer ${token}`,
// 			},
// 			signal: abortController.signal,
// 		});
// 		clearTimeout(requestTimeout);

// 		if (response.status === 429) {
// 			throw new Error(i18n.request.overuse);
// 		}

// 		if (response.status === 403 || !response.ok) {
// 			const data_json = await response.json();
// 			throw new Error(data_json ? handlerError(data_json) : response.statusText);
// 		}

// 		const { choices } = await response.json();
// 		endCallback!(choices[0].message.content);

// 		// const data = response.body;
// 		// if (!data) {
// 		// 	return;
// 		// }

// 		// const reader = data.getReader();
// 		// const decoder = new TextDecoder();

// 		// while (true) {
// 		// 	const { value, done: doneReading } = await reader.read();
// 		// 	if (doneReading) {
// 		// 		endCallback!();
// 		// 		break;
// 		// 	}
// 		// 	const chunkValue = decoder.decode(value);
// 		// 	callback!(chunkValue);
// 		// }
// 		// abortController!.abort();
// 	} catch (error: any) {
// 		const reason = abortController.signal.reason;
// 		errorCallback!(error.message, reason ? reason.type : '')!;
// 	}
// };

export const requestAzureOpenAI = {};
