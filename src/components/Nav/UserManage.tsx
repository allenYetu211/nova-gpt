import { UIButton, UICard, modal } from '@/components/Common';
import { IconUser, IconBrandGoogle, IconBrandGithub } from '@tabler/icons-react';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useEffect } from 'react';
import { Box, Divider, createStyles, rem } from '@mantine/core';
import { addPermissions, removePermissions } from '@/stores/UserAction';
import { useSettingStore } from '@/stores/SettingStore';
import { updateSetting } from '@/stores/SettingAction';
import i18n from '@/i18n';

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
		['.auth-button']: {
			background: 'transparent',
			borderRadius: theme.radius.md,
			border: theme.colorScheme === 'dark' ? `${rem(2)} solid #5C6077` : `${rem(2)} solid #C6C2E1`,
			['&:hover:not(:disabled)']: {
				background:
					theme.colorScheme === 'dark' ? 'rgba(92 ,96, 119,.1)' : 'rgba(198, 194, 225,.1)',
			},
		},
	},
}));

export const UserManage = () => {
	const user = useSettingStore((state) => state.userState);
	const { classes, theme } = useStyles();

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			updateSetting({ userState: session });
			session && addPermissions('logged');
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			updateSetting({ userState: session });
			session && addPermissions('logged');
		});

		return () => subscription.unsubscribe();
	}, []);

	const openLoginModal = () => {
		modal.open({
			title: i18n.login,
			centered: true,
			children: (
				<Box className={classes.loginContainer}>
					<Auth
						supabaseClient={supabase}
						appearance={{
							theme: ThemeSupa,

							className: {
								anchor: 'auth-anchor',
								button: 'auth-button',
							},
						}}
						providers={['google', 'github']}
						theme={theme.colorScheme === 'dark' ? 'dark' : 'light'}
					/>
				</Box>
			),
		});
	};

	const openLoginOutModal = () => {
		modal.open({
			modalId: 'loginOut',
			title: i18n.logout,
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
							removePermissions('logged');
							modal.closeAll();
						}}
					>
						{i18n.confirm}
					</UIButton>
				</Box>
			),
		});
	};

	if (!user) {
		return (
			<UIButton sx={{ width: '100%' }} onClick={openLoginModal} leftIcon={<IconUser />}>
				User Login
			</UIButton>
		);
	} else {
		return (
			<UIButton sx={{ width: '100%' }} onClick={openLoginOutModal}>
				{user.user.user_metadata.full_name}
			</UIButton>
		);
	}
};
