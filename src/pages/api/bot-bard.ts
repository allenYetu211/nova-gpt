/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-16 13:34:28
 * @LastEditTime: 2023-05-16 14:00:13
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/pages/api/bot-bard.ts
 */
import { Bard } from 'googlebard';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	if (req.method === 'POST') {
		const cookie = req.headers['bard-cookie'];
		const { content } = JSON.parse(req.body);

		if (!cookie) {
			res.status(405).json({ message: 'Method Not Allowed' });
			return;
		}

		if (!content) {
			res.status(405).json({ message: 'Method Not Allowed' });
			return;
		}

		let bot = new Bard(cookie as string);
		let response = await bot.ask(content);
		res.status(200).json({ content: `${response}` });
	} else {
		res.status(405).json({ message: 'Method Not Allowed' });
	}
}
