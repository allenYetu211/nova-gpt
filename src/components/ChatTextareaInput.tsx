/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-23 10:35:16
 * @LastEditTime: 2023-04-25 10:18:09
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/ChatTextareaInput.tsx
 */
import { update } from '@/stores/ChatAction'
import { useChatStore } from '@/stores/ChatStore'
import { submitMessage } from '@/stores/SubmitAction'
import { Input, Textarea, createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  textarea: {
    width: '100%',
    height: 125,
    overflow: 'auto',
    border: 'none',
    borderRadius: theme.radius.xl,
    backgroundColor: '#181a29',
    boxShadow: theme.shadows.sm,
    padding: theme.spacing.xl,
    fontSize: theme.fontSizes.sm,
    resize: 'none',
    ['&:focus']: {
      outline: 'none',
    },
  },
}))

export const ChatTextareaInput = () => {
  const textareaMessage = useChatStore((state) => state.textareaMessage)
  const { classes } = useStyles()

  const onChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    update({ textareaMessage: e.target.value })
  }

  return (
    <textarea
      className={classes.textarea}
      placeholder="Ctrl + Enter Send Message"
      value={textareaMessage}
      // withAsterisk
      // autosize={true}
      onChange={onChangeTextarea}
      onKeyDown={(e) => {
        if (e.key !== 'Enter') return
        if (e.ctrlKey && e.key === 'Enter') {
          submitMessage()
        }
      }}
    />
  )
}
