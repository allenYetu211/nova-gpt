import { Button, ButtonProps, createStyles } from '@mantine/core';
import { FC } from 'react';

const useStyles = createStyles((theme) => ({
	button: {
		background: theme.colors.dark[6],
		color: theme.colors.dark[0],
	},
}));

interface UIButtonProps extends ButtonProps {}

export const UIButton: FC<UIButtonProps> = (props) => {
	const { classes, theme } = useStyles();
	return (
		<Button
			onClick={() => {
				console.log('click');
			}}
			className={classes.button}
			variant="white"
			fz={theme.fontSizes.xs}
			radius={theme.radius.xl}
			{...props}
		>
			Send
		</Button>
	);
};
