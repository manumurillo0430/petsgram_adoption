import { Box, Flex, Link, useDisclosure, Button } from '@chakra-ui/react'
import ModeSwitcher from '../../ModeSwitcher'
import ResgistrationModal from '../registration/RegistrationModal'
import { useAuthContext } from '../../context/AuthContext'
import { useColorModeValue } from '@chakra-ui/react'
import MenuIcon from '@mui/icons-material/Menu'
import ProfileMenu from './ProfileMenu'
import Logo from './Logo'
import SearchBar from '../search/SearchBar'
import LightModeIcon from '@mui/icons-material/LightMode'
import { brandLight, brandDark } from '../../utils/globals'

export default function Header({ toggleCollapsed }) {
    const { isActiveSession, currentUser } = useAuthContext()
    console.log(isActiveSession, currentUser)

    const { isOpen, onToggle } = useDisclosure()
    const toggleModal = () => onToggle()
    const theme = useColorModeValue('dark', 'light')

    return (
        <>
            <Box
                h="20hv"
                p={3}
                boxShadow="0 1px 2px 0 rgba(0, 0, 0, 0.05);"
                bgColor={theme === 'dark' ? 'white' : '#011529'}
            >
                <Flex justifyContent="space-between">
                    <Flex ml={!isActiveSession && 4} alignItems="center">
                        {isActiveSession && (
                            <>
                                <Button mr={3} type="primary" onClick={toggleCollapsed} backgroundColor="transparent">
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
                            <Link color={theme === 'dark' ? 'black' : 'white'} onClick={toggleModal} fontWeight="500">
                                Log&nbsp;In&nbsp;/&nbsp;Sing&nbsp;Up
                            </Link>
                        )}

                        <ModeSwitcher />
                    </Flex>
                </Flex>
            </Box>
            <ResgistrationModal isOpen={isOpen} toggleModal={toggleModal} />
        </>
    )
}
