import React from "react";

const ChatRefContext =
  // @ts-expect-error - We have to initialize with null.
  React.createContext<React.MutableRefObject<HTMLDivElement | null>>(null);

interface ChatRefProviderProps {
  children: React.ReactNode;
}

export const useChatDivRef = () => {
  const ctx = React.useContext(ChatRefContext);
  if (ctx === null) {
    throw new Error('Please use useChatDivRef inside its provider.');
  }
  return ctx;
}

export const ChatRefProvider = (props: ChatRefProviderProps) => {
  const { children } = props;
  const divRef = React.useRef<HTMLDivElement | null>(null);
  return (
    <ChatRefContext.Provider value={divRef}>{children}</ChatRefContext.Provider>
  );
};
