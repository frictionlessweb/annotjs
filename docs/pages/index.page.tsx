import { Flex } from "@adobe/react-spectrum";
import { Heading, Text } from "@/components/Typography";
import Link from "next/link";

const Home = () => {
  return (
    <Flex direction="column">
      <Heading id="intro" level={1}>
        Annotjs
      </Heading>
      <Text marginBottom="16px">
        A library for rapidly building sophisticated applications on top of PDF
        documents.
      </Text>
      <iframe
        id="demo"
        style={{
          border: "2px solid grey",
          height: "400px",
        }}
        src="https://flexlabel.org"
      ></iframe>
      <Flex UNSAFE_style={{ maxWidth: "600px" }} direction="column">
        <Text marginTop="8px" marginBottom="4px">
          <span style={{ fontWeight: "bold" }}>WARNING: </span>This library is
          currently a work in progress. We have used this technology in several
          applications and learned what sorts of API designs work well and which
          ones do not; we are in the process of implementing the designs
          described here, which should be suitable for production applications.
        </Text>
        <Text marginTop="8px">
          If you have feedback about the ideas outlined on this web page, please
          let us know! Feedback about these designs is very, very welcome.
        </Text>
      </Flex>
    </Flex>
  );
};

export default Home;
