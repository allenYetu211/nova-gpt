import { UIButton, UICard, modal } from '@/components/Common';
import { IconUser, IconBrandGoogle, IconBrandGithub } from '@tabler/icons-react';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useState, useEffect } from 'react';
import { Box, Divider, createStyles } from '@mantine/core';

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPBASE_URL!,
	process.env.NEXT_PUBLIC_SUPBASE_TOKEN!,
);

const useStyles = createStyles((theme) => ({
	loginContainer: {
		['#auth-sign-in']: {
			display: 'none',
		},
		['.supabase-auth-ui_ui-divider']: {
			display: 'none',
		},
	},
}));

export const UserManage = () => {
	const [session, setSession] = useState<any>(null);
	const { classes } = useStyles();

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});

		return () => subscription.unsubscribe();
	}, []);

	const openLoginModal = () => {
		modal.open({
			centered: true,
			children: (
				<Box className={classes.loginContainer}>
					<Auth
						supabaseClient={supabase}
						appearance={{ theme: ThemeSupa }}
						providers={['google', 'github']}
						theme="dark"
					/>
				</Box>
			),
		});
	};

	const openLoginOutModal = () => {
		modal.open({
			modalId: 'loginOut',
			title: '退出登录?',
			centered: true,
			children: (
				<Box w="100%">
					<Divider
						sx={(theme) => ({
							marginBottom: theme.spacing.md,
						})}
					/>
					<UIButton
						sx={{ width: '100%' }}
						onClick={async () => {
							const { error } = await supabase.auth.signOut();
							console.log('error', error);
							modal.close('loginOut');
						}}
					>
						确定
					</UIButton>
				</Box>
			),
		});
	};

	if (!session) {
		return (
			<UIButton sx={{ width: '100%' }} onClick={openLoginModal} leftIcon={<IconUser />}>
				User Login
			</UIButton>
		);
	} else {
		return (
			<UIButton sx={{ width: '100%' }} onClick={openLoginOutModal}>
				{session.user.user_metadata.full_name}
			</UIButton>
		);
	}
};
