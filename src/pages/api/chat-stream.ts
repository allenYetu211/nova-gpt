/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-27 15:40:21
 * @LastEditTime: 2023-04-30 16:00:07
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/pages/api/chat-stream.ts
 */
import { OpenAIStream } from './openAIStream';
import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser';

export const config = {
	runtime: 'edge',
};

export default async function POST(req: Request): Promise<Response> {
	const apiKey = req.headers.get('apiKey');
	const path = req.headers.get('path');

	let ip = req.headers.get('x-real-ip');
	const forwardedFor = req.headers.get('x-forwarded-for');
	if (!ip && forwardedFor) {
		ip = forwardedFor.split(',').at(0) ?? 'Unknown';
	}

	console.log(`[[Request]]: ip: ${ip}  | apiKey: ${apiKey} | path: ${path}`);

	if (!apiKey) {
		return new Response('ApiKey is required', { status: 400 });
	}
	if (!path) {
		return new Response('Path is required', { status: 400 });
	}

	try {
		const stream = await loadStream(req);
		return new Response(stream);
	} catch (error: any) {
		console.error('[[Stream Error]]', error);
		return new Response(['```json\n', JSON.stringify(error, null, '  '), '\n```'].join(''));
	}
}

async function loadStream(req: Request) {
	const encoder = new TextEncoder();
	const decoder = new TextDecoder();

	const res = await OpenAIStream(req);
	const ContentType = (await res.headers.get('content-type')) ?? '';
	if (!ContentType.includes('stream')) {
		const text = await res.text();
		const content = await text.replace(/provided:.*. You/, 'provided: ***. You');
		return '```json\n' + content + '```';
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
