/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-14 12:08:23
 * @LastEditTime: 2023-04-25 14:19:12
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/Main.tsx
 */
import { ChatContent } from "@/components/ChatContent";
import { ChatTextarea } from "@/components/ChatTextareaContainer";
import { useSettingStore } from "@/stores/SettingStore";
import { MantineTheme, createStyles } from "@mantine/core";
import { Setting } from "./Setting";
import { EmptyChats } from "./Empty";
import { useChatStore } from "@/stores/ChatStore";

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
  const notKey = useSettingStore((state) => !state.openAI.key);
  const notChats = useChatStore((state) => !state.chats.length);
  const { classes } = useStyles();

  return (
    <>
      <Setting />
      <div className={classes.mainContainer}>
        {notKey || notChats ? <EmptyChats /> : <ChatContent />}
        <ChatTextarea />
      </div>
    </>
  );
}
