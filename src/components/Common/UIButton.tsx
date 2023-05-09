/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-03 09:53:00
 * @LastEditTime: 2023-05-09 10:01:57
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/Common/UIButton.tsx
 */
import i18n from '@/i18n';
import {
	ActionIcon,
	ActionIconProps,
	Button,
	ButtonProps,
	createStyles,
	Tooltip,
} from '@mantine/core';
import { FC, PropsWithChildren, DOMAttributes, ReactNode, forwardRef } from 'react';

const useStyles = createStyles((theme) => ({
	button: {
		// background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.light[4],
		// color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.light[0],
	},
}));

interface UIButtonProps extends ButtonProps {
	onClick?: () => void;
}

export const UIButton: FC<UIButtonProps & React.RefAttributes<HTMLButtonElement>> = (props) => {
	const { classes, theme, cx } = useStyles();
	const {
		children,
		variant = 'outline',
		fz = theme.fontSizes.xs,
		radius = 'md',
		className,
		sx,
		color = theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.light[4],
		...other
	} = props;

	return (
		<Button
			className={cx(classes.button, className)}
			sx={Object.assign(
				{
					color,
					borderColor: color,
				},
				sx,
			)}
			variant={variant}
			fz={fz}
			radius={radius}
			{...other}
		>
			{children ?? i18n.send}
		</Button>
	);
};

interface UIActionButtonProps extends ActionIconProps, DOMAttributes<HTMLButtonElement> {
	label?: string;
}

export const UIActionButton: FC<PropsWithChildren<UIActionButtonProps>> = forwardRef<
	HTMLButtonElement,
	UIActionButtonProps
>((props, ref) => {
	const { children, size = 'xs', label, radius = 'md', variant = 'subtle', ...other } = props;

	const PackageComponents = (component: ReactNode) => {
		return (
			<Tooltip
				sx={(theme) => ({
					openDelay: 200,
					color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.light[2],
				})}
				label={label}
			>
				{component}
			</Tooltip>
		);
	};

	const ActionButton = (
		<ActionIcon ref={ref} size={size} radius={radius} variant={variant} {...other}>
			{children}
		</ActionIcon>
	);

	return label ? PackageComponents(ActionButton) : ActionButton;
});
