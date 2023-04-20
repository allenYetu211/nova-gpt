/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-19 10:58:17
 * @LastEditTime: 2023-04-21 01:04:35
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/fetchs/OpenAI.ts
 */
import { IncomingMessage } from 'http'
import https from 'https'
import axios from 'axios'
import { Message } from '@/stores/ChatStore'
import { truncateMessages, countTokens } from '@/models/ChatMessage'
import { getModelInfo } from '@/models/ModelsAccount'

const fetchOpenAIData = async (url: string, key: string) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    })
    return data
  } catch (e) {
    console.error(e)
  }
}

export const fetchModels = async (key: string) => {
  try {
    const res = await fetchOpenAIData('https://api.openai.com/v1/models', key)
    return res
  } catch (e) {
    console.warn(e)
    return []
  }
}

export async function _streamCompletion(
  payload: string,
  apiKey: string,
  abortController?: AbortController,
  callback?: ((res: IncomingMessage) => void) | undefined,
  errorCallback?: ((res: IncomingMessage, body: string) => void) | undefined,
) {
  const req = https.request(
    {
      hostname: 'api.openai.com',
      port: 443,
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      signal: abortController?.signal,
    },
    (res) => {
      if (res.statusCode !== 200) {
        let errorBody = ''
        res.on('data', (chunk) => {
          errorBody += chunk
        })
        res.on('end', () => {
          errorCallback?.(res, errorBody)
        })
        return
      }
      callback?.(res)
    },
  )

  req.write(payload)

  req.end()
}

interface ChatCompletionParams {
  model: string
  temperature: number
  top_p: number
  n: number
  stop: string
  max_tokens: number
  presence_penalty: number
  frequency_penalty: number
  logit_bias: string
}

const paramKeys = [
  'model',
  'temperature',
  'top_p',
  'n',
  'stop',
  'max_tokens',
  'presence_penalty',
  'frequency_penalty',
  'logit_bias',
]

export async function streamCompletion(
  messages: Message[],
  params: ChatCompletionParams,
  apiKey: string,
  abortController?: AbortController,
  callback?: ((res: IncomingMessage) => void) | undefined,
  endCallback?: ((tokensUsed: number) => void) | undefined,
  errorCallback?: ((res: IncomingMessage, body: string) => void) | undefined,
) {
  const modelInfo = getModelInfo(params.model)

  // Truncate messages to fit within maxTokens parameter
  // const submitMessages = truncateMessages(
  //   messages,
  //   modelInfo.maxTokens,
  //   params.max_tokens,
  // )

  const submitParams = Object.fromEntries(
    Object.entries(params).filter(([key]) => paramKeys.includes(key)),
  )

  const payload = JSON.stringify({
    // messages: submitMessages.map(({ role, content }) => ({ role, content })),
    messages: messages.map(({ role, content }) => ({ role, content })),
    stream: true,
    ...{
      ...submitParams,
      logit_bias: JSON.parse(params.logit_bias || '{}'),
      // 0 == unlimited
      max_tokens: params.max_tokens || undefined,
    },
  })

  let buffer = ''

  const successCallback = (res: IncomingMessage) => {
    res.on('data', (chunk) => {
      if (abortController?.signal.aborted) {
        res.destroy()
        endCallback?.(0)
        return
      }

      // Split response into individual messages
      const allMessages = chunk.toString().split('\n\n')
      for (const message of allMessages) {
        // Remove first 5 characters ("data:") of response
        const cleaned = message.toString().slice(5)

        if (!cleaned || cleaned === ' [DONE]') {
          return
        }

        let parsed
        try {
          parsed = JSON.parse(cleaned)
        } catch (e) {
          console.error(e)
          return
        }

        const content = parsed.choices[0]?.delta?.content
        if (content === undefined) {
          continue
        }
        buffer += content

        callback?.(content)
      }
    })

    res.on('end', () => {
      const tokensUsed =
        // countTokens(submitMessages.map((m) => m.content).join('\n')) +
        countTokens(messages.map((m) => m.content).join('\n')) +
        countTokens(buffer)

      endCallback?.(tokensUsed)
    })
  }

  return _streamCompletion(
    payload,
    apiKey,
    abortController,
    successCallback,
    errorCallback,
  )
}
