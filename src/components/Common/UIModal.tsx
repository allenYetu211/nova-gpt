/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-03 08:06:57
 * @LastEditTime: 2023-05-06 10:28:07
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/Common/UIModal.tsx
 */
import { UICard, UICardProps } from '@/components/Common/UICard';
import { Modal, ModalProps, createStyles } from '@mantine/core';
import { FC } from 'react';

interface UIModalProps extends UICardProps, ModalProps {
	cardProps?: UICardProps;
}

const useStyles = createStyles((theme) => ({
	modalContainer: {
		[`&.mantine-Modal-body`]: {
			background: theme.colors.dark[6],
			height: '100vh',
		},
		// [`& .card-container`]: {
		// 	padding: `${theme.radius.xs} ${theme.radius.xl}`,
		// },
		[`& .card-utils`]: {
			padding: `0.25rem ${theme.spacing.xs}`,
		},
		[`& .card-box-container`]: {
			padding: `${theme.spacing.xs} ${theme.spacing.xs}`,
			minHeight: `80px`,
			display: 'flex',
			justifyItems: 'center',
			alignItems: 'center',
			width: '100%',
		},
	},
}));

export const UIModal: FC<UIModalProps> = (props) => {
	const { classes, theme } = useStyles();
	const { children, container, cardBoxStyles, overlayProps, ...other } = props;
	return (
		<Modal
			className={classes.modalContainer}
			withCloseButton={false}
			radius={theme.radius.xl}
			padding={0}
			overlayProps={Object.assign(
				{
					color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.light[1],
					opacity: 0.55,
					blur: 3,
				},
				overlayProps,
			)}
			{...other}
		>
			<UICard container={container} cardBoxStyles={cardBoxStyles}>
				{children}
			</UICard>
		</Modal>
	);
};
