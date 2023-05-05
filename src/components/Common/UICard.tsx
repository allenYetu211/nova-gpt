/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-02 20:15:51
 * @LastEditTime: 2023-05-05 16:02:06
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/Common/UICard.tsx
 */
import React, { FC, PropsWithChildren } from 'react';
import { createStyles, Group, Box, Flex, Styles, CSSObject } from '@mantine/core';

export interface UICardProps extends PropsWithChildren {
	container?: React.ReactNode;
	cardBoxStyles?: CSSObject;
}
const useStyles = createStyles((theme) => ({
	wrapper: {
		width: '100%',
		background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.light[0],
		borderRadius: theme.radius.xl,
		padding: 0,
		overflow: 'hidden',
	},
	utils: {
		padding: `0 ${theme.spacing.md}`,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.light[6],
	},
	container: {
		background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.light[1],
		padding: 0,
		borderRadius: theme.radius.xl,
		boxShadow:
			theme.colorScheme === 'dark'
				? `-1px 5px 25px ${theme.colors.dark[9]}}`
				: `-1px 5px 25px ${theme.colors.light[3]}}`,
		lineHeight: 0,
	},
}));

export const UICard: FC<UICardProps> = (props) => {
	const { children, container, cardBoxStyles } = props;
	const { classes, cx } = useStyles();

	return (
		<Flex direction="column" justify="center" className={cx(classes.wrapper, 'card-container')}>
			{container ? (
				<Group spacing="xs" className={cx(classes.utils, 'card-utils')}>
					{container}
				</Group>
			) : null}

			<Box sx={cardBoxStyles} className={cx(classes.container, 'card-box-container')}>
				{children}
			</Box>
		</Flex>
	);
};
