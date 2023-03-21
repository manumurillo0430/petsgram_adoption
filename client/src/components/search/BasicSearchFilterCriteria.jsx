import { useEffect } from 'react'
import {
  Center,
  InputGroup,
  Button,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  FormLabel,
  Flex,
  useMediaQuery,
  Box,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { petTypes, petStatus } from '../../utils/globals'
import { useSearchContext } from '../../context/SearchContext'
import { Divider } from 'antd'

export default function BasicSearchFilterCriteria({ advancedSearch }) {
  const {
    getFilteredPetsByCriteria,
    setFilterSelection,
    filterSelection,
    typeFilter,
    setTypeFilter,
    adpotionStatusFilter,
    setAdpotionStatusFilter,
  } = useSearchContext()

  useEffect(() => {
    setFilterSelection({
      type: typeFilter,
      adoptionStatus: adpotionStatusFilter,
    })
  }, [typeFilter, adpotionStatusFilter])

  const handleType = (type) => {
    if (type === 'Any' || type === 'Type') {
      setTypeFilter('Any')
      filterSelection.type = ''
      if (type === 'Type') filterSelection.type = ''
    } else setTypeFilter(type)
  }

  const handleStatus = (status) => {
    if (status === 'Any' || status === 'Adoption Status') {
      setAdpotionStatusFilter('Any')
      filterSelection.adoptionStatus = ''
    } else setAdpotionStatusFilter(status)
  }

  const handleSearch = () => {
    if (
      filterSelection.adoptionStatus === 'Adoption Status' ||
      filterSelection.adoptionStatus === 'Any'
    ) {
      filterSelection.adoptionStatus = ''
      setAdpotionStatusFilter('Any')
    }
    if (filterSelection.type === 'Type' || filterSelection.type === 'Any') {
      filterSelection.type = ''
      setFilterSelection('Any')
    }
    getFilteredPetsByCriteria(filterSelection)
  }

  return (
    <>
      <Center w="100%">
        <InputGroup zIndex={4} justifyContent="center" w={'100%'}>
          <Box flexDirection="column">
            <Flex>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  w="11.5rem"
                >
                  {typeFilter}
                </MenuButton>
                <MenuList>
                  {petTypes.map((type) => (
                    <MenuItem key={type} onClick={() => handleType(type)}>
                      {type}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  w="11.5rem"
                  ml={6}
                >
                  {adpotionStatusFilter === '' ? 'Any' : adpotionStatusFilter}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => handleStatus('Any')}>Any</MenuItem>
                  {petStatus.map((status) => (
                    <MenuItem key={status} onClick={() => handleStatus(status)}>
                      {status}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Flex>
            <Divider style={{ border: 'none', margin: '0.4rem' }} />
            <Flex flexDirection="column" alignItems="center">
              {!advancedSearch ? (
                <Button
                  w="80%"
                  ml={2}
                  px={3}
                  py={3}
                  aria-label="Search"
                  colorScheme="blue"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              ) : null}
            </Flex>
          </Box>
        </InputGroup>
      </Center>
    </>
  )
}
