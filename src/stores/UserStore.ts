/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-11 17:01:05
 * @LastEditTime: 2023-05-11 17:03:26
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/stores/UserStore.ts
 */
import { create } from 'zustand';

export type PermissionsType = 'logged' | 'chat';

export interface UserState {
	logged: boolean;
	share: boolean;
	permissions: PermissionsType[];
}

export const initialState = {
	logged: false,
	share: false,
	permissions: [],
};

const store = () => ({ ...initialState } as UserState);

export const useUserStore = create<UserState>(store);
