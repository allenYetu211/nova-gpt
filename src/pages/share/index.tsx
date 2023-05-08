/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-07 14:35:46
 * @LastEditTime: 2023-05-07 23:52:36
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/pages/share/index.tsx
 */
import { supabase } from '@/lib/supabaseClient';

function Page({ countries }: { countries: any }) {
	return (
		<ul>
			{countries.map((country: any) => (
				<li key={country.id}>{country.name}</li>
			))}
		</ul>
	);
}

export async function getServerSideProps() {
	// let { data } = await supabase.from('countries').select();
	// console.log('data', data);
	// return {
	// 	props: {
	// 		countries: data,
	// 	},
	// };
}

export default Page;
