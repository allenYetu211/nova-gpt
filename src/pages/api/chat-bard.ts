/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-15 16:15:05
 * @LastEditTime: 2023-05-16 00:20:09
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
	if (!bardCookie) {
		return handledError({
			content: JSON.stringify({
				error_message: 'You need to fill in your bardCookie.',
			}),
			status: 403,
		});
	}

	try {
		const result = await requestGoogleBard(bardCookie, req);
		return new Response(JSON.stringify(result), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		return handledError(error);
	}
}

async function requestGoogleBard(
	bardCookie: string,
	req: Request,
	contextIds: string[] = ['', '', ''],
) {
	const { content } = await req.json();
	const { atValue, blValue } = await requestParams(bardCookie);

	const freq = JSON.stringify([
		null,
		`[[${JSON.stringify(content)}],null,${JSON.stringify(contextIds)}]`,
	]);

	const form = new URLSearchParams([
		['at', atValue],
		['f.req', freq],
	]);

	const url = `https://bard.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate?bl=${blValue}&_reqid=0&rt=c`;
	const result = await fetch(url, {
		method: 'POST',
		headers: {
			Cookie: bardCookie,
		},
		body: form,
	});
	const html = await result.text();
	return parseResponse(html);
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
	const atValue = extractFromHTML('SNlM0e', script!)!;
	const blValue = extractFromHTML('cfb2h', script!)!;
	return { atValue, blValue };
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
				console.log('line', line);
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
