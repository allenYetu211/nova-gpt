/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-14 11:27:09
 * @LastEditTime: 2023-04-23 18:18:51
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/pages/_app.tsx
 */
import "@/styles/globals.css";
import "@/styles/Markdown.css";

import type { AppProps } from "next/app";
import { createStyles } from "@mantine/core";
import Head from "next/head";
import { Nav } from "@/components/Nav";
import { MantineProvider, AppShell, Box, Header } from "@mantine/core";
import { useState, useEffect } from "react";
import { ThemeColor } from "@/models/ThemeColor";

const useStyles = createStyles({});

export default function App({ Component, pageProps }: AppProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const { theme } = useStyles();
  //Wait till NextJS rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <div>Loading...</div>;
  }

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
          colorScheme: "dark",
          colors: ThemeColor,
        }}
      >
        <AppShell
          padding="md"
          navbar={<Nav />}
          // header={
          //   <Header height={60} p="xs">
          //     Speak GPT
          //   </Header>
          // }
          styles={(theme) => ({
            main: {
              background:
                theme.colorScheme === "dark"
                  ? // ? `linear-gradient(to top, ${theme.colors.dark[8]} 30%,  ${theme.colors.dark[0]} 95%)`
                    // `linear-gradient(to top, ${theme.colors.dark[8]} 70%, ${theme.colors.dark[0]} 70%);`
                    `linear-gradient(to bottom left, #202539 30%,  #332538 100%);`
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
  );
}
