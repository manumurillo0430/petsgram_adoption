import { Flex, Text, useColorModeValue, Card, Box, Tag, TagLabel } from '@chakra-ui/react'

import './Graphs.css'

export default function Statistics({ data, colorScale, labels }) {
    const theme = useColorModeValue('dark', 'light')
    return (
        <>
            <Box
                w="100%"
                mr={2}
                border={theme === 'light' ? 'solid 1px #474a54' : 'solid 1px #e2e8f0'}
                borderRadius="6px"
            >
                <Flex></Flex>
            </Box>
        </>
    )
}
