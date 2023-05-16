/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-15 15:10:32
 * @LastEditTime: 2023-05-16 13:58:29
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/fetch/Brad.ts
 */

export const requestBardAI = async (
	content: string,
	customHeaders: {
		'bard-cookie': string;
		// 'context-ids': string;
		// at: string;
		// bl: string;
	},
	abortController: AbortController,
	errorCallback: (error: any) => void,
) => {
	try {
		const response = await fetch(`/api/bot-bard`, {
			method: 'POST',
			headers: customHeaders,
			body: JSON.stringify({ content }),
			signal: abortController.signal,
		});

		return await response.json();
	} catch (error) {
		errorCallback(error);
	}
};

export const requestBardAIPreParams = async (customHeaders: { 'bard-cookie': string }) => {
	const response = await fetch(`/api/chat-bard`, {
		method: 'GET',
		headers: customHeaders,
	});

	return await response.json();
};
