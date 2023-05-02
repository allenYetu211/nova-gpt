/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-20 13:35:02
 * @LastEditTime: 2023-05-02 17:34:27
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/ChatMessage.tsx
 */
import { Markdown } from '@/components/Markdown';
import IconBot from '@/images/svg/bot';
import IconLogo from '@/images/svg/logo';
import IconUser from '@/images/svg/user';
import { Message } from '@/stores/ChatStore';
import { ControllerAbort } from '@/stores/SubmitAction';
import {
	Box,
	Flex,
	Group,
	Loader,
	createStyles,
	keyframes,
	Text,
	Badge,
	Divider,
} from '@mantine/core';
import dayjs from 'dayjs';
import { FC } from 'react';

interface ChatMessageProps {
	message: Message;
	onMouseUp: (event: React.MouseEvent<HTMLElement, MouseEvent>, id: Message['id']) => void;
}

const rotate = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;

const useStyles = createStyles((theme) => {
	return {
		container: {
			padding: theme.spacing.xs,
			borderRadius: theme.radius.md,
			marginBottom: theme.spacing.xs,
			display: 'inline-block',
			maxWidth: '80%',
		},

		user: {
			marginRight: theme.spacing.md,
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
		},
		assistant: {
			marginLeft: theme.spacing.md,
			background: theme.colorScheme === 'dark' ? theme.colors.gradient[1] : theme.colors.gray[0],
		},
		system: {
			marginLeft: theme.spacing.md,
			background: theme.colorScheme === 'dark' ? theme.colors.gradient[2] : theme.colors.gray[0],
		},
		exception: {
			background: theme.colorScheme === 'dark' ? theme.colors.gradient[5] : theme.colors.gray[0],
		},

		icon: {
			width: 40,
			height: 40,
			padding: theme.spacing.xs,
		},

		loader: {
			animation: `${rotate} 2s linear infinite`,
		},
	};
});

export const ChatMessage: FC<ChatMessageProps> = ({ message, onMouseUp }) => {
	const { content, role, exception, createdAt, id, loading, question } = message;
	const { classes, cx, theme } = useStyles();

	return (
		<>
			<Flex
				align={role === 'user' ? 'flex-end' : 'flex-start'}
				justify="flex-start"
				direction="column"
				sx={{
					fontSize: theme.fontSizes.sm,
					'&:hover': {
						[`& .badge-utils`]: {
							opacity: 1,
							pointerEvents: 'all',
						},
					},
				}}
			>
				<Group>
					{role === 'system' && (
						<Flex align="center">
							<IconBot className={classes.icon} />
							<Text color="#838e99" fz="xs">
								{dayjs(createdAt).format('YYYY/MM/DD HH:mm:ss')}
							</Text>
						</Flex>
					)}

					{role === 'assistant' && (
						<Flex align="center">
							<IconLogo className={classes.icon} />
							<Text color="#838e99" fz="xs">
								{dayjs(createdAt).format('YYYY/MM/DD HH:mm:ss')}
							</Text>
							{loading && (
								<Badge
									className="badge-utils"
									sx={{
										cursor: 'pointer',
										opacity: 0,
										pointerEvents: 'none',
									}}
									onClick={() => {
										ControllerAbort.stop(id);
									}}
								>
									Stop
								</Badge>
							)}
						</Flex>
					)}

					{role === 'user' && (
						<Flex align="center">
							<Text color="#838e99" fz="xs">
								{dayjs(createdAt).format('YYYY/MM/DD HH:mm:ss')}
							</Text>
							<IconUser className={classes.icon} />
						</Flex>
					)}
				</Group>

				<Box
					className={cx(classes.container, 'markdown-body', {
						[classes.user]: role === 'user',
						[classes.assistant]: role === 'assistant',
						[classes.system]: role === 'system',
						[classes.exception]: exception,
						['allow-select']: role === 'assistant' || role === 'system',
					})}
					onMouseUp={(event) => {
						(role === 'assistant' || role === 'system') && onMouseUp(event, id);
					}}
				>
					{!content.length && role === 'assistant' && (
						<Loader color="dark" size="sm" variant="dots" />
					)}

					{question && (
						<>
							<Text truncate fz="xs" fs="italic" color="white" mb={theme.spacing.xs}>
								{question}
							</Text>
							<Divider sx={{ marginBottom: theme.spacing.xs }} />
						</>
					)}
					<Markdown content={content} />
				</Box>
			</Flex>
		</>
	);
};
