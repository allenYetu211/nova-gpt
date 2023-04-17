import { Flex, Button } from '@mantine/core';

export function Nav() {
  return (
    <Flex
      mih={50}
      gap="xl"
      justify="flex-end"
      align="flex-start"
      direction="column"
      wrap="nowrap"
    >
      <div>
        <h3>修改内容  </h3>
      </div>
      <div>
        <h3>修改内容  </h3>
      </div>
      <div>
        <h3>修改内容  </h3>
      </div>
    </Flex>
  );
}