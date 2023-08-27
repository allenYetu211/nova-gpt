/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-05 09:49:24
 * @LastEditTime: 2023-08-27 12:03:42
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/RolePlaying/index.tsx
 */
import i18n from '@/i18n';
import { ROLE_LIST, RolePlayType } from '@/role';
import { createNewRolePlay, deleteRolePlay } from '@/stores/RolePlayAction';

import { useRolePlayStore } from '@/stores/RolePlayStore';
import { newChat } from '@/stores/ChatAction';
import { Avatar, Box, Flex, Text, createStyles, Input, Divider, Button } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useState, useRef } from 'react';

import { UIButton, UIActionButton, modal, AutoComponents } from '@/components/Common';
import { CreateRole } from '@/components/CreateRole';
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
	const { classes } = useStyles();
	// const { value } = props;
	const [value, setValue] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);
	const role_list = useRolePlayStore((state) => state.role_list);
	const [rolelistlen, setRolelistlen] = useState<number>(role_list.length);

	const renderDate = useMemo(() => {
		return role_list.filter((item: RolePlayType) => {
			return (
				item.title.toLowerCase().includes(value.toLowerCase().trim()) ||
				item.message.content!.toLowerCase().includes(value.toLowerCase().trim())
			);
		});
	}, [value, rolelistlen]);

	useEffect(() => {
		setInterval(() => {
			inputRef.current?.focus();
		}, 0);
	}, []);

	const createNewRoleModal = () => {
		modal.open({
			id: 'createNewRoleModal',
			size: 'lg',
			title: 'Create New Role',
			children: <CreateRole />,
		});
	};

	return (
		<Box className={classes.container}>
			<UIButton onClick={createNewRoleModal} sx={{ margin: '10px 0' }}>
				Create New Role
			</UIButton>
			<Input
				ref={inputRef}
				placeholder={i18n.role.search}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setValue(e.target.value);
				}}
			/>

			<Divider my="sm" />

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
						align="center"
						justify="space-start"
						sx={{ position: 'relative' }}
						className={classes.item}
					>
						<Avatar color="cyan">{item.avatar}</Avatar>
						<Box className={classes.itemText} sx={{ margin: '0 10px' }}>
							<Text>{item.title}</Text>
							<Text truncate size="sm" weight={400}>
								{item.message.content}
							</Text>
						</Box>

						<Button
							sx={{
								backgroundColor: 'rgba(89, 116, 121, 0.2)',
								':hover': {
									backgroundColor: 'rgba(89, 116, 121, 0.4)',
								},
								position: 'relative',
								right: 0,
								top: 0,
							}}
							radius="md"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								setRolelistlen(rolelistlen - 1);
								deleteRolePlay(key);
							}}
						>
							🗑️
						</Button>
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
