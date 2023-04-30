/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-18 17:34:12
 * @LastEditTime: 2023-04-30 16:40:40
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/ChatSessionInput.tsx
 */

import { Input, Text, Flex, ActionIcon, createStyles, Group, Transition } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useState, useRef, memo } from 'react';
import { deleteChat, changeChatTitle } from '@/stores/ChatAction';
import dayjs from 'dayjs';

const useStyles = createStyles((theme) => ({
	utilsContainer: {
		position: 'absolute',
		right: 0,
		top: 0,
	},
	container: {
		position: 'relative',
	},
}));

interface ChatSessionInputProps {
	title: string;
	id: string;
	date: Date;
	amount: number;
}

export const ChatSessionInput = memo((props: ChatSessionInputProps) => {
	const [editState, setEditState] = useState<boolean>(false);
	const inputEl = useRef<HTMLInputElement>(null);
	const [open, setOpen] = useState<boolean>(false);
	const { classes } = useStyles();

	const onEditClick = (e: any) => {
		setEditState(true);
		setTimeout(() => {
			inputEl.current?.focus();
		}, 0);
		e.stopPropagation();
	};

	const onEditBlur = () => {
		changeChatTitle(props.id, inputEl.current?.value);
		setEditState(false);
	};

	const onDeleteClick = (e: any) => {
		deleteChat(props.id);
		e.stopPropagation();
	};
	return (
		<Flex
			className={classes.container}
			gap="md"
			justify="space-between"
			align="center"
			direction="row"
			wrap="wrap"
			onMouseEnter={() => {
				setOpen(true);
			}}
			onMouseLeave={() => {
				setOpen(false);
			}}
		>
			<Flex direction="column" w="100%">
				{editState ? (
					<Input
						ref={inputEl}
						defaultValue={props.title}
						onBlur={onEditBlur}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								onEditBlur();
							}
						}}
						w="150px"
						size="xs"
						sx={() => ({
							border: 'none',
							borderRadius: 0,
							flex: 1,
						})}
					/>
				) : (
					<Text sx={() => ({ flex: 1, lineHeight: '2.1431' })} truncate size="sm">
						{props.title || ''}
					</Text>
				)}

				<Flex justify="space-between">
					<Text size="xs"> 共 {props.amount} 条记录</Text>
					<Text size="xs">{dayjs(props.date).format('YYYY/MM/DD HH:mm:ss')}</Text>
				</Flex>
			</Flex>

			<Transition mounted={open} transition="slide-left" duration={400} timingFunction="ease">
				{(styles) => (
					<Group className={classes.utilsContainer} style={styles}>
						<ActionIcon size="xs" variant="default">
							<IconEdit onClick={onEditClick} size="0.75rem" />
						</ActionIcon>

						<ActionIcon size="xs" variant="default">
							<IconTrash onClick={onDeleteClick} size="0.75rem" />
						</ActionIcon>
					</Group>
				)}
			</Transition>
		</Flex>
	);
});
