/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-14 11:27:09
 * @LastEditTime: 2023-05-10 16:10:16
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

const useStyles = createStyles((theme) => ({
	appShell: {
		[`@media (max-width: ${theme.breakpoints.sm})`]: {},
	},
}));

export default function App({ Component, pageProps }: AppProps) {
	const [isHydrated, setIsHydrated] = useState(false);

	const colorScheme = useSettingStore((state) => state.colorScheme);
	const { theme } = useStyles();
	//Wait till NextJS rehydration completes
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
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				fontFamily: 'Verdana, sans-serif',
				fontFamilyMonospace: 'Monaco, Courier, monospace',
				// headings: { fontFamily: 'Greycliff CF, sans-serif' },
				colorScheme: colorScheme,
				colors: ThemeColor,
				other: {
					border01: colorScheme === 'dark' ? `${rem(1)} solid #5C6077` : `${rem(1)} solid #C6C2E1`,
					br24: rem(24),
					text: {
						dark: '',
						light: '',
					},
				},
				focusRingStyles: {
					resetStyles: () => ({ outline: 'none' }),
					styles: (theme) => ({ outline: `${rem(1)} solid ${theme.colors.dark[1]}` }),
					inputStyles: (theme) => ({ outline: `${rem(1)} solid ${theme.colors.dark[1]}` }),
				},
			}}
		>
			<Notifications />
			<ModalsProvider>
				<Component {...pageProps} />
			</ModalsProvider>
		</MantineProvider>
	);
}
