/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-14 15:01:08
 * @LastEditTime: 2023-05-07 15:17:56
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

					<NavContainer toggle={toggle} />

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
