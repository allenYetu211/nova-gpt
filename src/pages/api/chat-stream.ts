/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-27 15:40:21
 * @LastEditTime: 2023-04-27 19:16:20
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/pages/api/chat-stream.ts
 */
import { OpenAIStream } from './openAIStream'
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from 'eventsource-parser'

export const config = {
  runtime: 'edge',
}

export default async function POST(req: Request): Promise<Response> {
  const apiKey = req.headers.get('apiKey')
  const path = req.headers.get('path')

  if (!apiKey) {
    return new Response('ApiKey is required', { status: 400 })
  }
  if (!path) {
    return new Response('Path is required', { status: 400 })
  }

  const stream = await loadStream(req)
  return new Response(stream)
}

async function loadStream(req: Request) {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  const res = await OpenAIStream(req)

  let counter = 0

  const stream = new ReadableStream({
    async start(controller) {
      // callback
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === 'event') {
          const data = event.data
          if (data === '[DONE]') {
            controller.close()
            return
          }
          try {
            const json = JSON.parse(data)
            const text = json.choices[0].delta?.content || ''
            // if (counter < 2 && (text.match(/\n/) || []).length) {
            //   return
            // }
            const queue = encoder.encode(text)
            controller.enqueue(queue)
            // counter++
          } catch (e) {
            // maybe parse error
            controller.error(e)
          }
        }
      }
      const parser = createParser(onParse)
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk))
      }
    },
  })

  return stream
}
