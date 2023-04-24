import React from "react";
import { useDoc } from "./DocumentProvider";

export const ReactView = () => {
  const { pdfString } = useDoc();
  const [scroll, setScroll] = React.useState(0);
  const divRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!divRef.current) return;
    divRef.current.scrollTop = scroll;
  }, [pdfString, scroll]);
  return (
    <div
      onScroll={() => {
        setScroll(divRef.current?.scrollTop || 0);
      }}
      style={{ overflowY: "scroll", height: "100vh" }}
      ref={divRef}
      dangerouslySetInnerHTML={{ __html: pdfString }}
    />
  );
};
