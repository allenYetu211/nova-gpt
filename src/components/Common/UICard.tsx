/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-02 20:15:51
 * @LastEditTime: 2023-05-09 11:23:57
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
		padding: 0,
		// background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.light[0],
		background:
			theme.colorScheme === 'dark'
				? theme.colors.card_utils_dark_background[0]
				: theme.colors.card_utils_light_background[0],
		overflow: 'hidden',
		borderRadius: theme.other.br24,
		border: theme.other.border01,
	},
	utils: {
		padding: `0 ${theme.spacing.md}`,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.light[6],
	},
	container: {
		background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.light[1],
		padding: 0,
		borderRadius: theme.other.br24,
		border: theme.other.border01,
		borderWidth: `0.1rem 0 0 0`,
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
