import { Flex, Text, Heading } from "@adobe/react-spectrum";

const Home = () => {
  return (
    <Flex direction="column">
      <Heading>AnnotJS</Heading>
      <Flex UNSAFE_style={{ maxWidth: "500px" }} direction="column">
        <Text marginTop="8px" marginBottom="4px">
          <span style={{ fontWeight: "bold" }}>WARNING: </span>This library is
          currently a work in progress.
        </Text>
        <Text marginY="8px">
          Our approach to working with PDF documents comes from our experience
          working with <a href="https://github.com/allenai/pawls">Pawls</a> and
          developing the <a href="https://forma11y.org">Forma11y</a> project.
        </Text>
        <Text>
          We have used the technology developed here in multiple research
          applications with multiple developers and have established which parts
          of the API work well and which ones do not.
        </Text>
      </Flex>
    </Flex>
  );
};

export default Home;
