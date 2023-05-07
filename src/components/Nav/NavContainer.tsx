/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-06 15:39:53
 * @LastEditTime: 2023-05-06 17:31:21
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/Nav/NavContainer.tsx
 */
import { switchIsSetting } from '@/stores/SettingAction';
import { IconPlus, IconSettings, IconArrowBarToLeft, IconJewishStar } from '@tabler/icons-react';
import i18n from '@/i18n';
import { Flex, Group, Box, useMantineTheme } from '@mantine/core';
import { newChat } from '@/stores/ChatAction';
import { UIActionButton, UIModal, UIInput } from '@/components/Common';
import { useDisclosure } from '@mantine/hooks';
import { RolePlaying } from '@/components/RolePlaying';
import { useState } from 'react';
import { useRouter } from 'next/router';

interface NavContainerProps {
	toggle: () => void;
}

export const NavContainer = (props: NavContainerProps) => {
	// const theme = useMantineTheme();

	const router = useRouter();

	return (
		<>
			<Flex gap="md" justify="space-between" align="center">
				<Group>
					<UIActionButton
						label={i18n.Nav.new}
						onClick={() => {
							newChat(router);
						}}
					>
						<IconPlus />
					</UIActionButton>

					<UIActionButton label={i18n.Nav.setting} onClick={switchIsSetting}>
						<IconSettings />
					</UIActionButton>

					<RolePlayingModel />
				</Group>

				{/* 添加navbar 开关  */}
				<UIActionButton
					sx={(theme) => ({
						[`@media (min-width: ${theme.breakpoints.sm})`]: {
							display: 'none',
						},
					})}
					onClick={props.toggle}
				>
					<IconArrowBarToLeft />
				</UIActionButton>
			</Flex>
		</>
	);
};

const RolePlayingModel = () => {
	const [opened, { open, close }] = useDisclosure(false);
	const theme = useMantineTheme();
	const [value, setValue] = useState<string>('');

	return (
		<>
			<UIActionButton label={'角色扮演'} onClick={open}>
				<IconJewishStar size="1.25rem" />
			</UIActionButton>

			<UIModal
				opened={opened}
				onClose={close}
				cardBoxStyles={{
					maxHeight: '80vh',
					minHeight: '200px',
					padding: `${theme.spacing.md}`,
				}}
				size="xl"
				container={
					<Box sx={{ padding: `${theme.spacing.xl} 0`, width: '100%' }}>
						<UIInput
							placeholder="搜索角色"
							withAsterisk
							onChange={(e) => {
								setValue(e.target.value);
							}}
						/>
					</Box>
				}
			>
				<Box
					sx={{
						padding: `${theme.spacing.xl} 0 `,
						width: '100%',
					}}
				>
					<RolePlaying clickCallback={close} value={value} />
				</Box>
			</UIModal>
		</>
	);
};
