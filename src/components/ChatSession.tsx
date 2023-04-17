/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-14 15:03:15
 * @LastEditTime: 2023-04-14 15:03:48
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /speak-gpt/src/components/ChatSeesion.tsx
 */

import { Flex, Button } from '@mantine/core';

export function ChatSession() {
  return (
    <Flex
      mih={50}
      bg="rgba(0, 0, 0, .3)"
      gap="xl"
      justify="flex-end"
      align="flex-start"
      direction="column"
      wrap="nowrap"
    >
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </Flex>
  );
}