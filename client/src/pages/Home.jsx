import { Box, Image, useColorModeValue } from '@chakra-ui/react'
import HomeTemplate from '../components/home/HomeTemplate'
import { instructionsDay, instructionsNight } from '../utils/globals'

export default function Home() {
  const theme = useColorModeValue('dark', 'light')

  return (
    <Box
      w="100%"
      display="flex"
      p={5}
      justifyContent="center"
      overflow="hidden"
      h="100vh"
    >
      <Box w="50%">
        <HomeTemplate />
      </Box>
      <Box w="40%" m={0} p={0}>
        <Image
          position="relative"
          bottom="4rem"
          src={theme === 'dark' ? instructionsDay : instructionsNight}
        />
      </Box>
    </Box>
  )
}
