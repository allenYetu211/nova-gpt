/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-18 17:34:12
 * @LastEditTime: 2023-05-06 16:13:06
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/Nav/ChatSessionInput.tsx
 */

import { Text, Flex, ActionIcon, createStyles, Group, Transition } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useState, memo } from 'react';
import { deleteChat } from '@/stores/ChatAction';
import dayjs from 'dayjs';
import i18n from '@/i18n';
import { Chat } from '@/stores/ChatStore';

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

interface ChatSessionInputProps extends Pick<Chat, 'created_at' | 'title' | 'id' | 'avatar'> {
	amount: number;
}

export const ChatSessionInput = memo((props: ChatSessionInputProps) => {
	const [open, setOpen] = useState<boolean>(false);
	const { classes } = useStyles();

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
				<Flex align="center" justify="center">
					{/* <EmojiIcon unified={props.titleIcon!} /> */}
					<Text
						sx={(theme) => ({ flex: 1, lineHeight: '2.1431', marginLeft: theme.spacing.xs })}
						truncate
						size="sm"
					>
						{props.title || ''}
					</Text>
				</Flex>

				<Flex justify="space-between">
					<Text size="xs">{i18n.record(props.amount)}</Text>
					<Text size="xs">{dayjs(props.created_at).format('YYYY/MM/DD HH:mm:ss')}</Text>
				</Flex>
			</Flex>

			<Transition mounted={open} transition="slide-left" duration={400} timingFunction="ease">
				{(styles) => (
					<Group className={classes.utilsContainer} style={styles}>
						<ActionIcon size="xs" variant="default">
							<IconTrash onClick={onDeleteClick} size="0.75rem" />
						</ActionIcon>
					</Group>
				)}
			</Transition>
		</Flex>
	);
});
