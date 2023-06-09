import {
  createStyles,
  Header,
  Container,
  Group,
  Button,
  Text,
  Popover,
  Stack,
} from "@mantine/core";

//import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import ColorModeButton from "./ColorModeButton";
import ConnectWallet from "./ConnectWallet";
//import ProjectLogo from "./ProjectLogo";
//import PushNotifiction from "../PushNotifiction";

const HEADER_HEIGHT = 90;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    boxShadow: theme.shadows.lg,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

export default function NavbarHead() {
  const { classes } = useStyles();

  return (
    <Header
      bg="transparent"
      sx={{ backdropFilter: "blur(5px)", borderBottom: 0 }}
      height={HEADER_HEIGHT}
    >
      <Container className={classes.inner} fluid>
        <Group>{/* <ProjectLogo /> */}</Group>
        <Group spacing={5} className={classes.links}>
          <Popover trapFocus position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Button
                variant="default"
                radius="md"
                className={classes.linkLabel}
              >
                <Text fw="500" fz="md" className="ultra">
                  Gamers
                </Text>
              </Button>
            </Popover.Target>
            <Popover.Dropdown
              sx={(theme) => ({
                background:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[7]
                    : theme.white,
              })}
            >
              <Stack>
                <Link
                  exact="true"
                  to="/signup"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <Button
                    variant="default"
                    radius="md"
                    className={classes.linkLabel}
                  >
                    <Text fw="500" fz="md" className="ultra">
                      Sign up
                    </Text>
                  </Button>
                </Link>

                <Link
                  exact="true"
                  to="/gamer_challenger"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <Button
                    variant="default"
                    radius="md"
                    className={classes.linkLabel}
                  >
                    <Text fw="500" fz="md" className="ultra">
                      Gamers
                    </Text>
                  </Button>
                </Link>
              </Stack>
            </Popover.Dropdown>
          </Popover>

          <Link
            exact="true"
            to="/collection/create"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <Button variant="default" radius="md" className={classes.linkLabel}>
              <Text fw="500" fz="md" className="ultra">
                Create collection
              </Text>
            </Button>
          </Link>

          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            to="/meetingroom"
          >
            <Button variant="default" radius="md" className={classes.linkLabel}>
              <Text fw="500" fz="md" className="ultra">
                {" "}
                Meeting Room
              </Text>
            </Button>
          </Link>
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            to="/Streamroom"
          >
            <Button variant="default" radius="md" className={classes.linkLabel}>
              <Text fw="500" fz="md" className="ultra">
                Stream Room
              </Text>
            </Button>
          </Link>
        </Group>

        <Group className={classes.linkLabel}>
          {/* <PushNotifiction /> */}
          <div className={classes.links}>{/* <ColorModeButton /> */}</div>
          <ConnectWallet />
        </Group>
      </Container>
    </Header>
  );
}
