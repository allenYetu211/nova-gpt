/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-12 14:48:26
 * @LastEditTime: 2023-05-12 15:48:11
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/Common/UIBadge.tsx
 */
import { PropsWithChildren, FC } from 'react';
import { ActionIcon, Avatar, Badge, Group, rem, BadgeProps } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

export const UIBadge: FC<PropsWithChildren<BadgeProps & React.DOMAttributes<HTMLDivElement>>> = (
	props,
) => {
	const { children, ...other } = props;
	return (
		<Badge
			sx={(theme) => ({
				cursor: 'pointer',
				color: theme.colorScheme === 'dark' ? '#fff' : '#000',
				padding: theme.spacing.xs,
				background:
					theme.colorScheme === 'dark'
						? theme.colors.dark_background[1]
						: theme.colors.light_background[1],
				boxShadow: theme.shadows.xl,
			})}
			radius="sm"
			variant="filled"
			{...other}
		>
			{children}
		</Badge>
	);
};

interface UIMessageBadgeProps
	extends BadgeProps,
		React.DOMAttributes<HTMLDivElement & HTMLButtonElement> {}

export const UIMessageBadge: FC<PropsWithChildren<UIMessageBadgeProps>> = (props) => {
	const { children, onClick, ...other } = props;
	return (
		<UIBadge
			onClick={onClick}
			{...other}
			rightSection={
				<ActionIcon>
					<IconX size={rem(10)} />
				</ActionIcon>
			}
		>
			{children}
		</UIBadge>
	);
};
