import EmojiPicker, { EmojiStyle, EmojiClickData, Emoji } from 'emoji-picker-react';
import { FC } from 'react';
import { useSettingStore } from '@/stores/SettingStore';
import { createStyles } from '@mantine/core';

interface EmojiProps {
	onEmojiClick: (emojiData: EmojiClickData) => void;
}

const useStyles = createStyles((theme) => ({
	pickContainer: {
		['& aside.EmojiPickerReact.epr-main']: {
			border: 'none',
			backgroundColor: 'transparent',
		},
		['& aside.EmojiPickerReact li.epr-emoji-category>.epr-emoji-category-label']: {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.light[2],
		},
		['& aside.EmojiPickerReact .epr-search']: {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.light[2],
		},
		['& aside.EmojiPickerReact .epr-search-container input.epr-search:focus']: {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.light[2],
		},
		['& aside.EmojiPickerReact .epr-preview']: {
			borderTop: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.light[2],
		},
	},
}));

export const Picker: FC<EmojiProps> = (props) => {
	const colorScheme = useSettingStore((state) => state.colorScheme);
	const { classes } = useStyles();

	return (
		<div className={classes.pickContainer}>
			<EmojiPicker theme={colorScheme ?? 'dark'} onEmojiClick={props.onEmojiClick} />
		</div>
	);
};

export const EmojiIcon = (props: { unified: string }) => {
	const { unified } = props;
	return (
		<>{unified ? <Emoji unified={unified} emojiStyle={EmojiStyle.APPLE} size={22} /> : null}</>
	);
};
