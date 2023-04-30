/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-27 15:40:21
 * @LastEditTime: 2023-05-01 00:54:14
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/pages/api/chat-stream.ts
 */
const HOST = 'api.openai.com';
const OPEN_AI_KEY = process.env.OPEN_AI_KEY ?? '';
const ACCESS_CODE = process.env.ACCESS_CODE ?? '';

import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser';

export const config = {
	runtime: 'edge',
};

export default async function POST(req: Request): Promise<Response> {
	const apiKey = req.headers.get('api-key');
	const path = req.headers.get('path');
	const accessToken = req.headers.get('access-token');
	const forwardedFor = req.headers.get('x-forwarded-for');

	let API_KEY;

	let ip = req.headers.get('x-real-ip');
	if (!ip && forwardedFor) {
		ip = forwardedFor.split(',').at(0) ?? 'Unknown';
	}

	console.log(
		`[[Request]]: ip: ${ip}  | apiKey: ${apiKey} | accessToken: ${accessToken} | path: ${path}`,
	);

	if (!path) {
		return handledError({
			content: JSON.stringify({
				error_message: 'Open AI Request Path Error.',
			}),
			status: 403,
		});
	}

	if (apiKey) {
		API_KEY = apiKey;
	} else if (accessToken) {
		if (ACCESS_CODE.includes(accessToken)) {
			API_KEY = OPEN_AI_KEY;
		} else {
			return handledError({
				content: JSON.stringify({
					error_message: 'Invalid access code.',
				}),
				status: 403,
			});
		}
	} else {
		return handledError({
			content: JSON.stringify({
				error_message: 'You need to fill in your OPEN AI Key or authorization code.',
			}),
			status: 403,
		});
	}

	try {
		const stream = await loadStream(req, API_KEY, path);
		return new Response(stream);
	} catch (error: any) {
		return handledError(error);
	}
}

function handledError(error: any) {
	return new Response(error.content ?? error, {
		status: error.status ?? 403,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

async function loadStream(req: Request, apiKey: string, path: string) {
	const encoder = new TextEncoder();
	const decoder = new TextDecoder();

	const res = await OpenAIStream(req, apiKey, path);
	const ContentType = (await res.headers.get('content-type')) ?? '';
	if (!ContentType.includes('stream')) {
		const text = await res.text();
		const content = await text.replace(/provided:.*. You/, 'provided: ***. You');
		return Promise.reject({
			content,
			status: res.status,
		});
	}

	const stream = new ReadableStream({
		async start(controller) {
			// callback
			function onParse(event: ParsedEvent | ReconnectInterval) {
				if (event.type === 'event') {
					const data = event.data;
					if (data === '[DONE]') {
						controller.close();
						return;
					}
					try {
						const json = JSON.parse(data);
						const text = json.choices[0].delta?.content || '';

						const queue = encoder.encode(text);
						controller.enqueue(queue);
					} catch (e) {
						controller.error(e);
					}
				}
			}
			const parser = createParser(onParse);
			for await (const chunk of res.body as any) {
				parser.feed(decoder.decode(chunk));
			}
		},
	});

	return stream;
}

async function OpenAIStream(req: Request, apiKey: string, path: string) {
	const payload = await req.json();

	let options: RequestInit = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey ?? ''}`,
		},
		method: 'POST',
		body: JSON.stringify(payload),
	};

	return await fetch(`https://${HOST}/${path}`, options);
}
