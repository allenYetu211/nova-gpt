/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-15 15:10:32
 * @LastEditTime: 2023-05-15 16:12:19
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/fetch/Brad.ts
 */

export const requestBardAI = async (
	content: string,
	contextIds: string[] = ['', '', ''],
	bardCookie: string,
	abortController: AbortController,
) => {
	const response = await fetch(`/api/chat-bard`, {
		method: 'POST',
		headers: {
			'bard-cookie': bardCookie,
			'context-ids': JSON.stringify(contextIds),
		},
		body: JSON.stringify({ content }),
		signal: abortController.signal,
	});

	return await response.json();
};
