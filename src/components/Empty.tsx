import { newChat } from "@/stores/ChatAction";
import { switchIsSetting } from "@/stores/SettingAction";
import { useSettingStore } from "@/stores/SettingStore";
import {
  Box,
  Button,
  List,
  Text,
  ThemeIcon,
  Title,
  createStyles,
  Divider,
  Group,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  container: {
    paddingBottom: theme.spacing.md,
    flex: 1,
    // overflow: 'auto',
    width: "auto",
    marginTop: theme.spacing.md,
  },
  listGroup: {
    margin: `${theme.spacing.md} 0 ${theme.spacing.md}`,
  },
}));

export const EmptyChats = () => {
  const key = useSettingStore((state) => state.openAI.key);
  const { classes, theme } = useStyles();

  return (
    <Box className={classes.container}>
      <Title
        variant="gradient"
        gradient={{ from: "#8a3ffb", to: "#3646e8", deg: 50 }}
        order={1}
      >
        Nova GPT
      </Title>
      <Text
        variant="gradient"
        gradient={{ from: "#8a3ffb", to: "#3646e8", deg: 10 }}
        c="dimmed"
        fz="sm"
      >
        Smarter and more visually appealing Chat GPT WEB.
      </Text>

      <Group className={classes.listGroup}>
        <List
          spacing="md"
          size="sm"
          center
          icon={
            <ThemeIcon color={theme.colors.dark[5]} size={18} radius="xl">
              <IconCheck size="1rem" />
            </ThemeIcon>
          }
        >
          <List.Item>
            {" "}
            Run locally on your browser - no need to install any applications No
            need
          </List.Item>
          <List.Item> No need for users in China to use a VPN</List.Item>
          <List.Item>
            {" "}
            Support microphone input - using Tencent Cloud Speech Recognition
          </List.Item>
          <List.Item>
            {" "}
            API key and data stored in local storage - ensuring your data
            privacy and security
          </List.Item>
        </List>
      </Group>

      {key ? (
        <Button
          radius="xl"
          style={{
            background: theme.colors.gradient[4],
          }}
          onClick={newChat}
        >
          Create First Chat
        </Button>
      ) : (
        <Button radius="xl" onClick={switchIsSetting}>
          Configuring the application
        </Button>
      )}
    </Box>
  );
};

// interface BaseButtonProps {

// }
// const BaseButton: FC<PropsWithChildren<Button>>  = ({children}) => {
//   <Button onClick={switchIsSetting}>children</Button>
// }
