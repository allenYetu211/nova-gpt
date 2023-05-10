/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-09 16:57:03
 * @LastEditTime: 2023-05-10 10:44:42
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/pages/login/index.tsx
 */
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { UIModal } from '@/components/Common';
import { Box, Flex, Text, createStyles, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
	authContainer: {
		height: '100vh',
		width: rem(600),
		margin: '0 auto',
	},
}));

export default function Login() {
	const supabase = createClient(
		process.env.NEXT_PUBLIC_SUPBASE_URL!,
		process.env.NEXT_PUBLIC_SUPBASE_TOKEN!,
	);

	const { classes, theme } = useStyles();

	return (
		// 帮我写一个UI ，使用auth-ui-react登录，但是我需要取消email登录。  你帮我处理下

		<Flex align="center" justify="center" className={classes.authContainer}>
			<Auth
				supabaseClient={supabase}
				appearance={{ theme: ThemeSupa }}
				providers={['google', 'github']}
				theme="dark"
			/>
		</Flex>
	);
}
