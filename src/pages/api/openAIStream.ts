/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-27 17:35:04
 * @LastEditTime: 2023-04-27 19:18:40
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/pages/api/openAIStream.ts
 */
const HOST = 'api.openai.com'
export async function OpenAIStream(req: Request) {
  const apiKey = req.headers.get('apiKey')
  const path = req.headers.get('path')
  const payload = await req.json()
  return await fetch(`https://${HOST}/${path}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey ?? ''}`,
    },
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
