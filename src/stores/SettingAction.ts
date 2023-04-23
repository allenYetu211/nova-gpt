import { useSettingStore, SettingState } from './SettingStore'

const getSetting = useSettingStore.getState
const setSetting = useSettingStore.setState

export const updateOpenAIConfig = (
  newState: Partial<SettingState['openAI'] | SettingState['openAI']['config']>,
) => {
  setSetting((state) => ({
    openAI: {
      ...state.openAI,
      config: {
        ...state.openAI.config,
        ...newState,
      },
    },
  }))
}

export const switchIsSetting = () => {
  setSetting((state) => ({
    isSetting: !state.isSetting,
  }))
}
