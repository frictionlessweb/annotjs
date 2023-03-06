import { Flex } from "@adobe/react-spectrum";
import { Heading, Text } from "@/components/Typography";
import Link from "next/link";

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
      <Flex direction="column" UNSAFE_style={{ maxWidth: "600px" }}>
        <Heading id="demo" level={2}>
          Demo
        </Heading>
        <Text marginBottom="16px">
          Try exploring the window below. If you would like to view the demo in
          a separate tab, try visiting{" "}
          <Link href="https://flexlabel.org">flexlabel.org</Link> and click
          around there.
        </Text>
      </Flex>
      <iframe
        id="demo-iframe"
        style={{
          border: "2px solid grey",
          height: "400px",
        }}
        src="https://flexlabel.org"
      ></iframe>
      <Flex UNSAFE_style={{ maxWidth: "600px" }} direction="column">
        <Heading id="api" level={2} marginTop="16px">
          API
        </Heading>
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
