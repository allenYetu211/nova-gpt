/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-07 16:45:14
 * @LastEditTime: 2023-05-07 23:52:40
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/pages/share/[chatId].tsx
 */
import { useEffect } from 'react';
import { ChatMessage } from '@/components/ChatContent/ChatMessage';
import { useRouter } from 'next/router';
import { setActiveChatId } from '@/stores/ChatAction';
// import { supabase } from '@/lib/supabaseClient';

export const ShareChat = () => {
	const router = useRouter();
	const activeChatId = router.query.chatId as string | undefined;
	useEffect(() => {
		setActiveChatId(activeChatId as string | undefined);
	}, [activeChatId]);
};

export async function getServerSideProps() {
	// let { data } = await supabase.from('countries').select();
	// console.log('data', data);
	// return {
	// 	props: {
	// 		countries: data,
	// 	},
	// };
}
