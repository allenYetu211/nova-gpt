import { create } from "zustand";
import { persist } from "zustand/middleware";

export const defaultSettings = {
  model: "gpt-3.5-turbo",
  temperature: 1,
  top_p: 1,
  n: 1,
  stop: "",
  max_tokens: 2000,
  presence_penalty: 0,
  frequency_penalty: 0,
  logit_bias: "",
  auto_title: true,
};

interface SettingsForm {
  // GPT
  model: string;
  temperature: number;
  top_p: number;
  n: number;
  stop: string;
  max_tokens: number;
  presence_penalty: number;
  frequency_penalty: number;
  logit_bias: string;
  auto_title: boolean;
}

export interface SettingState {
  isSetting: boolean;
  openAI: {
    /**
     * open ai config
     */
    key: string;
    models: string[];
    history: number;
    config: SettingsForm;
  };
}

const initialSettingState: SettingState = {
  isSetting: false,
  openAI: {
    key: process.env.NEXT_PUBLIC_OPEN_AI_KEY || "",
    models: [
      "gpt-3.5-turbo",
      "gpt-3.5-turbo-0301",
      "gpt-4-32k-0314",
      "gpt-4-32k",
      "gpt-4-0314",
      "gpt-4",
    ],
    history: 4,
    config: defaultSettings,
  },
};

const store = () => ({ ...initialSettingState } as SettingState);

export const useSettingStore = create<SettingState>()(
  persist(store, {
    name: "chat-setting-store",
  })
);
