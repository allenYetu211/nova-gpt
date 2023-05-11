import { PermissionsType, useUserStore, UserState } from './UserStore';

const getUser = useUserStore.getState;
const setUser = useUserStore.setState;

export const updateUserState = (newState: Partial<UserState>) => setUser(() => newState);

export const getPermissions = () => {
	const { logged } = getUser();
	return [logged ?? 'logged'].filter(Boolean);
};

export const addPermissions = (newState: PermissionsType) => {
	let permissions = getUser().permissions;
	permissions = permissions.includes(newState) ? permissions : permissions.concat(newState);
	setUser(() => ({ permissions }));
};

export const removePermissions = (newState: PermissionsType) => {
	const permissions = getUser().permissions.filter((item) => item !== newState);
	setUser(() => ({ permissions }));
};
