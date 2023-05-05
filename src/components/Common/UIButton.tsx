import i18n from '@/i18n';
import { Button, ButtonProps, createStyles } from '@mantine/core';
import { FC } from 'react';

const useStyles = createStyles((theme) => ({
	button: {
		background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.light[4],
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.light[0],
	},
}));

interface UIButtonProps extends ButtonProps {
	onClick?: () => void;
}

export const UIButton: FC<UIButtonProps & React.RefAttributes<HTMLButtonElement>> = (props) => {
	const { children } = props;
	const { classes, theme } = useStyles();
	return (
		<Button
			className={classes.button}
			variant="white"
			fz={theme.fontSizes.xs}
			radius={theme.radius.xl}
			{...props}
		>
			{children ?? i18n.send}
		</Button>
	);
};
