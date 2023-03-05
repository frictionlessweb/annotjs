import { Flex } from "@adobe/react-spectrum";
import { Heading, Text } from "@/components/Typography";
import Link from "next/link";

const Home = () => {
  return (
    <Flex direction="column">
      <Heading level={1}>Annotjs</Heading>
      <Text marginBottom="16px">
        A library for rapidly building sophisticated applications on top of PDF
        documents.
      </Text>
      <iframe
        style={{ border: "2px solid grey" }}
        src="https://flexlabel.org"
      ></iframe>
      <Flex UNSAFE_style={{ maxWidth: "500px" }} direction="column">
        <Text marginTop="8px" marginBottom="4px">
          <span style={{ fontWeight: "bold" }}>WARNING: </span>This library is
          currently a work in progress. After having used it in several research
          applications, we are currently in the process of making the technology
          production ready
        </Text>
      </Flex>
    </Flex>
  );
};

export default Home;
