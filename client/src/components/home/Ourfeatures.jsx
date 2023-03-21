import React from 'react'
import { Text, Flex } from '@chakra-ui/react'
import { Divider } from 'antd'

export default function Ourfeatures({ mainText, textA, textB }) {
  return (
    <>
      <Flex w="100%">
        <Text w="50%" fontWeight="semibold" fontSize="lg">
          {textA}
          <br />
          {textB}
        </Text>
        <Text w="50%">{mainText}</Text>
      </Flex>
      <Divider style={{ border: 'none', margin: '0.5rem' }} />
    </>
  )
}
