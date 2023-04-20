import { Box, Center, Image, useColorModeValue } from '@chakra-ui/react'
import HomeTemplate from '../components/home/HomeTemplate'
import { homePictureNight, homePictureDay } from '../utils/globals'

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
      backgroundColor={theme === 'light' ? '#1a1f2bde' : ''}
    >
      <Box w="50%">
        <Center>
          <HomeTemplate />
        </Center>
      </Box>
      <Box w="40%" m={0} p={0}>
        <Center>
          <Image
            w={theme === 'light' ? '50%' : '70%'}
            bottom="4rem"
            src={theme === 'dark' ? homePictureDay : homePictureNight}
          />
        </Center>
      </Box>
    </Box>
  )
}
