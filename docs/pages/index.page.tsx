import { Flex } from "@adobe/react-spectrum";
import { Heading, Text } from "@/components/Typography";
import Highlight from "react-highlight";
import "highlight.js/styles/dracula.css";
import { ExtractDocumentProvider, RenderPDFDocumentLayer } from "annotjs";
import dynamic from "next/dynamic";
import api from "./api.json";
const RelativePDFContainer = dynamic(() => import("./RelativePDFContainer"), {
  ssr: false,
  loading: () => <Text>Loading PDF...</Text>,
});

const CLIENT_ID: string = process.env.NEXT_PUBLIC_ADOBE_EMBED_API_KEY as string;

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

const EXTRACT_DOCUMENT_VALUE = {
  clientId: CLIENT_ID,
  fileName: "AudioDemo.pdf",
  url: "/AudioDemo.pdf",
  currentPage: 1,
  extract: api,
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
        <Text marginBottom="8px">
          Below is a small application built with Annotjs that allows users to
          select text in a PDF document and hear it read out loud back to them.
          This library provides the functionality to make writing such code easy
          with just a little bit of React! Feel free to play around with it.
        </Text>
        <Text marginBottom="16px">
          When you are ready to learn more and start playing around with the
          library yourself, see the API section for documentation about how
          precisely to go about doing so.
        </Text>
        {/* @ts-expect-error - The API is ok. */}
        <ExtractDocumentProvider value={EXTRACT_DOCUMENT_VALUE}>
          <RelativePDFContainer style={{ border: "2px solid grey" }}>
            <RenderPDFDocumentLayer />
          </RelativePDFContainer>
        </ExtractDocumentProvider>
      </Flex>
      <Flex
        UNSAFE_style={{ maxWidth: "600px", scrollMarginTop: "50px" }}
        direction="column"
        id="api"
      >
        <Heading level={2} marginTop="16px">
          API
        </Heading>
        <Text>
          Annotjs uses a composable architecture based around putting DOM
          elements on top of a PDF document. This architecture enables any
          developer familiar with React to create rich applications out of the
          box with relatively little difficulty. For example, to highlight
          specific pieces of text on top of a PDF, all you have to do is write:
        </Text>
        <Highlight className="jsx">{HIGHLIGHTING_TEXT}</Highlight>
        <Text>
          And the text will be highlighted for you. You can probably guess how
          the above code works if you have worked with React before. It contains
          the two main kinds of components Annotjs provides:
        </Text>
        <ul>
          <li>
            <Text>
              <b>Provider components</b> (like <code>PDFProvider</code> in the
              example above) render elements into the document and allow your
              code to access various React hooks that involve the content of the
              document. Noteable providers include the <code>PDFProvider</code>{" "}
              and the <code>AnnotationProvider</code> components.
            </Text>
          </li>
          <li>
            <Text>
              <b>Layer components</b> (like <code>HighlightLayer</code> in the
              example above) add rich pieces of functionality onto the PDF
              above. Notable layers include the <code>TextHighlightLayer</code>{" "}
              and the <code>CreateAnnotationLayer</code>.
            </Text>
          </li>
        </ul>
        <Heading level={3}>Getting Started</Heading>
        <Text>
          To start using Annotjs, you will first need to install the Adobe Embed
          API onto your webpage.
        </Text>
        <Text marginTop="8px" marginBottom="4px">
          <span style={{ fontWeight: "bold" }}>WARNING: </span>This library is
          currently a work in progress. We have used this technology in several
          research applications and learned what sorts of API designs work well
          and which ones do not; we are in the process of writing a package will
          be suitable for general production use.
        </Text>
        <Text marginTop="8px" marginBottom="16px">
          If you have feedback about the ideas outlined on this web page, please
          let us know! Feedback about these designs is very, very welcome.
        </Text>
      </Flex>
    </Flex>
  );
};

export default Home;
