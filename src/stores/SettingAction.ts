/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-23 22:13:05
 * @LastEditTime: 2023-04-24 23:23:32
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/stores/SettingAction.ts
 */
import { useSettingStore, SettingState } from './SettingStore';

const getSetting = useSettingStore.getState;
const setSetting = useSettingStore.setState;

export const updateSetting = (newState: Partial<Pick<SettingState, 'openNav' | 'bardCookie'>>) =>
	setSetting(() => ({ ...newState }));

export const switchColorScheme = (newState: SettingState['colorScheme']) => {
	setSetting(() => ({
		colorScheme: newState,
	}));
};

export const updateOpenAIConfig = (newState: Partial<SettingState['openAI']['config']>) => {
	setSetting((state) => ({
		openAI: {
			...state.openAI,
			config: {
				...state.openAI.config,
				...newState,
			},
		},
	}));
};

export const updateLanguage = (newState: Partial<SettingState['language']>) => {
	setSetting(() => ({
		language: newState,
	}));
};

export const updateOpenAIKey = (newState: Partial<SettingState['openAI']['key']>) => {
	setSetting((state) => ({
		openAI: {
			...state.openAI,
			key: newState,
		},
	}));
};

export const updateAccessToken = (newState: Partial<SettingState['accessToken']>) => {
	setSetting(() => ({
		accessToken: newState,
	}));
};

export const updateSupabase = (newState: Partial<SettingState['supabase']>) => {
	setSetting((state) => ({
		supabase: {
			...state.supabase,
			...newState,
		},
	}));
};

export const updateOpenAIHistory = (newState: SettingState['openAI']['history']) => {
	setSetting((state) => ({
		openAI: {
			...state.openAI,
			history: newState,
		},
	}));
};

// export const switchIsSetting = () => {
// 	setSetting((state) => ({
// 		isSetting: !state.isSetting,
// 	}));
// };

export const toggleTranslations = (newState: string) => {
	const translations = getSetting().translations;
	translations.includes(newState)
		? translations.splice(translations.indexOf(newState), 1)
		: translations.push(newState);
	setSetting(() => ({
		translations,
	}));
};
