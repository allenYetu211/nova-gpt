/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-14 15:01:08
 * @LastEditTime: 2023-05-15 11:52:04
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/Nav/index.tsx
 */
import { ChatSession } from '@/components/Nav/ChatSession';
import { useChatStore } from '@/stores/ChatStore';
import { Box, Divider, Flex, Navbar, Text, createStyles } from '@mantine/core';
import { NavContainer } from '@/components/Nav/NavContainer';
import i18n from '@/i18n';
import IconLogo from '@/images/svg/logo';
import { setActiveChatId } from '@/stores/ChatAction';
import { useSettingStore } from '@/stores/SettingStore';
import { UserManage } from './UserManage';
import { updateSetting } from '@/stores/SettingAction';

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
		overflowY: 'auto',
		overflowX: 'hidden',
	},
	icon: {
		width: 40,
		height: 40,
		padding: theme.spacing.xs,
	},
}));

export function Nav() {
	const { classes, theme, cx } = useStyles();
	const chats = useChatStore((state) => state.chats);
	const activeChatId = useChatStore((state) => state.activeChatId);
	const openNav = useSettingStore((state) => state.openNav);

	const chatsList = chats
		? chats.map((chat) => {
				return (
					<Box
						key={chat.id}
						className={cx(classes.chatItem, {
							[classes.chatItemActive]: activeChatId === chat.id,
						})}
						onClick={() => {
							setActiveChatId(chat.id);
							updateSetting({ openNav: false });
						}}
					>
						<ChatSession
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
						background:
							theme.colorScheme === 'dark'
								? theme.colors.dark_background[1]
								: theme.colors.light_background[0],
						display: openNav ? 'flex' : 'none',
					},
				})}
				p="xs"
			>
				{/* <AudioAnimation /> */}

				<Flex
					direction="column"
					sx={(theme) => ({
						height: '100%',
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

					<NavContainer
						toggle={() => {
							updateSetting({ openNav: false });
						}}
					/>

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
		</Box>
	);
}
