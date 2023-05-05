/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-05 09:49:24
 * @LastEditTime: 2023-05-05 17:57:19
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/RolePlaying/index.tsx
 */
import { forwardRef, useState, useMemo } from 'react';
import { Group, Avatar, Text, Select, Box, Flex } from '@mantine/core';
import { UIInput } from '@/components/Common/UIInput';
import { ROLE_LIST, RolePlayType } from '@/role';
import { EmojiIcon } from '@/components/Common/Emoji';

export const RolePlaying = (props: { value: string }) => {
	const { value } = props;
	const renderDate = useMemo(() => {
		return ROLE_LIST.filter((item: RolePlayType) => {
			return (
				item.name.toLowerCase().includes(value.toLowerCase().trim()) ||
				item.message.content!.toLowerCase().includes(value.toLowerCase().trim())
			);
		});
	}, [value]);

	return (
		<Box
			sx={{
				width: '100%',
				cursor: 'pointer',
			}}
		>
			{renderDate.length ? (
				renderDate.map((item, key) => (
					<Flex
						gap={5}
						key={key}
						justify="flex-start"
						align="center"
						sx={(theme) => ({
							padding: `${theme.spacing.xs} 0`,
						})}
					>
						<Avatar color="cyan">
							<EmojiIcon unified={item.avatar} />
						</Avatar>
						<Box sx={{ flex: 1, overflow: 'auto' }}>
							<Text>{item.name}</Text>
							<Text truncate size="sm" color="dimmed" weight={400}>
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
