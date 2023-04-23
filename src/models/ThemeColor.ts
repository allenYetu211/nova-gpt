/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-23 17:19:37
 * @LastEditTime: 2023-04-23 17:46:57
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/models/ThemeColor.ts
 */
import { DefaultMantineColor } from "@mantine/core";
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Function ? T[P] : DeepPartial<T[P]>;
};

// #2d3160
// #262d43

export const ThemeColor: DeepPartial<
  Record<
    DefaultMantineColor,
    [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ]
  >
> = {
  // https://smart-swatch.netlify.app/#2d3160
  light: [
    "#defef0",
    "#b8f4d9",
    "#90edc2",
    "#66e4ab",
    "#3cdc93",
    "#23c37a",
    "#16975e",
    "#0a6c43",
    "#014227",
    "#00180a",
  ],
  // https://smart-swatch.netlify.app/#2d3160
  dark: [
    "#ededff",
    "#cbcdea",
    "#a8acd6",
    "#858bc5",
    "#6469b4",
    "#4a509a",
    "#393e79",
    "#292c57",
    "#171b36",
    "#060817",
  ],

  darkButton: ["#2a313e"],

  // gradient: [`linear-gradient(to bottom, #060817 95%, #ededff 95%)`],
};
