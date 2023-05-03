/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-23 10:35:16
 * @LastEditTime: 2023-05-03 15:22:05
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/ChatTextareaInput.tsx
 */
import { createStyles } from '@mantine/core';
import { FC } from 'react';
import i18n from '@/i18n';

const useStyles = createStyles((theme) => ({
	textarea: {
		width: '100%',
		height: 125,
		minHeight: '100%',
		overflow: 'auto',
		border: 'none',
		borderRadius: theme.radius.xl,
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.light[1],
		color: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.light[6],
		// boxShadow: theme.shadows.sm,
		padding: theme.spacing.xl,
		fontSize: theme.fontSizes.sm,
		resize: 'none',
		['&:focus']: {
			outline: 'none',
		},
	},
}));

interface ChatTextareaInputProps {
	message: string;
	update: (message: string) => void;
	placeholder?: string;
	onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export const ChatTextareaInput: FC<ChatTextareaInputProps> = (props) => {
	const { message, update, placeholder, onKeyDown } = props;
	const { classes, cx } = useStyles();
	const onChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		update(e.target.value);
	};

	return (
		<textarea
			className={cx(classes.textarea, 'chat-textarea-input')}
			placeholder={placeholder ?? i18n.textarea.placeholder}
			value={message}
			onChange={onChangeTextarea}
			onKeyDown={onKeyDown}
		/>
	);
};
