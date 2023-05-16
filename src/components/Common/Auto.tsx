/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-11 16:26:58
 * @LastEditTime: 2023-05-16 17:02:47
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/Common/Auto.tsx
 */
import { FC, PropsWithChildren, useCallback } from 'react';
import { UserState, useUserStore } from '@/stores/UserStore';

interface AutoComponentsProps {
	allowedPermission: UserState['permissions'][number][];
	children:
		| ((state: boolean) => React.ReactElement<any, any> | React.ReactElement)
		| React.ReactElement<any, any>;
}

export const AutoComponents = ({ children, allowedPermission }: AutoComponentsProps) => {
	const permissions = useUserStore((state) => state.permissions);
	const contrast = useCallback(() => {
		return allowedPermission.some((item) => permissions.includes(item));
	}, [allowedPermission, permissions]);

	if (typeof children === 'function') {
		return children(contrast());
	} else {
		return contrast() ? <>{children}</> : null;
	}
};
