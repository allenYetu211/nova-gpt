/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-23 21:39:04
 * @LastEditTime: 2023-04-30 10:47:46
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/.cz-config.js
 */
module.exports = {
	// type 类型（定义之后，可通过上下键选择）
	types: [
		{ value: 'feat', name: '[feat]: New feature' },
		{ value: 'fix', name: '[fix]: Bug fix' },
		{ value: 'docs', name: '[docs]: Documentation comment' },
		{
			value: 'refactor',
			name: '[refactor]: Code refactoring (no new features or bug fixes)',
		},
		{ value: 'test', name: '[test]: Add test' },
		{ value: 'perf', name: '[perf]: Performance optimization' },
		{
			value: 'chore',
			name: '[chore]: Other modifications, such as formatting, adding tests, rollback, build process, dependency and version management.',
		},
	],

	// scope 类型（定义之后，可通过上下键选择）
	// scopes: [
	//   ['components', '组件相关'],
	//   ['hooks', 'hook 相关'],
	//   ['utils', 'utils 相关'],
	//   ['element-ui', '对 element-ui 的调整'],
	//   ['styles', '样式相关'],
	//   ['deps', '项目依赖'],
	//   ['auth', '对 auth 修改'],
	//   ['other', '其他修改'],
	//   // 如果选择 custom，后面会让你再输入一个自定义的 scope。也可以不设置此项，把后面的 allowCustomScopes 设置为 true
	//   ['custom', '以上都不是？我要自定义']
	// ].map(([value, description]) => {
	//   return {
	//     value,
	//     name: `${value.padEnd(30)} (${description})`
	//   }
	// }),

	// 是否允许自定义填写 scope，在 scope 选择的时候，会有 empty 和 custom 可以选择。
	// allowCustomScopes: true,

	// allowTicketNumber: false,
	// isTicketNumberRequired: false,
	// ticketNumberPrefix: 'TICKET-',
	// ticketNumberRegExp: '\\d{1,5}',

	// 针对每一个 type 去定义对应的 scopes，例如 fix
	/*
    scopeOverrides: {
      fix: [
        { name: 'merge' },
        { name: 'style' },
        { name: 'e2eTest' },
        { name: 'unitTest' }
      ]
    },
    */

	// 交互提示信息
	messages: {
		type: 'Make sure this submission follows: Front-end code standards!\nChoose the type of submission:',
		scope: '\nChoose a scope (optional):',
		// When custom scope is selected
		customScope: 'Enter a custom scope:',
		subject: 'Enter a brief and concise description of the changes:\n',
		body: 'Enter a more detailed description of the changes (optional). Use "|" to create new lines:\n',
		breaking: 'List any breaking changes (optional):\n',
		footer: 'List any ISSUES CLOSED related to the changes (optional). For example: #31, #34:\n',
		confirmCommit: 'Confirm the submission? ',
	},

	// Only ask for breaking message for feat or fix types
	allowBreakingChanges: ['feat', 'fix'],

	// Skip the following questions
	skipQuestions: ['scope', 'body', 'breaking', 'footer'],

	subjectLimit: 100, // subject character limit
	breaklineChar: '|', // line break character, used for body and footer
	// footerPrefix : 'ISSUES CLOSED:'
	// askForBreakingChangeFirst : true,
};
