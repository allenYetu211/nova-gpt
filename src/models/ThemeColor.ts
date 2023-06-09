/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-23 17:19:37
 * @LastEditTime: 2023-05-09 13:41:51
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/models/ThemeColor.ts
 */
import { DefaultMantineColor } from '@mantine/core';
export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends Function ? T[P] : DeepPartial<T[P]>;
};

// #2d3160
// #262d43
// dark_background: ['#101323', 'linear-gradient(135.31deg, #232A4F 0.54%, #121A26 100%)'],
// light_background: ['linear-gradient(315deg, #BCBAFF 0%, #E6E5FF 100%)', '#F6F7FF'],

// input_dark_background: ['#121926'],
// input_light_background: ['#FDFEFF'],

// card_utils_dark_background: ['#202B3D'],
// card_utils_light_background: ['#D3DAFF'],

// warn: ['#ffabab'],

export const ThemeColor: DeepPartial<
	Record<
		DefaultMantineColor,
		[string, string, string, string, string, string, string, string, string, string]
	>
> = {
	// https://smart-swatch.netlify.app/#2d3160
	light: [
		'#ededff',
		'#cacdeb',
		'#a8acd8',
		'#868bc6',
		'#6469b5',
		'#4a509b',
		'#3a3e7a',
		'#282c58',
		'#171b38',
		'#060819',
		// '#defef0',
		// '#b8f4d9',
		// '#90edc2',
		// '#66e4ab',
		// '#3cdc93',
		// '#23c37a',
		// '#16975e',
		// '#0a6c43',
		// '#014227',
		// '#00180a',
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
		// '#181a29',

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
		`linear-gradient(135deg, #8D57DE 0%, #5E5EEF 100%)`,
	],

	dark_background: ['#101323', 'linear-gradient(135.31deg, #232A4F 0.54%, #121A26 100%)'],
	light_background: ['linear-gradient(315deg, #BCBAFF 0%, #E6E5FF 100%)', '#F6F7FF'],

	input_dark_background: ['#121926'],
	input_light_background: ['#FDFEFF'],

	card_utils_dark_background: ['#202B3D'],
	card_utils_light_background: ['#D3DAFF'],

	warn: ['#ffabab'],
};
