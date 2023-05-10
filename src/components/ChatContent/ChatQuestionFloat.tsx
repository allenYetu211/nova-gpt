/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-01 08:58:14
 * @LastEditTime: 2023-05-10 23:29:37
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/ChatContent/ChatQuestionFloat.tsx
 */
import { Language } from '@/stores/SettingStore';
import { systemTranslations, userQuestion } from '@/stores/SubmitAction';
import {
	ActionIcon,
	Box,
	Divider,
	Flex,
	Group,
	Input,
	Menu,
	Modal,
	Text,
	Tooltip,
	createStyles,
} from '@mantine/core';
import { ChatTextareaInput } from '@/components/ChatContent/ChatTextareaInput';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import {
	IconArrowsLeftRight,
	IconLanguage,
	IconQuestionMark,
	IconSend,
	IconZoomQuestion,
} from '@tabler/icons-react';

import React, {
	Fragment,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react';
import { UICard, modal } from '@/components/Common';
import i18n from '@/i18n';

const useStyles = createStyles((theme) => ({
	container: {
		padding: `3px ${theme.spacing.xs}`,
		background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.light[0],
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

export interface RefCallbackFunc {
	onSelectedPosition(y: number, x: number, id: string): void;
	hide: () => void;
}
export const ChatQuestionFloat = forwardRef((props: { updateScroll: () => void }, ref) => {
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
				hide: () => {
					setShow(false);
				},
			};
		},
		[],
	);

	useEffect(() => {
		const func = () => {
			setShow(false);
		};
		document.addEventListener('mouseup', func);
		return () => {
			document.removeEventListener('mouseup', func);
		};
	}, []);

	const translations = (language: Language) => {
		systemTranslations(language, selectionContent.current);
		props.updateScroll();
		setShow(false);
	};

	const sendQuestion = () => {
		modal.open({
			id: 'question',
			title: 'Question',
			children: (
				<>
					<Text
						fz="xs"
						sx={(theme) => ({
							marginBottom: theme.spacing.xs,
							padding: `${theme.spacing.xs} 0`,
							color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.light[6],
						})}
					>
						{i18n.float_question.subject} : {selectionContent.current}
					</Text>

					<Flex
						justify="flex-end"
						align="center"
						sx={(theme) => ({
							width: '100%',
							['.chat-textarea-input']: {
								border: theme.other.border01,
							},
						})}
					>
						<ChatTextareaInput
							placeholder={i18n.float_question.placeholder}
							onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
								if (e.key === 'Enter') {
									userQuestion(selectionContent.current, e.currentTarget.value, messageId.current);
									modals.close('question');
								}
							}}
						/>

						{/* <ActionIcon
							onClick={sendUserQuestion}
							variant="transparent"
							color="gray"
							radius="sm"
							size="sm"
						>
							<IconSend />
						</ActionIcon> */}
					</Flex>
				</>
			),
		});
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
				{/* <Question selectionContent={selectionContent.current} sendQuestion={sendQuestion} /> */}
				<ActionIcon
					onClick={() => {
						sendQuestion();
					}}
					variant="transparent"
					color="gray"
					radius="sm"
					size="sm"
				>
					<IconQuestionMark />
				</ActionIcon>
				<Translation translations={translations} />
			</Group>
		</Box>
	);
});

function Translation({ translations }: { translations: (languages: Language) => void }) {
	return (
		<Menu trigger="hover" shadow="md" width={200}>
			<Menu.Target>
				<ActionIcon variant="transparent" color="gray" radius="sm" size="sm">
					<IconLanguage />
				</ActionIcon>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Item onClick={() => translations('en')}>{i18n.float_translation.english}</Menu.Item>
				<Menu.Item onClick={() => translations('zh_cn')}>
					{i18n.float_translation.chinese}
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
