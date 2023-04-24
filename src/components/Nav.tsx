/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-14 15:01:08
 * @LastEditTime: 2023-04-24 23:42:52
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/src/components/Nav.tsx
 */
import {
  ActionIcon,
  Box,
  Text,
  Divider,
  Flex,
  Navbar,
  Tooltip,
  createStyles,
  Group,
} from "@mantine/core";

import { ChatSessionInput } from "@/components/ChatSessionInput";
import { changeActiveChatId, newChat } from "@/stores/ChatAction";
import { useChatStore } from "@/stores/ChatStore";
import { switchIsSetting } from "@/stores/SettingAction";
import { IconPlus, IconSettings } from "@tabler/icons-react";
import IconLogo from "@/images/svg/logo";

const useStyles = createStyles((theme) => ({
  chatItem: {
    width: "100%",
    padding: theme.spacing.xs,
    borderRadius: theme.radius.md,
    cursor: "pointer",
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },
  },
  chatItemActive: {
    background: theme.colors.gradient[3],
  },
  sessionContainer: {
    height: "100%",
  },
  chatContainer: {
    flex: 1,
    width: "100%",
    overflow: "auto",
  },
  icon: {
    width: 40,
    height: 40,
    padding: theme.spacing.xs,
  },
}));

export function Nav() {
  const { classes, theme, cx } = useStyles();
  const chats = useChatStore((state) => state.chats);
  const activeChatId = useChatStore((state) => state.activeChatId);

  const tooltipCommon = {
    openDelay: 200,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[1],
  };

  const chatsList = chats
    ? chats.map((chat) => {
        return (
          <Box
            key={chat.id}
            className={cx(classes.chatItem, {
              [classes.chatItemActive]: activeChatId === chat.id,
            })}
            onClick={() => changeActiveChatId(chat.id)}
          >
            <ChatSessionInput
              title={chat.title}
              id={chat.id}
              date={chat.createdAt}
              amount={chat.message.length}
            />
          </Box>
        );
      })
    : [];

  chatsList.reverse();

  return (
    <Navbar
      width={{ base: 330 }}
      sx={() => ({
        padding: "20px",
        backgroundColor: "transparent",
        border: "none",
      })}
      p="xs"
    >
      {/* <AudioAnimation /> */}

      <Flex
        direction="column"
        sx={(theme) => ({
          height: "100%",
          background:
            theme.colorScheme === "dark"
              ? theme.colors.gradient[2]
              : theme.colors.gray[0],
          borderRadius: theme.radius.xl,
          padding: theme.spacing.xl,
          boxShadow: theme.shadows.xl,
        })}
      >
        <Flex
          sx={{
            marginBottom: theme.spacing.xl,
          }}
          justify="space-between"
          align="center"
        >
          <Box>
            <Text fw={700}>Nova GPT</Text>
            <Text size="xs">Chat GPT NEXT WEB </Text>
          </Box>
          <IconLogo height="40px" width="40px" />
        </Flex>

        <Flex gap="md">
          <Tooltip {...tooltipCommon} label="New chat">
            <ActionIcon variant="default" size="xs" onClick={newChat}>
              <IconPlus />
            </ActionIcon>
          </Tooltip>

          <Tooltip {...tooltipCommon} label="Setting">
            <ActionIcon variant="default" size="xs" onClick={switchIsSetting}>
              <IconSettings />
            </ActionIcon>
          </Tooltip>
        </Flex>

        <Divider my="sm" variant="dashed" />

        <Flex
          mih={50}
          gap="md"
          justify="space-evenly"
          align="center"
          direction="column"
          wrap="wrap"
          className={classes.sessionContainer}
        >
          <Flex
            justify="flex-start"
            align="center"
            direction="column"
            wrap="nowrap"
            gap="md"
            className={classes.chatContainer}
          >
            {chatsList}
          </Flex>
        </Flex>
      </Flex>
    </Navbar>
  );
}
