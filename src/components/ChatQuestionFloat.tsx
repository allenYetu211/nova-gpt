/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-01 08:58:14
 * @LastEditTime: 2023-05-02 10:43:15
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/ChatQuestionFloat.tsx
 */
import {
	ActionIcon,
	Box,
	Divider,
	Flex,
	Group,
	Menu,
	Tooltip,
	createStyles,
	Text,
} from '@mantine/core';
import { IconQuestionMark, IconZoomQuestion, IconArrowsLeftRight } from '@tabler/icons-react';
import React, { Fragment, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { systemMessage } from '@/stores/SubmitAction';

const useStyles = createStyles((theme) => ({
	container: {
		padding: `3px ${theme.spacing.xs}`,
		background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
		borderRadius: theme.radius.md,
		width: 'fit-content',
		position: 'absolute',
		zIndex: 100,
		['.mantine-Menu-itemLabel']: {
			overflow: 'hidden',
		},
		['.mantine-Menu-item']: {
			alignItems: 'flex-start',
		},
	},
}));

interface Position {
	top: number;
	left: number;
}
export const ChatQuestionFloat = forwardRef((props, ref) => {
	const { classes, theme } = useStyles();
	const [position, setPosition] = useState<Position>({
		top: 0,
		left: 0,
	});
	const [show, setShow] = useState<boolean>(false);
	const floatRef = useRef<HTMLDivElement>(null);
	const selectionContent = useRef<string>('');

	useImperativeHandle(
		ref,
		() => {
			return {
				onSelectedPosition(y: number, x: number) {
					const selection = document.getSelection()!;
					const range = selection.getRangeAt(0);
					const content = range.toString().trim();
					if (content.length === 0) {
						setShow(false);
						return;
					}
					selectionContent.current = content;
					const padding =
						getComputedStyle(document.querySelector('.mantine-AppShell-main')!, null)[
							'paddingLeft'
						] ?? '0px';
					const offsetLeft = parseInt(padding.match(/\d+/)![0]);

					setShow(true);
					setPosition({
						top: y,
						left: x - offsetLeft,
					});
				},
			};
		},
		[],
	);

	const translations = () => {
		systemMessage('translation', selectionContent.current);
	};

	return (
		<Box
			sx={() => ({
				top: position.top,
				left: position.left,
				display: show ? 'block' : 'none',
			})}
			ref={floatRef}
			className={classes.container}
		>
			<Group>
				<QuestionMenu translations={translations} />
			</Group>
		</Box>
	);
});

function QuestionMenu({ translations }: { translations: () => void }) {
	return (
		<Menu trigger="hover" shadow="md" width={200}>
			<Menu.Target>
				<ActionIcon variant="transparent" color="gray" radius="sm" size="sm">
					<IconZoomQuestion />
				</ActionIcon>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Item icon={<IconQuestionMark size={14} />}>The selected content explains</Menu.Item>
				<Menu.Item icon={<IconArrowsLeftRight size={14} />} onClick={translations}>
					Translation
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
