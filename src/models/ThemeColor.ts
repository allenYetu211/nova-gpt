/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-23 17:19:37
 * @LastEditTime: 2023-04-25 14:53:11
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/models/ThemeColor.ts
 */
import { DefaultMantineColor } from '@mantine/core';
export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends Function ? T[P] : DeepPartial<T[P]>;
};

// #2d3160
// #262d43

export const ThemeColor: DeepPartial<
	Record<
		DefaultMantineColor,
		[string, string, string, string, string, string, string, string, string, string]
	>
> = {
	// https://smart-swatch.netlify.app/#2d3160
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
	// https://smart-swatch.netlify.app/#2d3160
	dark: [
		'#efeefb',
		'#cfcee3',
		'#aeafce',
		'#8e90bb',
		'#6e72a7',
		'#55598e',
		'#42476f',
		'#2f3450',
		'#1c2031',
		'#070a15',
		// "#ededff",
		// "#cbcdea",
		// "#a8acd6",
		// "#858bc5",
		// "#6469b4",
		// "#4a509a",
		// "#393e79",
		// "#292c57",
		// "#171b36",
		// "#060817",
	],

	darkButton: ['#2a313e'],

	gradient: [
		`linear-gradient(to bottom left, #202539 30%,  #332538 100%)`,
		`linear-gradient(to right bottom, #8a3ffb 40%, #3646e8)`,
		`linear-gradient(to bottom, #262d42 60%, transparent)`,
		`linear-gradient(to right,  #8a3ffb  20%, #3646e8 60%, #2c3453)`,
		`linear-gradient(to right,  #8a3ffb  40%, #3646e8 90%, #3646e8)`,
		`linear-gradient(to right bottom, #fb3f95 40%, #7d5151)`,
	],
};
