import { useSettingStore, SettingState } from './SettingStore'

const get = useSettingStore.getState
const set = useSettingStore.setState

export const updateOpenAIConfig = (
  newState: Partial<SettingState['openAI'] | SettingState['openAI']['config']>,
) => {
  set((state) => ({
    openAI: {
      ...state.openAI,
      config: {
        ...state.openAI.config,
        ...newState,
      },
    },
  }))
}
