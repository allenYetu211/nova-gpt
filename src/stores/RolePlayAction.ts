/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-08-27 11:23:08
 * @LastEditTime: 2023-08-27 11:49:24
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/stores/RolePlayAction.ts
 */
import { useRolePlayStore, RolePlayState } from './RolePlayStore';

import { ROLE_LIST, RolePlayType } from '@/role';

const getRolePlay = useRolePlayStore.getState;
const setRolePlay = useRolePlayStore.setState;

export const createNewRolePlay = (newState: RolePlayType) => {
	setRolePlay((state) => {
		return {
			role_list: [...state.role_list, newState],
		};
	});
};

export const deleteRolePlay = (index: number) => {
	const { role_list } = getRolePlay();
	role_list.splice(index, 1);
	setRolePlay((state) => ({ role_list }));
};
