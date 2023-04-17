import React from 'react';
import { Flex, Text } from '@adobe/react-spectrum';

interface LearnMoreProps {
  topic: string;
}

export const LearnMore = (props: LearnMoreProps) => {
  const { topic } = props;
  return (
    <Flex direction='column'>
      <Text UNSAFE_style={{ fontStyle: 'italic' }}>Would you like to learn more about {topic}?</Text>
    </Flex>
  );
}
