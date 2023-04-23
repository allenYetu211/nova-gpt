import { Chat } from "@/stores/ChatStore";

export function keepDecimal(num: number, decimal: number) {
  return Math.round(num * Math.pow(10, decimal)) / Math.pow(10, decimal);
}

export function updateActionsChatMessage(
  chats: Chat[],
  id: string,
  callback: (message: Chat["message"]) => Chat["message"]
) {
  return chats.map((chat) => {
    if (chat.id === id) {
      chat.message = callback(chat.message);
    }
    return chat;
  });
}

export const getActiveChat = (chats: Chat[], id: string) => {
  return chats.find((chat) => chat.id === id);
};
