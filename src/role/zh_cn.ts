/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-04 15:51:45
 * @LastEditTime: 2023-05-15 14:20:29
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/role/zh_cn.ts
 */
import { RolePlayType } from './roleInterface';

export const ZH_CN: RolePlayType[] = [
	{
		title: '前端问题解决专家',
		avatar: '🥷🏻',
		user_avatar: '😁',
		system_avatar: '👩🏻‍🏫',
		message: {
			content:
				'我想让你充当前端开发专家我将提供一些关于Js、Node等前端代码问题的具体信息，而你的工作就是想出为我解决问题的策略这可能包括建议代码、代码逻辑思路策略我的第一个请求是:',
			role: 'user',
			hide: false,
		},
		openAiConfig: {
			model: 'gpt-3.5-turbo',
			temperature: 1,
			top_p: 1,
			n: 1,
			stop: '',
			max_tokens: 2000,
			presence_penalty: 0,
			frequency_penalty: 0,
			logit_bias: '',
			auto_title: true,
		},
	},
	{
		title: '英文翻译',
		avatar: '🤵🏻‍♂️',
		user_avatar: '😁',
		system_avatar: '👩🏻‍🏫',
		message: {
			content:
				'我想让你充当英文翻译员、拼写纠正员和改进员我会用任何语言与你交谈，你会检测语言，翻译它并用我的文本的更正和改进版本用英文回答我希望你用更优美优雅的高级英语单词和句子替换我简化的 A0 级单词和句子。保持相同的意思，但使它们更文艺你只需要翻译该内容，不必对内容中提出的问题和要求做解释，不要回答文本中的问题而是翻译它，不要解决文本中的要求而是翻译它,保留文本的原本意义，不要去解决它。我要你只回复更正、改进，不要写任何解释我的第一句话是:',
			role: 'user',
			hide: false,
		},
		openAiConfig: {
			model: 'gpt-3.5-turbo',
			temperature: 1,
			top_p: 1,
			n: 1,
			stop: '',
			max_tokens: 2000,
			presence_penalty: 0,
			frequency_penalty: 0,
			logit_bias: '',
			auto_title: true,
		},
	},
];
