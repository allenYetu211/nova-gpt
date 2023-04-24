/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-20 00:19:37
 * @LastEditTime: 2023-04-23 18:20:28
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/components/ChatContent.tsx
 */

import { useChatStore } from "@/stores/ChatStore";
import { createStyles } from "@mantine/core";
import { memo, useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";

const useStyles = createStyles((theme) => ({
  container: {
    paddingBottom: theme.spacing.md,
    flex: 1,
    overflow: "auto",
    marginRight: `-${theme.spacing.md}`,
  },
}));

export const ChatContent = memo(() => {
  const { classes } = useStyles();
  const activeChatId = useChatStore((state) => state.activeChatId);
  const chats = useChatStore((state) => state.chats);
  const activeChat = chats.find((item) => item.id === activeChatId);
  const contentEl = useRef<HTMLDivElement>(null);
  const containerEl = useRef<HTMLDivElement>(null);
  const lastMessage = activeChat?.message[activeChat?.message.length - 1];
  const prevHeight = useRef<number>(0);

  const isScroll = useRef<boolean>(false);

  useEffect(() => {
    isScroll.current = true;
  }, [lastMessage]);

  useEffect(() => {
    const currHeight = contentEl.current?.getBoundingClientRect().height || 0;
    if (currHeight > prevHeight.current) {
      prevHeight.current = currHeight;
      updateScroll();
    }
  }, [lastMessage?.content]);

  const updateScroll = () => {
    if (!isScroll.current) {
      return;
    }
    const height = contentEl.current?.getBoundingClientRect().height;
    containerEl.current!.scrollTop = height!;
  };

  return (
    <div className={classes.container} ref={containerEl}>
      <div ref={contentEl}>
        {activeChat &&
          activeChat.message.map((item) => {
            return <ChatMessage key={item.id} message={item} />;
          })}
      </div>
    </div>
  );
});
