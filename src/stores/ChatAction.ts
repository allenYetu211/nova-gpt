/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-18 12:36:37
 * @LastEditTime: 2023-04-23 15:56:31
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/stores/ChatAction.ts
 */
import { useChatStore, ChatState, Chat } from "./ChatStore";
import { v4 as uuidv4 } from "uuid";
import produce from "immer";

const get = useChatStore.getState;
const set = useChatStore.setState;

export const update = (newState: Partial<ChatState>) => set(() => newState);

export const updateOpenAIConfig = (
  newState: Partial<ChatState["openAIConfig"]>
) => {
  const openAIConfig = get().openAIConfig;

  set((state) => ({
    ...state,
    openAIConfig: {
      ...openAIConfig,
      ...newState,
    },
  }));
};

export const newChat = () => {
  const id = uuidv4();
  set((state) => ({
    activeChatId: id,
    chats: state.chats.concat({
      id,
      message: [],
      createdAt: new Date(),
      title: "New Chat",
    }),
  }));
};

export const getChatGPTConfig = () => {
  const {} = get();
  return {};
};

export const changeActiveChatId = (id: string) => {
  set(() => ({
    activeChatId: id,
  }));
};

export const deleteChat = (id: string) => {
  set((state) => ({
    chats: state.chats.filter((chat) => {
      return chat.id !== id;
    }),
  }));

  console.log("get().activeChatId", get().activeChatId);
};

export const changeChatTitle = (id: string, newTitle?: string) => {
  if (!newTitle) return;
  set((state) => ({
    chats: state.chats.map((chat) => {
      if (chat.id === id) {
        chat.title = newTitle;
      }
      return chat;
    }),
  }));
};

export const checkChat = (id: string) => {
  return false;
};
