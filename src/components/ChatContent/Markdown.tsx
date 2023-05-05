/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-23 12:32:12
 * @LastEditTime: 2023-04-29 19:32:37
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/Markdown.tsx
 */
import 'katex/dist/katex.min.css';
import { FC, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import RehypeKatex from 'rehype-katex';
import RehypePrsim from 'rehype-prism-plus';
import RemarkBreaks from 'remark-breaks';
import RemarkGfm from 'remark-gfm';
import RemarkMath from 'remark-math';
import { Badge, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
	codeContainer: {
		position: 'relative',
		'&:hover': {
			[`& .mantine-Badge-root`]: {
				opacity: 1,
				pointerEvents: 'all',
			},
		},
	},

	badge: {
		position: 'absolute',
		right: 5,
		top: 5,
		zIndex: 1,
		pointerEvents: 'none',
		cursor: 'pointer',
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
		opacity: 0,
	},
}));

interface MarkdownProps {
	content: string;
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
	);
};

export const PreCode = (props: { children: any }) => {
	const [copyText, setCopyText] = useState<string>('Copy');
	const ref = useRef<HTMLPreElement>(null);
	const { classes } = useStyles();

	return (
		<div
			className={classes.codeContainer}
			onMouseLeave={() => {
				setCopyText('Copy');
			}}
		>
			<Badge
				className={classes.badge}
				onClick={async () => {
					if (ref.current) {
						const text = ref.current.innerText;
						try {
							await navigator.clipboard.writeText(text);
							setCopyText('Copy Success!');
						} catch (error) {
							const textArea = document.createElement('textarea');
							textArea.value = text;
							document.body.appendChild(textArea);
							textArea.focus();
							textArea.select();
							try {
								document.execCommand('copy');
								setCopyText('Copy Success!');
							} catch (error) {
								setCopyText('Copy Failed!');
							}
							document.body.removeChild(textArea);
						}
					}
				}}
			>
				{copyText}
			</Badge>
			<pre ref={ref}>{props.children}</pre>
		</div>
	);
};
