/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-08-27 11:20:02
 * @LastEditTime: 2023-08-27 11:29:50
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/stores/RolePlayStore.ts
 */
import { create } from 'zustand';
import { ROLE_LIST, RolePlayType } from '@/role';
import { persist } from 'zustand/middleware';

export interface RolePlayState {
	role_list: RolePlayType[];
}

export const initialState = {
	role_list: ROLE_LIST,
};

const excludeKeys = [''];

const store = () => ({ ...initialState } as RolePlayState);

export const useRolePlay = create<RolePlayState>(store);

export const useRolePlayStore = create<RolePlayState>()(
	persist(store, {
		name: 'rolepalys',
		partialize: (state) =>
			Object.fromEntries(Object.entries(state).filter(([key]) => !excludeKeys.includes(key))),
	}),
);
