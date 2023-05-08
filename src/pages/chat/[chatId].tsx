/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-07 14:59:47
 * @LastEditTime: 2023-05-09 00:04:57
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/pages/chat/[chatid].tsx
 */

import { Main } from '@/components/Main';

import { Nav } from '@/components/Nav';
import { AppShell, Box } from '@mantine/core';
import Head from 'next/head';

export default function Chats() {
	return (
		<>
			<Head>
				<title>Nova GPT</title>
				<meta name="description" content="Extension Chat GPT WEB" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{/* <link rel="icon" href="/favicon.ico" /> */}
				<link rel="icon" type="image/svg+xml" href="/logo.svg" />
			</Head>

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
							theme.colorScheme === 'dark' ? theme.colors.dark_background[0] : theme.colors.gray[0],
						[`@media (max-width: ${theme.breakpoints.sm})`]: {
							paddingLeft: '1rem',
						},
					},
				})}
			>
				<Box
					sx={(theme) => ({
						height: `100vh`,
						border: '0.1rem solid #5C6077',
						// padding: `0 calc(var(--mantine-footer-height, 0px) + 2rem) calc(var(--mantine-footer-height, 0px) + 3rem)`,
						borderRightWidth: 0,
						borderRadius: `${theme.radius.lg} 0 0 ${theme.radius.lg}`,
						background:
							theme.colorScheme === 'dark' ? theme.colors.gradient[0] : theme.colors.gray[0],
					})}
				>
					<Main />
				</Box>
			</AppShell>
		</>
	);
}
