import React from "react";
import { Flex } from "@adobe/react-spectrum";
import { Heading, Text } from "@/components/Typography";
import Highlight from "react-highlight";
import "highlight.js/styles/dracula.css";
import dynamic from "next/dynamic";
import Link from "next/link";

const Demo = dynamic(() => import("./Demo"), {
  ssr: false,
  loading: () => <Text>Loading Demo...</Text>,
});

const HIGHLIGHTING_TEXT = `const HighlightText = ({ extractValues }) => {
  return (
    <ExtractDocumentProvider value={extractValues}>
      <RelativePDFContainer style={{ border: '2px solid grey' }}>
        <RenderPDFDocumentLayer />
        <HighlightTextLayer strings={["highlight", "these", "words", "please"]} />
      </RelativePDFContainer>
    </ExtractDocumentProvider>
  )
}`.trim();

const Documentation = () => {
  return (
    <Flex
      UNSAFE_style={{ maxWidth: "600px", scrollMarginTop: "50px" }}
      direction="column"
      id="api"
    >
      <Heading level={2} marginTop="16px">
        API
      </Heading>
      <Text>
        Annotjs uses a composable architecture based around putting DOM elements
        on top of a PDF document. This architecture enables any developer
        familiar with React to create rich applications out of the box with
        relatively little difficulty. For example, to highlight specific pieces
        of text on top of a PDF, all you have to do is write:
      </Text>
      <Highlight className="jsx">{HIGHLIGHTING_TEXT}</Highlight>
      <Text>
        And the text will be highlighted for you. You can probably guess how the
        above code works if you have worked with React before. It contains the
        two main kinds of components Annotjs provides:
      </Text>
      <ul>
        <li>
          <Text>
            <b>Provider components</b> (like <code>PDFProvider</code> in the
            example above) render elements into the document and allow your code
            to access various React hooks that involve the content of the
            document.
          </Text>
        </li>
        <li>
          <Text>
            <b>Layer components</b> (like <code>HighlightTextLayer</code> in the
            example above) add rich pieces of functionality onto the PDF.
          </Text>
        </li>
      </ul>
      <Text marginBottom="8px">
        In the code above, the <code>extractValues</code> prop is a JSON that
        comes directly from the Adobe Extract API. In order to use this library,
        you will need to feed your document to that API beforehand; our code
        uses the metadata it returns in order to facilitate the rich
        interactions demoed above.
      </Text>
      <Flex direction="column" marginBottom="32px">
        <Heading level={3}>Getting Started</Heading>
        <Text marginBottom="8px">
          To start using Annotjs, you will first need to install the Adobe Embed
          API onto your webpage. To do that,{" "}
          <Link href="https://developer.adobe.com/document-services/docs/overview/pdf-embed-api/">
            visit this webpage and follow the instructions.
          </Link>
        </Text>
        <Text>
          After that, you will need to install <code>annotjs</code> as a
          library. For the moment, contact the person who linked you this
          webpage for guidance about the best way to do so.
        </Text>
      </Flex>
    </Flex>
  );
};

const Home = () => {
  return (
    <Flex direction="column">
      <Heading id="intro" level={1}>
        Annotjs
      </Heading>
      <Flex direction="column" UNSAFE_style={{ maxWidth: "600px" }}>
        <Text marginBottom="16px">
          A library for rapidly building sophisticated applications on top of
          PDF documents.
        </Text>
      </Flex>
      <Flex
        direction="column"
        UNSAFE_style={{ maxWidth: "600px", scrollMarginTop: "50px" }}
        id="demo"
      >
        <Heading level={2}>Demo</Heading>
        <Demo />
      </Flex>
      <Documentation />
    </Flex>
  );
};

export default Home;
