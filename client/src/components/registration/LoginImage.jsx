import React from 'react'
import { logInPictureDark } from '../../utils/globals'
import { logInPictureLight } from '../../utils/globals'
import { Image, Box, useColorModeValue } from '@chakra-ui/react'

export default function LoginImage() {
    const theme = useColorModeValue('dark', 'light')
    return (
        <Box p={0} m={0} w="80%">
            <Image
                borderRadius="4px"
                borderBottomRightRadius="40%"
                src={theme === 'dark' ? logInPictureLight : logInPictureDark}
                objectFit="cover"
                w="100%"
                h="100%"
            />
        </Box>
    )
}
