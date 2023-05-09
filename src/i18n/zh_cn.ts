export const zh_cn = {
	Nav: {
		new: '新建聊天',
		setting: '设置',
	},
	title: 'Nova GTP',
	introduction: '构建你的聊天机器人',
	changeTitle: '修改聊天的标题',
	changeTitlePlaceholder: '输入新的标题名字',
	confirm: '确认',
	targetLanguage: '目标语言',
	languages: {
		zh_cn: '中文',
		en: '英文',
	},
	setting: {
		openai: {
			key: {
				title: 'key',
				introduction: 'open ai api 秘钥',
			},
			tokens: {
				title: 'max_tokens',
				introduction: '单次交互所用的最大 Token 数量',
			},
			temperature: {
				title: 'temperature',
				introduction: '回答随随机性 | 取值范围建议：0.7~ 1.0',
			},
			presence_penalty: {
				title: 'presence_penalty',
				introduction: 'GPT 惩罚机制 | 取值范围建议：0.9~ 1.2',
			},
			models: {
				title: 'models',
				introduction: '选择模型',
			},
			history: {
				title: 'history',
				introduction: '携带最大历史信息',
			},
		},
		access: {
			token: {
				title: '访问码',
				introduction: 'Nova 授权访问码',
			},
		},
		system: {
			language: {
				title: '语言',
				introduction: '系统语言',
			},
		},
		supabase: {
			url: {
				title: '请求地址',
				introduction: 'Supabase 请求地址',
			},
			token: {
				title: 'Token',
				introduction: 'Supabase 请求秘钥',
			},
		},
	},
	float_question: {
		subject: '问题',
		placeholder: '提出你的问题，使用 Enter 发送',
	},
	float_translation: {
		english: '英文',
		chinese: '中文',
	},

	textarea: {
		placeholder: 'Ctrl + Enter 发送消息',
	},
	send: '发送',
	record: (amount: string | number) => `共 ${amount} 条记录`,

	chat: {
		firstQuestion: '有什么能帮到你的呢?',
	},
	empty: {
		describe: '更聪明、更视觉吸引力的聊天GPT WEB。',
		introduction: [
			`在您的浏览器上本地运行——无需安装任何应用程序，无需使用VPN`,
			`中国境内用户无需使用VPN`,
			`支持麦克风输入——使用腾讯云语音识别`,
			`API密钥和数据存储在本地存储器中，保障您的数据隐私和安全性`,
		],
		createFirstChat: '创建第一个聊天',
		adding: '添加OpenAI密钥或访问令牌',
	},
	request: {
		overuse: '检测到过度使用，访问频率超过了三分钟的限制。请稍后再试',
		timedOut: '请求超时，请稍后再试',
	},
};
