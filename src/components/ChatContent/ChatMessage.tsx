/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-20 13:35:02
 * @LastEditTime: 2023-05-16 14:25:24
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/ChatContent/ChatMessage.tsx
 */
import { Markdown } from '@/components/ChatContent/Markdown';
import { Chat, Message } from '@/stores/ChatStore';
import { ControllerAbort } from '@/stores/SubmitAction';
import {
	Avatar,
	Badge,
	Box,
	Divider,
	Flex,
	Group,
	Loader,
	Text,
	createStyles,
	keyframes,
} from '@mantine/core';
import dayjs from 'dayjs';
import { FC, PropsWithChildren } from 'react';

interface ChatMessageProps {
	message: Message;
	onMouseUp?: (event: React.MouseEvent<HTMLElement, MouseEvent>, id: Message['id']) => void;
	avatar?: Chat['avatar'];
	system_avatar?: Chat['system_avatar'];
	user_avatar?: Chat['user_avatar'];
	share?: boolean;
	onClickPreamble?: () => void;
	onClickRepeat?: () => void;
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
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.light[0],
		},
		assistant: {
			marginLeft: theme.spacing.md,
			background: theme.colorScheme === 'dark' ? theme.colors.gradient[1] : theme.colors.light[1],
		},
		system: {
			marginLeft: theme.spacing.md,
			background: theme.colorScheme === 'dark' ? theme.colors.gradient[2] : theme.colors.gray[0],
		},
		exception: {
			background: theme.colorScheme === 'dark' ? theme.colors.gradient[5] : theme.colors.warn[0],
		},
		question: {
			color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.light[8],
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

export const ChatMessage: FC<PropsWithChildren<ChatMessageProps>> = ({
	message,
	onMouseUp,
	avatar,
	share = false,
	user_avatar,
	system_avatar,
	children,
}) => {
	const { content, role, exception, created_at, id, loading, question, preamble = false } = message;
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
							<Avatar
								sx={(theme) => ({ marginRight: theme.spacing.xs })}
								size="sm"
								color="grape"
								radius="xl"
							>
								{system_avatar}
							</Avatar>
							<Text color="#838e99" fz="xs">
								{dayjs(created_at).format('YYYY/MM/DD HH:mm:ss')}
							</Text>
						</Flex>
					)}

					{role === 'assistant' && (
						<Flex align="center" gap={10}>
							<Avatar
								sx={(theme) => ({ marginRight: theme.spacing.xs })}
								size="sm"
								color="grape"
								radius="xl"
							>
								{avatar}
							</Avatar>

							<Text color="#838e99" fz="xs">
								{dayjs(created_at).format('YYYY/MM/DD HH:mm:ss')}
							</Text>
							{/* TODO 待优化 */}
							{!share && loading && (
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
								{dayjs(created_at).format('YYYY/MM/DD HH:mm:ss')}
							</Text>
							{/* <IconUser className={classes.icon} /> */}
							<Avatar
								sx={(theme) => ({ marginLeft: theme.spacing.xs })}
								size="sm"
								color="grape"
								radius="xl"
							>
								{user_avatar}
							</Avatar>
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
						(role === 'assistant' || role === 'system') && onMouseUp && onMouseUp(event, id);
					}}
				>
					{children}

					{!content.length && role === 'assistant' && (
						<Loader color="dark" size="sm" variant="dots" />
					)}

					{question && (
						<>
							<Text truncate fz="xs" fs="italic" className={classes.question} mb={theme.spacing.xs}>
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
