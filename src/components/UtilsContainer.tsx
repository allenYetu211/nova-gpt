/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-18 16:50:34
 * @LastEditTime: 2023-04-19 00:34:18
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/components/UtilsContainer.tsx
 */
import {

  ActionIcon
} from '@mantine/core';

import {
  IconSettings
} from '@tabler/icons-react';


export const UtilsContainer = () => {
  return (
    <div>
       <ActionIcon>
          <IconSettings />
        </ActionIcon>
    </div>
  )
}