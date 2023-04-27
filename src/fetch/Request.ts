/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-26 09:44:32
 * @LastEditTime: 2023-04-27 19:28:09
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/fetch/Request.ts
 */
import { Message } from "@/stores/ChatStore";
import { SettingsForm } from "@/stores/SettingStore";

type ChatCompletionParams = Omit<SettingsForm, "auto_title">;

import { paramKeys } from "@/stores/SettingStore";

export const requestOpenAI = async (
  messages: Message[],
  params: ChatCompletionParams,
  apiKey: string,
  abortController?: AbortController,
  callback?: ((value: string) => void) | undefined,
  endCallback?: (() => void) | undefined,
  errorCallback?: ((body: string) => void) | undefined
) => {
  const submitParams = Object.fromEntries(
    Object.entries(params).filter(([key]) => paramKeys.includes(key))
  );
  const payload = JSON.stringify({
    stream: true,
    messages: messages.map(({ content, role }) => ({ content, role })),
    ...{
      ...submitParams,
      logit_bias: {},
      max_tokens: params.max_tokens || undefined,
    },
  });

  try {
    const response = await fetch("/api/chat-stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiKey: apiKey,
        path: "v1/chat/completions",
      },
      body: payload,
      signal: abortController!.signal,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done: doneReading } = await reader.read();
      if (doneReading) {
        endCallback!();
        break;
      }
      const chunkValue = decoder.decode(value);
      callback!(chunkValue);
    }
  } catch (e: any) {
    errorCallback!(e.message)!;
  }
};
