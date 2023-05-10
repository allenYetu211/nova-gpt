/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-07 14:36:18
 * @LastEditTime: 2023-05-09 16:58:35
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/lib/supabaseClient.ts
 */
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Chat, Message } from '@/stores/ChatStore';
import { useSettingStore } from '@/stores/SettingStore';

interface DBBase {
	chat: Partial<Pick<Chat, 'id' | 'created_at' | 'avatar' | 'title'>>;
	message: Partial<Message & { chat_id: string }>;
}
interface handledDBType {
	supabase: SupabaseClient | null;
	report: boolean;
	insert: (base: keyof DBBase, data: DBBase[keyof DBBase][]) => Promise<void>;
	upsert: (base: keyof DBBase, data: DBBase[keyof DBBase]) => Promise<void>;
	select: (base: keyof DBBase, target: string, eq: { [key: string]: string }) => Promise<any>;
}

const handledDB: handledDBType = {
	supabase: null,
	report: true,
	insert: async function (base, data) {
		this.supabase && (await this.supabase.from(base).insert(data));
	},
	upsert: async function (base, data) {
		this.supabase && (await this.supabase.from(base).upsert(data));
	},
	select: async function (base, target, eq) {
		if (!this.report) {
			return { data: [] };
		}
		return this.supabase && (await this.supabase.from(base).select(target).eq(eq.key, eq.value));
	},
};

export const supabase = new Proxy(handledDB, {
	get: function (target, key: keyof handledDBType) {
		const origMethod = target[key];
		if (!target['supabase']) {
			const { url, token } = useSettingStore.getState().supabase;
			if (url !== '' || token !== '') {
				try {
					target['supabase'] = createClient(url, token);
					if (key === 'supabase') return target['supabase'];
				} catch (e) {
					console.log('e', e);
				}
			}
		}

		if (typeof origMethod === 'function') {
			return function (...args: any[]) {
				// @ts-ignore
				return origMethod.apply(target, args);
			};
		}
	},
});
