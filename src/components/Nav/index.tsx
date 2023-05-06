/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-14 15:01:08
 * @LastEditTime: 2023-05-06 11:10:21
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/Nav/index.tsx
 */
import {
	ActionIcon,
	Box,
	Text,
	Divider,
	Flex,
	Navbar,
	Tooltip,
	createStyles,
	Group,
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';
import { ChatSessionInput } from '@/components/Nav/ChatSessionInput';
import { changeActiveChatId, newChat } from '@/stores/ChatAction';
import { useChatStore } from '@/stores/ChatStore';
import { useSettingStore } from '@/stores/SettingStore';
import { switchIsSetting } from '@/stores/SettingAction';
import {
	IconPlus,
	IconSettings,
	IconX,
	IconArrowBarToRight,
	IconArrowBarToLeft,
} from '@tabler/icons-react';
import IconLogo from '@/images/svg/logo';
import i18n from '@/i18n';

const useStyles = createStyles((theme) => ({
	chatItem: {
		width: '100%',
		padding: theme.spacing.xs,
		borderRadius: theme.radius.md,
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.light[2],
		},
	},
	chatItemActive: {
		background: theme.colorScheme === 'dark' ? theme.colors.gradient[3] : theme.colors.light[1],
	},
	sessionContainer: {
		height: '100%',
	},
	chatContainer: {
		flex: 1,
		width: '100%',
		overflow: 'auto',
	},
	icon: {
		width: 40,
		height: 40,
		padding: theme.spacing.xs,
	},
	// nav: {
	//   [`@media (min-width: ${theme.breakpoints.sm})`]: {
	//     width: 100,
	//   },
	//   [`@media (min-width: ${theme.breakpoints.md})`]: {
	//     width: 50,
	//   },
	// },
}));

export function Nav() {
	const { classes, theme, cx } = useStyles();
	const chats = useChatStore((state) => state.chats);
	const activeChatId = useChatStore((state) => state.activeChatId);
	const isMobile = useSettingStore((state) => state.isMobile);
	const [opened, { toggle }] = useDisclosure(!isMobile);

	const tooltipCommon = {
		openDelay: 200,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.light[3],
	};

	const chatsList = chats
		? chats.map((chat) => {
				return (
					<Box
						key={chat.id}
						className={cx(classes.chatItem, {
							[classes.chatItemActive]: activeChatId === chat.id,
						})}
						onClick={() => changeActiveChatId(chat.id)}
					>
						<ChatSessionInput
							title={chat.title}
							id={chat.id}
							createdAt={chat.createdAt}
							avatar={chat.avatar}
							amount={chat.message.length}
						/>
					</Box>
				);
		  })
		: [];

	chatsList.reverse();

	return (
		<Box
			sx={{
				position: 'relative',
			}}
		>
			<Navbar
				fixed={true}
				width={{ base: 330 }}
				sx={(theme) => ({
					padding: '20px',
					background: 'transparent',
					border: 'none',
					[`@media (max-width: ${theme.breakpoints.sm})`]: {
						width: '100%',
						background: theme.colors.dark[7],
						display: opened ? 'flex' : 'none',
					},
				})}
				p="xs"
			>
				{/* <AudioAnimation /> */}

				<Flex
					direction="column"
					sx={(theme) => ({
						height: '100%',
						background:
							theme.colorScheme === 'dark' ? theme.colors.gradient[2] : theme.colors.dark[0],
						borderRadius: theme.radius.xl,
						padding: theme.spacing.xl,
						boxShadow: theme.shadows.xl,
					})}
				>
					<Flex
						sx={{
							marginBottom: theme.spacing.xl,
						}}
						justify="space-between"
						align="center"
					>
						<Box>
							<Text fw={700}> {i18n.title}</Text>
							{/* <Text size="xs">Chat GPT NEXT WEB </Text> */}
							<Text size="xs">{i18n.introduction}</Text>
						</Box>
						<IconLogo height="40px" width="40px" />
					</Flex>

					<Flex gap="md" justify="space-between" align="center">
						<Group>
							<Tooltip {...tooltipCommon} label={i18n.Nav.new}>
								<ActionIcon
									variant="default"
									size="xs"
									onClick={() => {
										newChat();
									}}
								>
									<IconPlus />
								</ActionIcon>
							</Tooltip>

							<Tooltip {...tooltipCommon} label={i18n.Nav.setting}>
								<ActionIcon variant="default" size="xs" onClick={switchIsSetting}>
									<IconSettings />
								</ActionIcon>
							</Tooltip>
						</Group>

						<Group
							sx={(theme) => ({
								[`@media (min-width: ${theme.breakpoints.sm})`]: {
									display: 'none',
								},
							})}
						>
							{/* 添加navbar 开关  */}
							<ActionIcon variant="default" size="xs" onClick={toggle}>
								<IconArrowBarToLeft />
							</ActionIcon>
						</Group>
					</Flex>

					<Divider my="sm" variant="dashed" />

					<Flex
						mih={50}
						gap="md"
						justify="space-evenly"
						align="center"
						direction="column"
						wrap="wrap"
						className={classes.sessionContainer}
					>
						<Flex
							justify="flex-start"
							align="center"
							direction="column"
							wrap="nowrap"
							gap="md"
							className={classes.chatContainer}
						>
							{chatsList}
						</Flex>
					</Flex>
				</Flex>
			</Navbar>

			<Group
				sx={(theme) => ({
					display: !opened ? 'block' : 'none',
					[`@media (min-width: ${theme.breakpoints.sm})`]: {
						display: 'none',
					},
					position: 'absolute',
					left: 5,
					top: 10,
				})}
			>
				{/* 添加navbar 开关  */}
				<ActionIcon variant="default" size="xs" onClick={toggle}>
					<IconArrowBarToRight />
				</ActionIcon>
			</Group>
		</Box>
	);
}
