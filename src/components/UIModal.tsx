/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-03 08:06:57
 * @LastEditTime: 2023-05-03 09:50:34
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/UIModal.tsx
 */
import { UICard, UICardProps } from './UICard';
import { FC } from 'react';
import { Modal, createStyles, ModalProps } from '@mantine/core';

interface UIModalProps extends UICardProps {
	opened: boolean;
	close: () => void;
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
			padding: `${theme.radius.xs} ${theme.radius.xl}`,
		},
		[`& .card-box-container`]: {
			padding: `${theme.radius.xs} ${theme.radius.xl}`,
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
	const { children, container, opened, close } = props;
	return (
		<Modal
			className={classes.modalContainer}
			id={'modal'}
			opened={opened}
			onClose={close}
			withCloseButton={false}
			radius={theme.radius.xl}
			padding={0}
			overlayProps={{
				style: {
					height: '100vh',
				},
			}}
		>
			<UICard container={container}>{children}</UICard>
		</Modal>
	);
};
