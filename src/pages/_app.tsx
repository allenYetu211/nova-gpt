/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-14 11:27:09
 * @LastEditTime: 2023-04-14 15:53:47
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/pages/_app.tsx
 */
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";
import { ChatSession } from '@/components/ChatSession'
import { Nav } from '@/components/Nav'
import {
  MantineProvider,
  AppShell,
  Navbar,
  Header
} from '@mantine/core';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Speak GPT</title>
        <meta name="description" content="A new ChatGPT UI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'dark',
          colors: {
            // https://smart-swatch.netlify.app/#4cdf9c
            light: [
              '#defef0',
              '#b8f4d9',
              '#90edc2',
              '#66e4ab',
              '#3cdc93',
              '#23c37a',
              '#16975e',
              '#0a6c43',
              '#014227',
              '#00180a',
            ],
            // https://smart-swatch.netlify.app/#1d241d
            dark: [
              '#e8f3ff',
              '#cfd8e3',
              '#b5bdcc',
              '#97a3b4',
              '#7b899d',
              '#626f84',
              '#4b5768',
              '#343e4b',
              '#1e2530',
              '#070c18',
            ],
          },
        }}
      >
        <AppShell
          padding="md"
          navbar={
            <Navbar width={{ base: 230 }} p="xs">
              <Nav />
            </Navbar>

          }
          header={<Header height={60} p="xs">321321321</Header>}
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
            },
          })}
        >
          <Component {...pageProps} />
        </AppShell>
      </MantineProvider>
    </>

  )
}
