import {
  Box,
  Flex,
  Link,
  useDisclosure,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { brandLight, brandDark } from '../../utils/globals'
import { useAuthContext } from '../../context/AuthContext'
import ModeSwitcher from '../../ModeSwitcher'
import ResgistrationModal from '../registration/RegistrationModal'
import MenuIcon from '@mui/icons-material/Menu'
import ProfileMenu from './ProfileMenu'
import Logo from './Logo'

export default function Header({ toggleCollapsed }) {
  const { isActiveSession, currentUser } = useAuthContext()
  console.log(isActiveSession, currentUser)
  let navigate = useNavigate()
  const { isOpen, onToggle } = useDisclosure()
  const toggleModal = () => onToggle()
  const theme = useColorModeValue('dark', 'light')

  return (
    <>
      <Box
        h="5rem"
        p={3}
        boxShadow="0 1px 2px 0 rgba(0, 0, 0, 0.05);"
        bgColor={theme === 'dark' ? 'white' : '#011529'}
      >
        <Flex justifyContent="space-between">
          <Flex ml={!isActiveSession && 4} alignItems="center">
            {isActiveSession && (
              <>
                <Button
                  mr={3}
                  type="primary"
                  onClick={toggleCollapsed}
                  backgroundColor="transparent"
                >
                  <MenuIcon />
                </Button>
              </>
            )}
            <Logo src={theme === 'light' ? brandLight : brandDark} />
          </Flex>
          <Flex alignItems="center">
            <>
              {/* <SearchBar /> */}
              {isActiveSession && <ProfileMenu currentUser={currentUser} />}
            </>
            {!isActiveSession && (
              <>
                <Link
                  mr={6}
                  color={theme === 'dark' ? 'black' : 'white'}
                  onClick={() => navigate('/')}
                  fontWeight="500"
                >
                  Home
                </Link>
                <Link
                  mr={6}
                  color={theme === 'dark' ? 'black' : 'white'}
                  onClick={toggleModal}
                  fontWeight="500"
                >
                  Log&nbsp;In&nbsp;/&nbsp;Sing&nbsp;Up
                </Link>
                <Link
                  mr={6}
                  color={theme === 'dark' ? 'black' : 'white'}
                  onClick={() => navigate('/search')}
                  fontWeight="500"
                >
                  Search
                </Link>
              </>
            )}
            <ModeSwitcher />
          </Flex>
        </Flex>
      </Box>
      <ResgistrationModal isOpen={isOpen} toggleModal={toggleModal} />
    </>
  )
}
