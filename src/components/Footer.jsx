import React from "react";
import { Link } from "react-router-dom";
import { createStyles, Group, ActionIcon, Text } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandGithub,
} from "@tabler/icons-react";

import { Center } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 50,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${theme.spacing.md}px ${theme.spacing.md}px`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}));

export default function Footer() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Center>
          <Text
            sx={(theme) => ({
              fontSize: theme.fontSizes.md,
              "@media (max-width: 755px)": {
                fontSize: theme.fontSizes.sm,
              },
            })}
            className="ultra"
          >
            © {new Date().getFullYear()} Design & developed 💚 by Sabelo
            Mkhwanazi
          </Text>
        </Center>
        <Group className={classes.links}>
          <Link style={{ color: "inherit", textDecoration: "inherit" }} to="/">
            <Text className="ultra" transform="none">
              Home
            </Text>
          </Link>

          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            exact="true"
            to="/collection/create"
          >
            <Text className="ultra"> Create collection</Text>
          </Link>
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            to="/meetingroom"
          >
            <Text className="ultra"> Meeting Room</Text>
          </Link>
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            to="/Streamroom"
          >
            <Text className="ultra"> Stream Room</Text>
          </Link>
        </Group>

        <Group spacing="xs" position="right" noWrap>
          <ActionIcon
            mx={13}
            color="#8892B0"
            component="a"
            href="https://github.com/SabeloMkhwanzi"
            target="_blank"
            variant="subtle"
          >
            <IconBrandGithub color="#00eb88" size={30} />
          </ActionIcon>
          <ActionIcon
            mx={13}
            component="a"
            href="https://twitter.com/SabeloMkhwanaz"
            target="_blank"
          >
            <IconBrandTwitter color="#00eb88" size={30} />
          </ActionIcon>
          <ActionIcon
            mx={13}
            component="a"
            href="https://www.linkedin.com/in/sabelo-mkhwanazi-54ba431b1/"
            target="_blank"
          >
            <IconBrandLinkedin color="#00eb88" size={30} />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}
