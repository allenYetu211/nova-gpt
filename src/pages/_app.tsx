/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-14 11:27:09
 * @LastEditTime: 2023-04-24 23:09:08
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/pages/_app.tsx
 */
import '@/styles/globals.css'
import '@/styles/Markdown.css'

import { Nav } from '@/components/Nav'
import { ThemeColor } from '@/models/ThemeColor'
import {
  AppShell,
  Box,
  createStyles,
  Header,
  MantineProvider,
} from '@mantine/core'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const useStyles = createStyles({})

export default function App({ Component, pageProps }: AppProps) {
  const [isHydrated, setIsHydrated] = useState(false)
  const { theme } = useStyles()
  //Wait till NextJS rehydration completes
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    return <div>Loading...</div>
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
          /** Put your mantine theme override here */
          colorScheme: 'dark',
          colors: ThemeColor,
        }}
      >
        <AppShell
          padding="md"
          navbar={<Nav />}
          styles={(theme) => ({
            main: {
              background:
                theme.colorScheme === 'dark'
                  ? theme.colors.gradient[0]
                  : theme.colors.gray[0],
            },
          })}
        >
          <Box
            sx={{
              height: `calc(100vh - 3rem)`,
            }}
          >
            <Component {...pageProps} />
          </Box>
        </AppShell>
      </MantineProvider>
    </>
  )
}
