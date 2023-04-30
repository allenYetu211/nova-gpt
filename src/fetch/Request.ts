/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-26 09:44:32
 * @LastEditTime: 2023-05-01 01:02:12
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/fetch/Request.ts
 */
import { Message } from '@/stores/ChatStore';
import { SettingsForm, paramKeys } from '@/stores/SettingStore';
import { handlerError } from '@/utils/TransformData';

type ChatCompletionParams = Omit<SettingsForm, 'auto_title'>;

export const requestOpenAI = async (
	messages: Message[],
	params: ChatCompletionParams,
	customRequestInformation: {
		'api-key'?: string;
		'access-token'?: string;
	},
	abortController: AbortController,
	callback?: ((value: string) => void) | undefined,
	endCallback?: (() => void) | undefined,
	errorCallback?: ((body: string, type: 'USER_ABORT_ACTION' | 'TIME_OUT') => void) | undefined,
) => {
	const requestTimeout = setTimeout(() => {
		abortController.abort({ type: 'TIME_OUT' });
	}, 30000);
	const submitParams = Object.fromEntries(
		Object.entries(params).filter(([key]) => paramKeys.includes(key)),
	);
	const payload = JSON.stringify({
		stream: true,
		messages: messages.map(({ content, role }) => ({ content, role })),
		...{
			...submitParams,
			logit_bias: {},
			max_tokens: params.max_tokens || undefined,
		},
	});

	try {
		const response = await fetch('/api/chat-stream', {
			method: 'POST',
			headers: Object.assign(
				{
					'Content-Type': 'application/json',
					path: 'v1/chat/completions',
				},
				customRequestInformation,
			),
			body: payload,
			signal: abortController.signal,
		});
		clearTimeout(requestTimeout);

		if (response.status === 429) {
			throw new Error('请求频繁，超出三分钟访问限制，请升级付费 key。');
		}

		if (response.status === 403 || !response.ok) {
			const data_json = await response.json();
			throw new Error(data_json ? handlerError(data_json) : response.statusText);
		}

		const data = response.body;
		if (!data) {
			return;
		}

		const reader = data.getReader();
		const decoder = new TextDecoder();

		while (true) {
			const { value, done: doneReading } = await reader.read();
			if (doneReading) {
				endCallback!();
				break;
			}
			const chunkValue = decoder.decode(value);
			callback!(chunkValue);
		}
		abortController!.abort();
	} catch (error: any) {
		const reason = abortController.signal.reason;
		errorCallback!(error.message, reason ? reason.type : '')!;
	}
};
