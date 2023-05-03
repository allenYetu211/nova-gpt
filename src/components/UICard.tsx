/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-02 20:15:51
 * @LastEditTime: 2023-05-02 21:20:42
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/UICard.tsx
 */
import React, { FC, PropsWithChildren } from 'react';
import { createStyles, Group, Box, Flex } from '@mantine/core';

export interface UICardProps extends PropsWithChildren {
	container: React.ReactNode;
}
const useStyles = createStyles((theme) => ({
	wrapper: {
		width: '100%',
		background: theme.colors.dark[6],
		borderRadius: theme.radius.xl,
		padding: 0,
		overflow: 'hidden',
	},
	utils: {
		padding: `0 ${theme.spacing.md}`,
	},
	container: {
		background: theme.colors.dark[8],
		padding: 0,
		borderRadius: theme.radius.xl,
		boxShadow: `-1px 5px 25px ${theme.colors.dark[9]}}`,
		lineHeight: 0,
	},
}));

export const UICard: FC<UICardProps> = (props) => {
	const { children, container } = props;
	const { classes, theme, cx } = useStyles();

	return (
		<Flex direction="column" justify="center" className={cx(classes.wrapper, 'card-container')}>
			<Group spacing="xs" className={cx(classes.utils, 'card-utils')}>
				{container}
			</Group>

			<Box className={cx(classes.container, 'card-box-container')}>{children}</Box>
		</Flex>
	);
};
