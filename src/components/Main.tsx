/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-14 12:08:23
 * @LastEditTime: 2023-04-23 12:53:43
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/components/Main.tsx
 */
import { MantineTheme, createStyles } from "@mantine/core";
import { ChatTextarea } from "@/components/ChatTextareaContainer";
import { ChatContent } from "@/components/ChatContent";
import { useSettingStore } from "@/stores/SettingStore";
import { Setting } from "./Setting";

const useStyles = createStyles((theme: MantineTheme) => {
  return {
    mainContainer: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    chatTextareaContainer: {},
  };
});

export function Main() {
  const isSetting = useSettingStore((state) => state.isSetting);
  const { classes } = useStyles();

  return (
    <>
      {isSetting ? (
        <Setting />
      ) : (
        <div className={classes.mainContainer}>
          <ChatContent />
          <ChatTextarea />
        </div>
      )}
    </>
  );
}
