/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-03 10:37:53
 * @LastEditTime: 2023-05-03 16:39:02
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/i18n/en.ts
 */
export const en = {
	Nav: {
		new: 'New Chat',
		setting: 'Settings',
	},
	title: 'Nova GTP',
	introduction: 'Build your chatbot',
	changeTitle: 'Change the title of the chat',
	changeTitlePlaceholder: 'Enter the new name for the title',
	confirm: 'Confirm',
	targetLanguage: 'Target Language',
	languages: {
		zh_cn: 'Chinese',
		en: 'English',
	},
	setting: {
		openai: {
			key: {
				title: 'Key',
				introduction: 'Open AI API key',
			},
			tokens: {
				title: 'Max Tokens',
				introduction: 'Max number of tokens allowed in a single interaction',
			},
			temperature: {
				title: 'Temperature',
				introduction: 'Answer randomness | Suggested range: 0.7~1.0',
			},
			presence_penalty: {
				title: 'Presence Penalty',
				introduction: 'GPT penalty mechanism | Suggested range: 0.9~1.2',
			},
			models: {
				title: 'Models',
				introduction: 'Select models',
			},
			history: {
				title: 'History',
				introduction: 'Maximum historical information to carry in response',
			},
		},
		access: {
			token: {
				title: 'Access Code',
				introduction: 'Nova authorization access code',
			},
		},
		system: {
			language: {
				title: 'Language',
				introduction: 'System language',
			},
		},
		supabase: {
			url: {
				title: 'Reuqest Url',
				introduction: '',
			},
			token: {
				title: 'Token',
				introduction: 'Supabase Token',
			},
		},
	},
	float_question: {
		subject: 'Question',
		placeholder: 'Ask your question and press Enter to send',
	},
	float_translation: {
		english: 'English',
		chinese: 'Chinese',
	},

	textarea: {
		placeholder: 'Press Ctrl + Enter to send message',
	},
	send: 'Send',
	record: (amount: string | number) => `Total ${amount} records`,
	chat: {
		firstQuestion: 'How can I assist you??',
	},

	empty: {
		describe: 'Smarter and more visually appealing Chat GPT WEB',
		introduction: [
			`Run locally on your browser - no need to install any applications No need`,
			`No need for users in China to use a VPN`,
			`Support microphone input - using Tencent Cloud Speech Recognition`,
			`API key and data stored in local storage - ensuring your data privacy and security`,
		],
		createFirstChat: 'Create First Chat',
		adding: 'Adding an OpenAI key or access token',
	},
	request: {
		overuse:
			'Overuse detected, access frequency limit exceeded for more than three minutes. Please try again later',
		timedOut: 'Request timeout, please try again later',
	},
};
