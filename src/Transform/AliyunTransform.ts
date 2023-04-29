/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-16 12:47:43
 * @LastEditTime: 2023-04-17 14:13:12
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/Transform/AliyunTransform.ts
 */

import { WSRequest } from '@/utils/WsRequest';
import { v4 as uuidv4 } from 'uuid';
import type { EventEmitter } from 'eventemitter3';

const token = `7bce9de7bf1242de9e060caa6bdcd72c`;
type Header = {
	message_id: string;
	task_id: string;
	namespace: string;
	name: string;
	appkey: string;
};

export class AliyunTransformAudio {
	public ws: WSRequest | null = null;
	public event: EventEmitter | null = null;
	private header: Header = {
		appkey: 'GBS08YSKIqJ9qoEo',
		message_id: '',
		namespace: 'SpeechTranscriber',
		name: '',
		task_id: '',
	};
	private firstSend = true;
	private wsReady = false;
	private firstMessageResponse = false;

	constructor() {
		this.ws = new WSRequest(`wss://nls-gateway.cn-shanghai.aliyuncs.com/ws/v1?token=${token}`);
		this.ws.connect();
		this.event = this.ws.event;
		this.header['task_id'] = uuidv4().replace(/-/g, '');
		this.header['message_id'] = uuidv4().replace(/-/g, '');

		this.ws.event.on('open', () => {
			this.wsReady = true;
		});

		this.ws.event.on('message', () => {
			this.firstMessageResponse = true;
		});
	}

	sendBlob(blob: Blob) {
		if (this.wsReady) {
			if (this.firstSend) {
				this.ws?.send(
					this.handleSendMessage({
						headers: {
							message_id: uuidv4().replace(/-/g, ''),
							name: 'StartTranscription',
						},
						payload: {
							format: 'opus',
							sample_rate: 16000,
							enable_intermediate_result: true,
							enable_punctuation_prediction: true,
							enable_inverse_text_normalization: true,
						},
					}),
				);
				this.firstSend = false;
			}
			this.firstMessageResponse && this.ws?.send(blob);
		}
	}

	send(data: any) {
		if (!data) return;
		this.ws?.send(this.handleSendMessage(data));
	}

	handleSendMessage(data: { headers: any; payload?: any }) {
		const { headers, payload } = data;
		return JSON.stringify(
			Object.assign(
				{
					header: {
						...this.header,
						...headers,
					},
				},
				payload ? { payload: data.payload } : {},
			),
		);
	}
}
