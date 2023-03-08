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
  const [textDecoration, setTextDecoration] = React.useState("inherit");
  return (
    <div
      onClick={() => {
        router.push(href);
      }}
      onMouseEnter={() => setTextDecoration("underline")}
      onMouseLeave={() => setTextDecoration("inherit")}
      style={{ cursor: "pointer" }}
    >
      <Text UNSAFE_style={{ textDecoration }}>{text.toUpperCase()}</Text>
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
      <Flex
        justifyContent="center"
        position="fixed"
        UNSAFE_style={{
          width: "100%",
          height: "32px",
          paddingTop: "8px",
          backgroundColor: "#dcdcdc",
          zIndex: 5,
        }}
      >
        <Flex width="300px" justifyContent="space-between">
          <NavItem text="Intro" href="/" />
          <NavItem text="Demo" href="/#demo" />
          <NavItem
            text="GitHub"
            href="https://github.com/frictionlessweb/annotjs"
          />
        </Flex>
      </Flex>
      <Flex marginTop="48px" direction="column" alignItems="center">
        {children}
      </Flex>
    </Flex>
  );
};

export default Layout;
