import { Message } from '@/stores/ChatStore';
import { SettingsForm } from '@/stores/SettingStore';

export interface RolePlayType {
	name: string;
	avatar: string;
	message: Partial<Message>;
	openAiConfig?: Partial<SettingsForm>;
}
