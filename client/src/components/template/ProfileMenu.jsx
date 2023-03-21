import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import Logout from './Logout'

export default function ProfileMenu() {
  const { currentUser } = useAuthContext()
  const navigate = useNavigate()
  const theme = useColorModeValue('dark', 'light')
  console.log(currentUser.picture)

  return (
    <Menu
      backgroundColor={theme === 'light' ? '#011529' : 'white'}
      autoSelect={false}
    >
      <MenuButton
        as={Button}
        variant="link"
        colorScheme="fasd"
        rightIcon={<ChevronDownIcon />}
      >
        <Avatar
          name={`${currentUser.firstname} ${currentUser.lastname}`}
          src={currentUser?.picture}
        />
      </MenuButton>
      <MenuList fontSize="xl">
        {currentUser.role === true ? (
          <MenuItem onClick={() => navigate('/dashboard')}>Dashboard</MenuItem>
        ) : null}
        <MenuItem
          fontSize="md"
          _hover={{
            backgroundColor: !theme === 'light' ? '#efeef0' : '#303c53',
            color: !theme === 'light' ? '#232d40' : 'white',
          }}
          color={theme === 'light' ? 'white' : 'black'}
          backgroundColor={theme === 'light' ? '#011529' : 'white'}
          onClick={() => navigate('/profile')}
        >
          Settings
        </MenuItem>
        <MenuItem
          fontSize="md"
          _hover={{
            backgroundColor: !theme === 'light' ? 'white' : '#303c53',
            color: !theme === 'light' ? '#232d40' : 'white',
          }}
          color={theme === 'light' ? 'white' : 'black'}
          backgroundColor={theme === 'light' ? '#011529' : 'white'}
          onClick={() => navigate('/mypets')}
        >
          My Pets
        </MenuItem>
        <Logout />
      </MenuList>
    </Menu>
  )
}
