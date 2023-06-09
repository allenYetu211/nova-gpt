/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-23 22:06:37
 * @LastEditTime: 2023-05-16 15:44:05
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/stores/SettingStore.ts
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const excludeKeys = ['userState'];

export const paramKeys = [
	'model',
	'temperature',
	'top_p',
	'n',
	'stop',
	'max_tokens',
	'presence_penalty',
	'frequency_penalty',
	'logit_bias',
];

export const defaultSettings = {
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
};

export interface SettingsForm {
	// GPT
	model: string;
	temperature: number;
	top_p: number;
	n: number;
	stop: string;
	max_tokens: number;
	presence_penalty: number;
	frequency_penalty: number;
	logit_bias: string;
	auto_title: boolean;
}

export type Language = 'zh_cn' | 'en';
export interface SettingState {
	supabase: {
		url: string;
		token: string;
	};
	openNav: boolean;
	accessToken: string;
	openAI: {
		/**
		 * open ai config
		 */
		key: string;
		models: string[];
		history: number;
		config: SettingsForm;
	};
	translations: string[];
	language: Language;
	languages: Language[];

	colorScheme: 'light' | 'dark';

	bard: {
		cookie: string;
	};

	userState: any;
}

const initialSettingState: SettingState = {
	supabase: {
		url: process.env.NEXT_PUBLIC_SUPBASE_URL || '',
		token: process.env.NEXT_PUBLIC_SUPBASE_TOKEN || '',
	},
	openNav: false,
	accessToken: '',
	openAI: {
		key: '',
		models: [
			'gpt-3.5-turbo',
			'gpt-3.5-turbo-0301',
			'gpt-4-32k-0314',
			'gpt-4-32k',
			'gpt-4-0314',
			'gpt-4',
		],
		history: 4,
		config: defaultSettings,
	},
	translations: ['zh_cn', 'en'],

	language: 'zh_cn',
	languages: ['zh_cn', 'en'],

	colorScheme: 'dark',

	bard: {
		cookie: '',
	},

	userState: null,
};

const store = () => ({ ...initialSettingState } as SettingState);

export const useSettingStore = create<SettingState>()(
	persist(store, {
		name: 'chat-setting-store',
		partialize: (state) =>
			Object.fromEntries(Object.entries(state).filter(([key]) => !excludeKeys.includes(key))),
	}),
);
