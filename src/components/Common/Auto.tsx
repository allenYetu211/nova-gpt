import { FC, PropsWithChildren, useCallback } from 'react';
import { UserState, useUserStore } from '@/stores/UserStore';

interface AutoComponentsProps {
	allowedPermission: UserState['permissions'][number][];
}

export const AutoComponents: FC<PropsWithChildren<AutoComponentsProps>> = ({
	children,
	allowedPermission,
}) => {
	const permissions = useUserStore((state) => state.permissions);
	const contrast = useCallback(() => {
		return allowedPermission.some((item) => permissions.includes(item));
	}, [allowedPermission, permissions]);

	if (contrast()) {
		return <>{children}</>;
	} else {
		return null;
	}
};
