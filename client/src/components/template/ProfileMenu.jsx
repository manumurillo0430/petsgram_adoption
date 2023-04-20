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
  Spinner,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import Logout from './Logout'

export default function ProfileMenu() {
  const { currentUser, isLoading } = useAuthContext()
  const navigate = useNavigate()
  const theme = useColorModeValue('dark', 'light')

  const menuItemSx = (theme) => ({
    fontSize: '1rem',
    _hover: {
      bg: theme === 'light' ? '#303c53' : '#edf2f7',
      color: theme === 'light' ? 'white' : '#313640',
    },
    color: theme === 'light' ? 'white' : 'black',
    backgroundColor: theme === 'light' ? '#011529' : 'white',
  })

  return (
    <Menu autoSelect={false}>
      <MenuButton
        as={Button}
        variant="link"
        colorScheme="white"
        rightIcon={<ChevronDownIcon />}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <Avatar
            name={`${currentUser.firstname} ${currentUser.lastname}`}
            src={currentUser?.picture}
          />
        )}
      </MenuButton>
      <MenuList
        backgroundColor={theme === 'light' ? '#011529' : 'white'}
        zIndex={20}
        fontSize="xl"
      >
        <MenuItem
          sx={menuItemSx(theme)}
          onClick={() => navigate(`/myprofile/${currentUser.user_id}`)}
        >
          My Profile
        </MenuItem>
        <MenuItem
          sx={menuItemSx(theme)}
          onClick={() => navigate('/myprofile/mypets')}
        >
          My Pets
        </MenuItem>
        <MenuItem
          sx={menuItemSx(theme)}
          onClick={() => navigate('/myprofile/settings')}
        >
          Settings
        </MenuItem>
        {currentUser.role === true ? (
          <MenuItem
            sx={menuItemSx(theme)}
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
