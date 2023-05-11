/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-05-10 11:09:36
 * @LastEditTime: 2023-05-11 11:26:58
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/Common/Models.tsx
 */
import { modals, openModal, closeModal, closeAllModals } from '@mantine/modals';
import { ModalSettings } from '@mantine/modals/lib/context';
import { ConfirmModalProps } from '@mantine/modals/lib/ConfirmModal';
import { UICard } from '@/components/Common';
import { Title, createStyles, Box } from '@mantine/core';

export interface OpenConfirmModal extends ModalSettings, ConfirmModalProps {}

interface novaModalTypes {
	open: (props: ModalSettings) => void;
	close: (id: string) => void;
	closeAll: () => void;
}
export const modal: novaModalTypes = {
	open: (props) => {
		const { overlayProps, ...other } = props;
		modals.open({
			...other,
			overlayProps: Object.assign(
				{
					opacity: 0.55,
					blur: 3,
				},
				overlayProps,
			),
		});
	},
	close: (id) => {
		modals.close(id);
	},
	closeAll: () => {
		modals.closeAll();
	},
};
