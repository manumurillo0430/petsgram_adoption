import React from 'react'
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react'
import { FaMoon } from 'react-icons/fa'
import LightModeIcon from '@mui/icons-material/LightMode'

const ModeSwitcher = (props) => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(FaMoon, LightModeIcon)

  return (
    <IconButton
      mx={3}
      size="sd"
      fontSize="lg"
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon color={text === 'dark' ? 'dark' : 'white'} />}
      aria-label={`Switch to ${text} mode`}
      _hover={{ backgroundColor: 'transparent' }}
      {...props}
    />
  )
}

export default ModeSwitcher
