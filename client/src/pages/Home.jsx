import { Box, useMediaQuery } from '@chakra-ui/react'
import HomeTemplate from '../components/home/HomeTemplate'
import { useAuthContext } from '../context/AuthContext'
import { useColorModeValue } from '@chakra-ui/react'

export default function Home() {
  const [isSmallerThan900] = useMediaQuery('(max-height: 900px)')
  const [isSmallerThan1700] = useMediaQuery('(max-weight: 1700px)')
  const { isActiveSession, user_id } = useAuthContext()
  const theme = useColorModeValue('dark', 'light')
  console.log(isActiveSession, user_id)
  const homeBg = {
    width: '100%',
    backgroundImage:
      theme === 'dark'
        ? `url('https://res.cloudinary.com/dugudxkyu/image/upload/v1679142182/bg-light_suizg2.jpg')`
        : `url('https://res.cloudinary.com/dugudxkyu/image/upload/v1679143179/bg-dark_zeu6bk.png')`,
    backgroundSize: theme === 'dark' ? '20rem' : '18rem',
    backgroundRepeat: 'no-repeat',
    backgroundPosition:
      isSmallerThan900 || isSmallerThan1700
        ? 'bottom 40% right 20%'
        : 'top 60% left 75%',
    display: 'flex',
    justifyContent: 'space-around',
    height: '100vh',
  }
  return (
    <Box
      w="100%"
      p={5}
      justifyContent="space-around"
      style={homeBg}
      overflow="hidden"
    >
      <HomeTemplate />
    </Box>
  )
}
