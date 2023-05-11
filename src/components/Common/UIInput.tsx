/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-05 16:09:58
 * @LastEditTime: 2023-05-11 10:57:53
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/Common/UIInput.tsx
 */
import { TextInput, TextInputProps } from '@mantine/core';
import { FC, forwardRef } from 'react';

export const UIInput: FC<TextInputProps> = (props) => {
	return <TextInput {...props} />;
};
