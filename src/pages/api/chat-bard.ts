/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-15 16:15:05
 * @LastEditTime: 2023-05-16 13:30:21
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/pages/api/chat-bard.ts
 */
import { handledError } from './common';
import { load } from 'cheerio';

export const config = {
	runtime: 'edge',
};

export default async function POST(req: Request) {
	const bardCookie = req.headers.get('bard-cookie');
	const at = req.headers.get('at');
	const bl = req.headers.get('bl');
	const contextIds = req.headers.get('context-ids')
		? JSON.parse(req.headers.get('context-ids')!)
		: ['', '', ''];

	if (!bardCookie) {
		return handledError({
			content: JSON.stringify({
				error_message: 'You need to fill in your bard cookie.',
			}),
			status: 403,
		});
	}

	try {
		if (req.method == 'GET') {
			const result = await requestParams(bardCookie);
			return new Response(JSON.stringify(result), { status: 200 });
		} else {
			const result = await requestGoogleBard(bardCookie, req, contextIds);
			const { r, c, rc, responses } = result;
			return new Response(
				JSON.stringify({
					contextIds: [r, c, rc],
					responses: responses[0],
				}),
				{
					status: 200,
					headers: {
						'Content-Type': 'application/json',
					},
				},
			);
		}
	} catch (error) {
		return handledError(error);
	}
}

async function requestGoogleBard(
	bardCookie: string,
	req: Request,
	contextIds: string[] = ['', '', ''],
	// at: string,
	// bl: string,
) {
	const { content } = await req.json();
	//  TODO : 初次请求后，客户端携带发送，节省每次请求时间
	const { at, bl } = await requestParams(bardCookie);

	const result = await fetch(
		`https://bard.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate?bl=${bl}&_reqid=${
			Math.floor(Math.random() * 900000) + 100000
		}&rt=c`,
		{
			method: 'POST',
			headers: {
				Cookie: bardCookie,
			},
			body: new URLSearchParams([
				['at', at],
				[
					'f.req',
					JSON.stringify([
						null,
						`[[${JSON.stringify(content)}],null,${JSON.stringify(contextIds)}]`,
					]),
				],
			]),
		},
	);
	const html = await result.text();
	return parseResponse(html);

	//  返回的数据结构到底是什么意思？ 。。。。, 根据bard 页面，先选第一个作为回答。。。
	// [
	//   [ 'Hello there! How can I help you today?' ],
	//   [ 'c_ae95e552fa90bcc', 'r_ae95e552fa90d46' ],
	//   [ [ 'Hello', 1 ] ],
	//   [],
	//   [
	//     [
	//     'rc_ae95e552fa90c89',
	//     [ 'Hello there! How can I help you today?' ],
	//     []
	//   ],
	//     [
	//     'rc_ae95e552fa90cc8',
	//     [ 'Hello there! How may I help you today?' ],
	//     []
	//   ],
	//     [ 'rc_ae95e552fa90d07', [ 'Hello! How can I help you today?' ], [] ]
	//   ]
	// ]
}

async function requestParams(bardCookie: string) {
	const result = await fetch('https://bard.google.com', {
		headers: {
			Cookie: bardCookie,
		},
	});
	const html = await result.text();

	let $ = load(html);
	let script = $('script[data-id=_gd]').html();
	const at = extractFromHTML('SNlM0e', script!)!;
	const bl = extractFromHTML('cfb2h', script!)!;
	return { at, bl };
}

function extractFromHTML(variableName: string, html: string) {
	const regex = new RegExp(`"${variableName}":"([^"]+)"`);
	const match = regex.exec(html);
	return match?.[1];
}

function parseResponse(text: string) {
	let resData: {
		r: string;
		c: string;
		rc: string;
		responses: string[];
	} = {
		r: '',
		c: '',
		rc: '',
		responses: [],
	};

	try {
		let parseData = (data: string) => {
			if (typeof data === 'string') {
				if (data?.startsWith('c_')) {
					resData.c = data;
					return;
				}
				if (data?.startsWith('r_')) {
					resData.r = data;
					return;
				}
				if (data?.startsWith('rc_')) {
					resData.rc = data;
					return;
				}
				resData.responses.push(data);
			}
			if (Array.isArray(data)) {
				data.forEach((item) => {
					parseData(item);
				});
			}
		};
		try {
			const lines = text.split('\n');
			for (let i in lines) {
				const line = lines[i];
				if (line.includes('wrb.fr')) {
					let data = JSON.parse(line);
					let responsesData = JSON.parse(data[0][2]);
					responsesData.forEach((response: any) => {
						parseData(response);
					});
				}
			}
		} catch (e: any) {
			throw new Error(
				`Error parsing response: make sure you are using the correct cookie, copy the value of "__Secure-1PSID" cookie and set it like this: \n\nnew Bard("__Secure-1PSID=<COOKIE_VALUE>")\n\nAlso using a US proxy is recommended.\n\nIf this error persists, please open an issue on github.\nhttps://github.com/PawanOsman/GoogleBard`,
			);
		}
	} catch (err) {
		throw new Error(
			`Error parsing response: make sure you are using the correct cookie, copy the value of "__Secure-1PSID" cookie and set it like this: \n\nnew Bard("__Secure-1PSID=<COOKIE_VALUE>")\n\nAlso using a US proxy is recommended.\n\nIf this error persists, please open an issue on github.\nhttps://github.com/PawanOsman/GoogleBard`,
		);
	}

	return resData;
}
