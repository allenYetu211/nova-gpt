import { Message } from '@/stores/ChatStore';
import { SettingsForm } from '@/stores/SettingStore';

export interface RolePlayType {
	title: string;
	avatar: string;
	userAvatar?: string;
	systemAvatar?: string;
	message: Partial<Message>;
	openAiConfig?: Partial<SettingsForm>;
}
