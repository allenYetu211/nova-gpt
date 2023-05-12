/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-07 10:55:26
 * @LastEditTime: 2023-05-12 18:51:28
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/utils/download.ts
 */
import type { Message } from '@/stores/ChatStore';
import html2canvas from 'html2canvas';
import { notifications } from '@/components/Common';
import { ThemeColor } from '@/models/ThemeColor';
import { useSettingStore } from '@/stores/SettingStore';
import i18n from '@/i18n';

export function downloadAsMarkdown(message: Message[], filename: string) {
	const text = message2Markdown(message);

	const element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

export function message2Markdown(message: Message[]) {
	return message
		.map((m) => {
			return m.role === 'user' ? `##  USER:\n${m.content}` : `##  GPT:\n${m.content.trim()}`;
		})
		.join('\n\n');
}

export async function downloadAsCapture(
	filename: string,
	{ title, time }: { title: string; time: string },
) {
	notifications.show({
		id: 'downloading',
		title: i18n.notifications.image_generating,
		message: i18n.notifications.wait,
		loading: true,
	});

	const element = document.querySelector('#message-container')! as HTMLElement;
	const innerContent = element.innerHTML;
	const tempElement = document.createElement('div');
	tempElement.innerHTML = `<style>${borderStyle()}</style> 
  <div id="share-container">
    <div id="share-content-border">
    <div id="dot-1"></div> 
    <div id="dot-2"></div> 
    <div id="dot-3"></div> 
    <div id="title">
      <div>${title}</div>
      <div>${time}</div>
    </div>
    ${innerContent}
    </div>
  </div>
  `;

	document.body.appendChild(tempElement);

	html2canvas(tempElement).then(function (canvas) {
		// 创建一个链接，使用户可以下载生成的图像
		var link = document.createElement('a');
		document.body.appendChild(link);
		link.download = filename;
		link.href = canvas.toDataURL();
		link.target = '_blank';
		link.click();
		notifications.hide('downloading');
		// 删除生成的图像 URL
		window.URL.revokeObjectURL(link.href);

		// // 删除临时元素
		document.body.removeChild(tempElement);
	});
}

const borderStyle = () => {
	const colorScheme = useSettingStore.getState().colorScheme;
	// ThemeColor

	return `
  
  #share-container {
    width: 80%;
    margin: 0 auto;
    box-shadow: 1px 10px 25px rgba(0,0,0,.2);
  }

  #share-content-border  {
    border: 10px solid #232323;
    border-radius: 10px;
    border-top-width: 50px;
    background: ${
			colorScheme === 'dark' ? ThemeColor.dark_background![1] : ThemeColor.light_background![0]
		};
    position: relative;
    color: ${colorScheme === 'dark' ? ThemeColor.dark![0] : ThemeColor.light![6]};
  }

  #title {

    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    position: absolute;
    top: -2.5rem;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 0.7rem;
    color: #fff;
  }

  #title > first-child {
    font-size: 32px;
    font-weight: bold;
  }

  #title > last-child {
    font-size: 12px;
  }
  #dot-1 {
    position: absolute;
    width: 10px;
    height: 10px;
    top: -30px;
    left: 15px;
    background-color: #fe5a5a;
    border-radius: 50%;
  }
  #dot-2 {
    position: absolute;
    width: 10px;
    height: 10px;
    top: -30px;
    left: 35px;
    background-color: #fdf65f;
    border-radius: 50%;
  }
  #dot-3{
    position: absolute;
    width: 10px;
    height: 10px;
    top: -30px;
    left: 55px;
    background-color: #24ff1b;
    border-radius: 50%;
   
  }
  
  `;
};
