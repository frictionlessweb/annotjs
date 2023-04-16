import React from "react";
import { Flex, Text } from "@adobe/react-spectrum";

interface ChromeProviderProps {
  children: React.ReactNode;
}

export const ChromeProvider = (props: ChromeProviderProps) => {
  const { children } = props;
  if (!("chrome" in window)) {
    return (
      <Flex width="100%" marginY="16px" justifyContent="center">
        <Text>Please use Google Chrome to use this demo.</Text>
      </Flex>
    );
  }
  return <>{children}</>;
};
