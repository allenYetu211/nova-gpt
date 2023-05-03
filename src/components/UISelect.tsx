/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-03 15:36:07
 * @LastEditTime: 2023-05-03 16:13:16
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/UISelect.tsx
 */
import { Select, SelectProps, rem } from '@mantine/core';

export const UISelect = (props: SelectProps & React.RefAttributes<HTMLInputElement>) => {
	return (
		<Select
			styles={(theme) => ({
				outline: `${rem(2)} solid ${theme.colors.dark[2]}`,
				item: {
					// applies styles to selected item
					'&[data-selected]': {
						'&, &:hover': {
							backgroundColor:
								theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.light[1],
							color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.light[8],
						},
					},
					// applies styles to hovered item (with mouse or keyboard)
					'&[data-hovered]': {},
				},
			})}
			{...props}
		/>
	);
};
