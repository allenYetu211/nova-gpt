/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-23 12:32:12
 * @LastEditTime: 2023-04-23 14:28:02
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/components/Markdown.tsx
 */
import { FC, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import RemarkMath from 'remark-math'
import RemarkBreaks from 'remark-breaks'
import RehypeKatex from 'rehype-katex'
import RemarkGfm from 'remark-gfm'
import RehypePrsim from 'rehype-prism-plus'
import 'katex/dist/katex.min.css'

interface MarkdownProps {
  content: string
}
export const Markdown: FC<MarkdownProps> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
      rehypePlugins={[RehypeKatex, [RehypePrsim, { ignoreMissing: true }]]}
      components={{
        pre: PreCode,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

export const PreCode = (props: { children: any }) => {
  const ref = useRef<HTMLPreElement>(null)

  return <pre ref={ref}>{props.children}</pre>
}
