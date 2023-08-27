/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-08-27 09:21:54
 * @LastEditTime: 2023-08-27 12:00:46
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/CreateRole/index.tsx
 */
import {
	Avatar,
	Box,
	Flex,
	Textarea,
	Text,
	createStyles,
	Input,
	Divider,
	rem,
} from '@mantine/core';

import { ROLE_LIST, RolePlayType } from '@/role';

import { ChatTextareaInput } from '@/components/ChatContent/ChatTextareaInput';
import { useState, useRef, FC } from 'react';
import { Popover, Button } from '@mantine/core';
import { createNewRolePlay } from '@/stores/RolePlayAction';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { UIButton, modal } from '../Common';

const useStyles = createStyles((theme) => ({
	divider: {
		padding: `${rem(5)} 0`,
	},
	container: {
		height: '500px',
	},
	relative: {
		position: 'relative',
	},
}));

const DEFAULT_OPTION = {
	title: 'Custom Chat',
	avatar: '☠️',
	user_avatar: '🛀',
	system_avatar: '👩🏻‍🏫',
	message: {
		content: 'Answer - Question',
		role: 'system',
		hide: false,
	},
	openAiConfig: {
		model: 'gpt-3.5-turbo',
		temperature: 1,
		top_p: 1,
		n: 1,
		stop: '',
		max_tokens: 2000,
		presence_penalty: 0,
		frequency_penalty: 0,
		logit_bias: '',
		auto_title: true,
	},
};

type CreateRoleOptionType = {
	chatTitle?: string;
	context?: string;
	avatar?: string;
};
export const CreateRole: FC<CreateRoleOptionType> = ({
	chatTitle = '',
	context = '',
	avatar = '☠️',
}) => {
	const { classes, cx } = useStyles();
	const [roleContext, setRoleContext] = useState<string>(context);
	const [title, setTitle] = useState<string>(chatTitle);
	const [avaters, setAvaters] = useState<string>(avatar);
	const [opened, setOpened] = useState<boolean>(false);

	const createRole = () => {
		const newRole: RolePlayType = {
			...DEFAULT_OPTION,
			avatar: avaters,
			title,
			message: {
				content: roleContext,
				role: 'system',
				hide: false,
			},
		};

		createNewRolePlay(newRole);
		modal.close('createNewRoleModal');
	};

	return (
		<div className={cx(classes.container, classes.relative)}>
			<Flex className={classes.relative}>
				<Popover position="bottom" shadow="md" opened={opened}>
					<Popover.Target>
						<Button
							sx={{
								backgroundColor: 'rgba(12, 133, 153, 0.2)',
								':hover': {
									backgroundColor: 'rgba(12, 133, 153, 0.4)',
								},
							}}
							radius="md"
							onClick={() => {
								setOpened(true);
							}}
						>
							{avaters ? avaters : 'Select'}
						</Button>
					</Popover.Target>
					<Popover.Dropdown>
						<Picker
							data={data}
							onEmojiSelect={(icon: any) => {
								setAvaters(icon.native);
								setOpened(false);
							}}
						/>
					</Popover.Dropdown>
				</Popover>

				<Input
					sx={{ marginLeft: '15px' }}
					placeholder="Chat Title"
					value={title}
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>
			</Flex>

			<Divider my="sm" />

			<Textarea
				placeholder="Describe"
				autosize
				minRows={10}
				maxRows={15}
				onChange={(event: any) => {
					setRoleContext(event.currentTarget.value);
				}}
				value={roleContext}
			/>
			<UIButton sx={{ position: 'absolute', right: 0, bottom: 0 }} onClick={createRole}>
				CREATE
			</UIButton>
		</div>
	);
};
