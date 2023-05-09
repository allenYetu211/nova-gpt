/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-06 15:39:53
 * @LastEditTime: 2023-05-09 14:30:44
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/Nav/NavContainer.tsx
 */
import { switchIsSetting } from '@/stores/SettingAction';
import { IconPlus, IconSettings, IconArrowBarToLeft, IconJewishStar } from '@tabler/icons-react';
import i18n from '@/i18n';
import { Flex, Group, Box, useMantineTheme, rem } from '@mantine/core';
import { newChat } from '@/stores/ChatAction';
import { UIActionButton, UIModal, UIInput } from '@/components/Common';
import { useDisclosure } from '@mantine/hooks';
import { RolePlaying } from '@/components/RolePlaying';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { SegmentedControl } from '@mantine/core';

import { useSettingStore } from '@/stores/SettingStore';
import { switchColorScheme } from '@/stores/SettingAction';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
interface NavContainerProps {
	toggle: () => void;
}

export const NavContainer = (props: NavContainerProps) => {
	const theme = useMantineTheme();
	const colorScheme = useSettingStore((state) => state.colorScheme);
	const [opened, { open, close }] = useDisclosure(false);

	const ActionIconStyle = {
		radius: 'sm',
		variant: 'light',
		size: 'lg',
		sx: () => ({
			color: theme.colorScheme === 'dark' ? '#313653' : '#1F2747',
			background:
				theme.colorScheme === 'dark'
					? '#rgba(49, 54, 83, 0.497333)'
					: 'rgba(255, 255, 255, 0.2864)',
			border:
				theme.colorScheme === 'dark'
					? theme.other.border01
					: `${rem(1)} solid  rgba(190, 196, 230, 0.662941)`,
		}),
	};

	const IconStyle = {
		color: theme.colorScheme === 'dark' ? '#A8A8A8' : '#1F2747',
		size: rem(20),
	};

	const router = useRouter();

	return (
		<>
			<Flex gap="md" justify="space-between" align="center">
				<Group>
					<UIActionButton
						{...ActionIconStyle}
						label={i18n.Nav.new}
						onClick={() => {
							newChat(router);
						}}
					>
						<IconPlus {...IconStyle} />
					</UIActionButton>
					<UIActionButton {...ActionIconStyle} label={i18n.Nav.setting} onClick={switchIsSetting}>
						<IconSettings {...IconStyle} />
					</UIActionButton>

					<UIActionButton {...ActionIconStyle} label={'角色扮演'} onClick={open}>
						<IconJewishStar {...IconStyle} />
					</UIActionButton>

					<RolePlayingModel opened={opened} close={close} />

					<SegmentedControl
						size="md"
						sx={(theme) => ({
							border: theme.other.border01,
							background:
								theme.colorScheme === 'dark'
									? 'rgba(49, 54, 83, 0.497333)'
									: 'rgba(255, 255, 255, 0.286424)',
							['& .mantine-SegmentedControl-indicator']: {
								background:
									theme.colorScheme === 'dark' ? '#353B61' : 'rgba(255, 255, 255, 0.286424)',
							},
							['& .mantine-SegmentedControl-label']: {
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								height: '100%',
								['& svg']: {
									display: 'block',
								},
							},
						})}
						value={colorScheme}
						onChange={(value: 'light' | 'dark') => {
							switchColorScheme(value);
						}}
						data={[
							{
								label: <IconSun size="1rem" />,
								value: 'light',
							},
							{
								label: <IconMoonStars size="1rem" />,
								value: 'dark',
							},
						]}
					/>
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
					<IconArrowBarToLeft {...IconStyle} />
				</UIActionButton>
			</Flex>
		</>
	);
};

const RolePlayingModel = ({ opened, close }: { opened: boolean; close: () => void }) => {
	const theme = useMantineTheme();
	const [value, setValue] = useState<string>('');

	return (
		<>
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
