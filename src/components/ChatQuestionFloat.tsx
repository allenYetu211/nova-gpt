/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-01 08:58:14
 * @LastEditTime: 2023-05-02 17:42:41
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
	Input,
} from '@mantine/core';
import {
	IconQuestionMark,
	IconLanguage,
	IconZoomQuestion,
	IconArrowsLeftRight,
	IconSend,
} from '@tabler/icons-react';
import React, { Fragment, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { systemTranslations, userQuestion } from '@/stores/SubmitAction';
import { Language } from '@/stores/SettingStore';

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
	const messageId = useRef<string>('');

	useImperativeHandle(
		ref,
		() => {
			return {
				onSelectedPosition(y: number, x: number, id: string) {
					const selection = document.getSelection()!;
					const range = selection.getRangeAt(0);
					const content = range.toString().trim();
					if (content.length === 0) {
						setShow(false);
						return;
					}
					selectionContent.current = content;
					messageId.current = id;

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

	const translations = (language: Language) => {
		systemTranslations(language, selectionContent.current);
		setShow(false);
	};

	const sendQuestion = (text: string) => {
		userQuestion(selectionContent.current, text, messageId.current);
		setShow(false);
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
				<Question selectionContent={selectionContent.current} sendQuestion={sendQuestion} />
				<Translation translations={translations} />
			</Group>
		</Box>
	);
});

function Question({
	selectionContent,
	sendQuestion,
}: {
	selectionContent: string;
	sendQuestion: (text: string) => void;
}) {
	const [opened, setOpened] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const menuItemRef = useRef<HTMLButtonElement>(null);

	const sendUserQuestion = () => {
		const value = inputRef.current?.value.trim();
		if (!value) {
			return;
		}
		sendQuestion(value);
		setOpened(false);
	};
	return (
		<Menu
			radius="xs"
			trigger="hover"
			opened={opened}
			onOpen={() => {
				setOpened(true);
			}}
			onClose={() => {
				// 检查当前是否聚焦在输入框中
				if (
					inputRef.current === document.activeElement ||
					menuItemRef.current === document.activeElement
				) {
					return;
				}
				setOpened(false);
			}}
			withArrow
			shadow="md"
			width={300}
		>
			<Menu.Target>
				<ActionIcon variant="transparent" color="gray" radius="sm" size="sm">
					<IconQuestionMark />
				</ActionIcon>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Item ref={menuItemRef}>
					<Text
						fz="xs"
						sx={(theme) => ({
							marginBottom: theme.spacing.xs,
						})}
						color="white"
					>
						对以下内容提问：
						<Text fs="italic" truncate>
							{selectionContent}
						</Text>
					</Text>
					<Flex justify="flex-end" align="center">
						<Input
							ref={inputRef}
							sx={(theme) => ({
								flex: 1,
								marginRight: theme.spacing.xs,
							})}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									sendUserQuestion();
								}
							}}
						/>
						<ActionIcon
							onClick={sendUserQuestion}
							variant="transparent"
							color="gray"
							radius="sm"
							size="sm"
						>
							<IconSend />
						</ActionIcon>
					</Flex>
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}

function Translation({ translations }: { translations: (languages: Language) => void }) {
	return (
		<Menu trigger="hover" shadow="md" width={200}>
			<Menu.Target>
				<ActionIcon variant="transparent" color="gray" radius="sm" size="sm">
					<IconLanguage />
				</ActionIcon>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Item onClick={() => translations('en')}>English</Menu.Item>
				<Menu.Item onClick={() => translations('zh_cn')}>中文</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
