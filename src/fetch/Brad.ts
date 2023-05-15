/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-15 15:10:32
 * @LastEditTime: 2023-05-15 16:12:19
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/fetch/Brad.ts
 */
class GoogleBard {
	private contextIds: string[] = ['', '', ''];
	private atValue: string = '';
	private blValue: string = '';
	constructor() {
		this.requestParams();
	}

	async requestGoogleBard() {
		const form = new FormData();
		form.append('at', this.atValue);
		form.append('f.req', 'value2');

		const result = await fetch(
			`https://bard.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate?bl=${this.blValue}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				},
			},
		);

		const data = result.json();
		console.log(data);
	}

	async requestParams() {
		const result = await fetch('https://bard.google.com/faq');
		const { data: html } = await result.json();
		this.atValue = this.extractFromHTML('SNlM0e', html) || '';
		this.blValue = this.extractFromHTML('cfb2h', html) || '';
	}

	extractFromHTML(variableName: string, html: string) {
		const regex = new RegExp(`"${variableName}":"([^"]+)"`);
		const match = regex.exec(html);
		return match?.[1];
	}
}
