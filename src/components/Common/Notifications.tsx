/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-12 18:40:25
 * @LastEditTime: 2023-05-12 18:48:50
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/Common/Notifications.tsx
 */
import { notifications as nc, NotificationProps } from '@mantine/notifications';

interface Notification {
	show: (props: NotificationProps) => void;
	hide: (id: string) => void;
}
export const notifications: Notification = {
	show: (props) => {
		nc.show({
			radius: 'md',
			color: 'grape',
			...props,
		});
	},
	hide: (id) => {
		nc.hide(id);
	},
};
