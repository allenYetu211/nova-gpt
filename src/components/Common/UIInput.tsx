import { TextInput, TextInputProps } from '@mantine/core';
import { FC } from 'react';

export const UIInput: FC<TextInputProps> = (props) => {
	return <TextInput {...props} />;
};
