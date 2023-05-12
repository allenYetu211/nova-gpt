/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-14 11:27:09
 * @LastEditTime: 2023-05-11 11:08:01
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/pages/_app.tsx
 */
import '@/styles/globals.css';
import '@/styles/Markdown.css';

import { ThemeColor } from '@/models/ThemeColor';
import { createStyles, MantineProvider, Loader, rem } from '@mantine/core';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { useSettingStore } from '@/stores/SettingStore';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import Head from 'next/head';

const useStyles = createStyles((theme) => ({
	appShell: {
		[`@media (max-width: ${theme.breakpoints.sm})`]: {},
	},
}));

export default function App({ Component, pageProps }: AppProps) {
	const [isHydrated, setIsHydrated] = useState(false);

	const colorScheme = useSettingStore((state) => state.colorScheme);
	const { theme } = useStyles();
	useEffect(() => {
		setIsHydrated(true);
	}, []);

	if (!isHydrated) {
		return (
			<div
				style={{
					width: '100vw',
					height: '100vh',
					backgroundColor: theme.colors.dark[6],
				}}
			>
				<div
					style={{
						position: 'absolute',
						left: '50%',
						top: '50%',
						transform: 'translate(-50%, -50%)',
					}}
				>
					<Loader size="xs" color="grape" variant="bars" />
				</div>
			</div>
		);
	}

	return (
		<>
			<Head>
				<title>Nova GPT</title>
				<meta name="description" content="Extension Chat GPT WEB" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{/* <link rel="icon" href="/favicon.ico" /> */}
				<link rel="icon" type="image/svg+xml" href="/logo.svg" />
			</Head>

			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					fontFamily: 'Verdana, sans-serif',
					fontFamilyMonospace: 'Monaco, Courier, monospace',
					colorScheme: colorScheme,
					colors: ThemeColor,
					other: {
						border01:
							colorScheme === 'dark' ? `${rem(1)} solid #5C6077` : `${rem(1)} solid #C6C2E1`,
						br24: rem(24),
					},
					focusRingStyles: {
						resetStyles: () => ({ outline: 'none' }),
						styles: (theme) => ({ outline: 'none' }),
						inputStyles: (theme) => ({ outline: 'none' }),
					},
				}}
			>
				<Notifications />
				<ModalsProvider>
					<Component {...pageProps} />
				</ModalsProvider>
			</MantineProvider>
		</>
	);
}
