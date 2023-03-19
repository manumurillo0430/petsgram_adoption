import React from 'react'
import { useEffect } from 'react'
import { Text, Container, Flex, Image, Heading, Button } from '@chakra-ui/react'
import { Divider } from 'antd'

export default function Ourfeatures({ feature, text, feature2 }) {
  return (
    <>
      <Flex w="100%">
        <Text w="50%" fontWeight="semibold" fontSize="lg">
          {feature}
          <br />
          {feature2}
        </Text>
        <Text w="50%">{text}</Text>
      </Flex>
      <Divider style={{ border: 'none', margin: '0.5rem' }} />
    </>
  )
}
