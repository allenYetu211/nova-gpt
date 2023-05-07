/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-25 14:06:24
 * @LastEditTime: 2023-05-06 11:16:22
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/Empty.tsx
 */
import i18n from '@/i18n';
import { newChat } from '@/stores/ChatAction';
import { switchIsSetting } from '@/stores/SettingAction';
import { useSettingStore } from '@/stores/SettingStore';
import { Box, Button, List, Text, ThemeIcon, Title, createStyles, Group } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
	container: {
		paddingBottom: theme.spacing.md,
		flex: 1,
		// overflow: 'auto',
		width: 'auto',
		marginTop: theme.spacing.md,
	},
	listGroup: {
		margin: `${theme.spacing.md} 0 ${theme.spacing.md}`,
	},
}));

export const EmptyChats = () => {
	const router = useRouter();
	const notKey = useSettingStore((state) => !state.openAI.key);
	const notAccessToken = useSettingStore((state) => !state.accessToken);
	const { classes, theme } = useStyles();

	return (
		<Box className={classes.container}>
			<Title variant="gradient" gradient={{ from: '#8a3ffb', to: '#3646e8', deg: 50 }} order={1}>
				Nova GPT
			</Title>
			<Text
				variant="gradient"
				gradient={{ from: '#8a3ffb', to: '#3646e8', deg: 10 }}
				c="dimmed"
				fz="sm"
			>
				{i18n.empty.describe}
			</Text>

			<Group className={classes.listGroup}>
				<List
					spacing="md"
					size="sm"
					center
					icon={
						<ThemeIcon color={theme.colors.dark[5]} size={18} radius="xl">
							<IconCheck size="1rem" />
						</ThemeIcon>
					}
				>
					<List.Item>{i18n.empty.introduction[0]}</List.Item>
					<List.Item> {i18n.empty.introduction[1]}</List.Item>
					<List.Item> {i18n.empty.introduction[2]}</List.Item>
					<List.Item>{i18n.empty.introduction[3]}</List.Item>
				</List>
			</Group>

			{!notKey || !notAccessToken ? (
				<Button
					radius="xl"
					style={{
						background: theme.colors.gradient[4],
					}}
					onClick={() => {
						newChat(router);
					}}
				>
					{i18n.empty.createFirstChat}
				</Button>
			) : (
				<Button radius="xl" onClick={switchIsSetting}>
					{i18n.empty.adding}
				</Button>
			)}
		</Box>
	);
};

// interface BaseButtonProps {

// }
// const BaseButton: FC<PropsWithChildren<Button>>  = ({children}) => {
//   <Button onClick={switchIsSetting}>children</Button>
// }
