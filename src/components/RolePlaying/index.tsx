/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-05 09:49:24
 * @LastEditTime: 2023-05-12 01:01:18
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/RolePlaying/index.tsx
 */
import i18n from '@/i18n';
import { ROLE_LIST, RolePlayType } from '@/role';
import { newChat } from '@/stores/ChatAction';
import { Avatar, Box, Flex, Text, createStyles, Input, Divider } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useState, useRef } from 'react';

const useStyles = createStyles((theme) => ({
	container: {
		width: '100%',
		cursor: 'pointer',
	},
	item: {
		padding: `${theme.spacing.xs} `,
		borderRadius: theme.radius.md,
		[`&:hover`]: {
			background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.light[0],
		},
	},
	itemText: {
		flex: 1,
		overflow: 'auto',
	},
}));

export const RolePlaying = (props: { value?: string; clickCallback: () => void }) => {
	const router = useRouter();
	const { classes } = useStyles();
	// const { value } = props;
	const [value, setValue] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);
	const renderDate = useMemo(() => {
		return ROLE_LIST.filter((item: RolePlayType) => {
			return (
				item.title.toLowerCase().includes(value.toLowerCase().trim()) ||
				item.message.content!.toLowerCase().includes(value.toLowerCase().trim())
			);
		});
	}, [value]);

	useEffect(() => {
		setInterval(() => {
			inputRef.current?.focus();
		}, 0);
	}, []);

	return (
		<Box className={classes.container}>
			<Input
				ref={inputRef}
				placeholder={i18n.role.search}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setValue(e.target.value);
				}}
			/>

			<Divider sx={{ margin: `0 -1.5rem` }} my="sm" />

			{renderDate.length ? (
				renderDate.map((item, key) => (
					<Flex
						onClick={() => {
							newChat(item);
							props.clickCallback();
							setValue('');
						}}
						gap={5}
						key={key}
						justify="flex-start"
						align="center"
						className={classes.item}
					>
						<Avatar color="cyan">{item.avatar}</Avatar>
						<Box className={classes.itemText}>
							<Text>{item.title}</Text>
							<Text truncate size="sm" weight={400}>
								{item.message.content}
							</Text>
						</Box>
					</Flex>
				))
			) : (
				<Text
					sx={(theme) => ({
						padding: `${theme.spacing.xs} `,
					})}
				>
					{i18n.role.not_found}
				</Text>
			)}
		</Box>
	);
};
