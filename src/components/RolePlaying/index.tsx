/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-05 09:49:24
 * @LastEditTime: 2023-05-06 11:24:14
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/RolePlaying/index.tsx
 */
import { EmojiIcon } from '@/components/Common/Emoji';
import { ROLE_LIST, RolePlayType } from '@/role';
import { Avatar, Box, Flex, Text, createStyles } from '@mantine/core';
import { useMemo } from 'react';
import { newChat } from '@/stores/ChatAction';

const useStyles = createStyles((theme) => ({
	container: {
		width: '100%',
		cursor: 'pointer',
	},
	item: {
		padding: `${theme.spacing.xs} `,
		borderRadius: theme.radius.md,
		[`&:hover`]: {
			background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.light[2],
		},
	},
	itemText: {
		flex: 1,
		overflow: 'auto',
	},
}));

export const RolePlaying = (props: { value: string; clickCallback: () => void }) => {
	const { classes } = useStyles();
	const { value } = props;
	const renderDate = useMemo(() => {
		return ROLE_LIST.filter((item: RolePlayType) => {
			return (
				item.title.toLowerCase().includes(value.toLowerCase().trim()) ||
				item.message.content!.toLowerCase().includes(value.toLowerCase().trim())
			);
		});
	}, [value]);

	return (
		<Box className={classes.container}>
			{renderDate.length ? (
				renderDate.map((item, key) => (
					<Flex
						onClick={() => {
							newChat(item);
							props.clickCallback();
						}}
						gap={5}
						key={key}
						justify="flex-start"
						align="center"
						className={classes.item}
					>
						<Avatar color="cyan">
							<EmojiIcon unified={item.avatar} />
						</Avatar>
						<Box className={classes.itemText}>
							<Text>{item.title}</Text>
							<Text truncate size="sm" weight={400}>
								{item.message.content}
							</Text>
						</Box>
					</Flex>
				))
			) : (
				<Text>未搜索到角色</Text>
			)}
		</Box>
	);
};
