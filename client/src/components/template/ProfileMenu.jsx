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
  const menuItemStyle = {
    fontSize: '1rem',
    _hover: {
      backgroundColor: !theme === 'light' ? 'white' : '#303c53',
      color: !theme === 'light' ? '#232d40' : 'white',
    },
    color: theme === 'light' ? 'white' : 'black',
    backgroundColor: theme === 'light' ? '#011529' : 'white',
  }
  return (
    <Menu autoSelect={false}>
      <MenuButton
        as={Button}
        variant="link"
        colorScheme="white"
        rightIcon={<ChevronDownIcon />}
      >
        <Avatar
          name={`${currentUser.firstname} ${currentUser.lastname}`}
          src={currentUser?.picture}
        />
      </MenuButton>
      <MenuList
        backgroundColor={theme === 'light' ? '#011529' : 'white'}
        zIndex={20}
        fontSize="xl"
      >
        <MenuItem
          style={menuItemStyle}
          onClick={() => navigate(`/profile/${currentUser.user_id}`)}
        >
          My Profile
        </MenuItem>
        <MenuItem
          style={menuItemStyle}
          onClick={() => navigate('/profile/mypets')}
        >
          My Pets
        </MenuItem>
        <MenuItem
          style={menuItemStyle}
          onClick={() => navigate('/profile/settings')}
        >
          Settings
        </MenuItem>
        {currentUser.role === true ? (
          <MenuItem
            style={menuItemStyle}
            backgroundColor={theme === 'light' ? '#011529' : 'white'}
            onClick={() => navigate('/admin/dashboard')}
          >
            Dashboard
          </MenuItem>
        ) : null}

        <Logout />
      </MenuList>
    </Menu>
  )
}
