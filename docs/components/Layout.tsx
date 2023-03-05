import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Flex } from "@adobe/react-spectrum";
import { Heading, Text } from "./Typography";

interface NavItemProps {
  text: string;
  href: string;
}

const NavItem = (props: NavItemProps) => {
  const { text, href } = props;
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(href);
      }}
      style={{ cursor: "pointer" }}
    >
      <Text>{text.toUpperCase()}</Text>
    </div>
  );
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <Flex direction="column" alignItems="center" marginX="32px">
      <Flex justifyContent="space-between" width="300px" marginTop="16px">
        <NavItem text="Intro" href="/" />
        <NavItem text="Demo" href="/#demo" />
        <NavItem
          text="GitHub"
          href="https://github.com/frictionlessweb/annotjs"
        />
        <NavItem text="API" href="/#api" />
      </Flex>
      <Flex marginTop="16px" direction="column" alignItems="center">
        {children}
      </Flex>
    </Flex>
  );
};

export default Layout;
