/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-14 15:01:08
 * @LastEditTime: 2023-05-10 23:10:42
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/Nav/index.tsx
 */
import { ActionIcon, Box, Text, Divider, Flex, Navbar, createStyles, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ChatSessionInput } from '@/components/Nav/ChatSessionInput';
import { useChatStore } from '@/stores/ChatStore';

import { useSettingStore } from '@/stores/SettingStore';
import { IconArrowBarToRight } from '@tabler/icons-react';
import IconLogo from '@/images/svg/logo';
import i18n from '@/i18n';
import { NavContainer } from '@/components/Nav/NavContainer';
import { useRouter } from 'next/router';
import { UserManage } from './UserManage';

const useStyles = createStyles((theme) => ({
	chatItem: {
		width: '100%',
		padding: theme.spacing.xs,
		borderRadius: theme.radius.md,
		border: '0.1rem solid #5C6077',
		backgroundClip: `padding-box, border-box`,
		backgroundOrigin: `padding-box, border-box`,
		cursor: 'pointer',
		'&:hover': {
			border: '0.1rem solid #5C6077',
			color: '#fff',
			background:
				theme.colorScheme === 'dark' ? theme.colors.gradient[3] : theme.colors.gradient[6],
		},
	},
	chatItemActive: {
		border: '0.1rem solid transparent',
		backgroundImage:
			theme.colorScheme === 'dark'
				? `linear-gradient(to right, ${theme.colors.dark_background[0]}, ${theme.colors.dark_background[0]}), linear-gradient(90deg, #8F41E9, #578AEF)`
				: `linear-gradient(to right, #E6E5FF, #E6E5FF), linear-gradient(90deg, #8F41E9, #578AEF)`,
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
	const router = useRouter();
	const { classes, theme, cx } = useStyles();
	const chats = useChatStore((state) => state.chats);
	const activeChatId = useChatStore((state) => state.activeChatId);
	const isMobile = useSettingStore((state) => state.isMobile);
	const [opened, { toggle }] = useDisclosure(!isMobile);

	const chatsList = chats
		? chats.map((chat) => {
				return (
					<Box
						key={chat.id}
						className={cx(classes.chatItem, {
							[classes.chatItemActive]: activeChatId === chat.id,
						})}
						onClick={() => {
							router.push(`/chat/${chat.id}`);
						}}
					>
						<ChatSessionInput
							title={chat.title}
							id={chat.id}
							created_at={chat.created_at}
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
				width={{ base: 300 }}
				sx={(theme) => ({
					padding: '0rem !important',
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
						// background:
						// 	theme.colorScheme === 'dark' ? theme.colors.gradient[2] : theme.colors.dark[0],
						// borderRadius: theme.radius.xl,
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

					<NavContainer toggle={toggle} />

					<Divider sx={{ margin: `0 -1.5rem` }} my="sm" />

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

					<Divider my="sm" />
					<Box
						sx={{
							padding: '1rem',
						}}
					>
						<UserManage />
					</Box>
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
