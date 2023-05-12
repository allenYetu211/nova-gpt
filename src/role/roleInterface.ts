import { Message } from '@/stores/ChatStore';
import { SettingsForm } from '@/stores/SettingStore';

export interface RolePlayType {
	title: string;
	avatar: string;
	user_avatar: string;
	system_avatar: string;
	message: Partial<Message>;
	openAiConfig?: Partial<SettingsForm>;
}
