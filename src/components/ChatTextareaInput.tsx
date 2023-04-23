/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-23 10:35:16
 * @LastEditTime: 2023-04-23 18:14:00
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/components/ChatTextareaInput.tsx
 */
import { Textarea } from "@mantine/core";
import { update } from "@/stores/ChatAction";
import { useChatStore } from "@/stores/ChatStore";
import { submitMessage } from "@/stores/SubmitAction";

export const ChatTextareaInput = () => {
  const textareaMessage = useChatStore((state) => state.textareaMessage);

  const onChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    update({ textareaMessage: e.target.value });
  };

  return (
    <Textarea
      sx={(theme) => ({
        flex: 1,
        maxHeight: 300,
        overflow: "auto",
        border: "none",
        borderRadius: theme.radius.xl,
        textarea: {
          border: "none",
          backgroundColor: "#181a29",
          boxShadow: theme.shadows.sm,
        },
      })}
      placeholder="Your question"
      value={textareaMessage}
      withAsterisk
      autosize={true}
      onChange={onChangeTextarea}
      onKeyDown={(e) => {
        if (e.key !== "Enter") return;
        if (e.ctrlKey && e.key === "Enter") {
          submitMessage();
        }
      }}
    />
  );
};
