/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-07 14:59:47
 * @LastEditTime: 2023-05-15 11:52:28
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/layout/MainLayout.tsx
 */

import { addPermissions } from '@/stores/UserAction';
import { Nav } from '@/components/Nav';
import { AppShell, Box } from '@mantine/core';

import { useEffect, PropsWithChildren } from 'react';

export default function MainLayout({ children }: PropsWithChildren) {
	useEffect(() => {
		addPermissions('chat');
	}, []);
	return (
		<>
			<AppShell
				padding="md"
				layout="alt"
				navbar={<Nav />}
				styles={(theme) => ({
					main: {
						paddingTop: '0rem',
						paddingBottom: '0rem',
						paddingRight: '0rem',
						paddingLeft: `var(--mantine-navbar-width, 0px)`,
						background:
							theme.colorScheme === 'dark'
								? theme.colors.dark_background[0]
								: theme.colors.light_background[0],
						[`@media (max-width: ${theme.breakpoints.sm})`]: {
							paddingLeft: '0',
						},
					},
				})}
			>
				<Box
					sx={(theme) => ({
						height: `100vh`,
						border: theme.other.border01,
						borderRightWidth: 0,
						borderRadius: `${theme.radius.lg} 0 0 ${theme.radius.lg}`,
						boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,
						background:
							theme.colorScheme === 'dark'
								? theme.colors.dark_background[1]
								: theme.colors.light_background[1],
					})}
				>
					{children}
				</Box>
			</AppShell>
		</>
	);
}
