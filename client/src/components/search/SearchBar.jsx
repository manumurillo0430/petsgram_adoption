import { useEffect, useState } from 'react'
import { Center, Input, InputGroup, IconButton } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useSearchContext } from '../../context/SearchContext'

export default function SearchBar({ isSearching }) {
  const { getAllPets } = useSearchContext()
  const [isInputVisible, setIsInputVisible] = useState(false)

  useEffect(() => {
    const awaitGetSearchResults = async () => await getAllPets()
    awaitGetSearchResults() // eslint-disable-next-line
  }, [])

  const handleSearch = () => {}

  return (
    <Center>
      <InputGroup>
        <Input
          style={{
            width: isInputVisible ? '200px' : '0px',
            transition: 'all 0.5s ease',
          }}
          type="text"
          placeholder="Search..."
          borderTopRightRadius={0}
          borderBottomRightRadius={0}
          px={6}
          onKeyDown={(e) => (e.key === 'Enter' ? handleSearch() : null)}
        />
        <IconButton
          aria-label="Search"
          icon={<SearchIcon />}
          borderTopLeftRadius={0}
          borderBottomLeftRadius={0}
          colorScheme="teal"
          isLoading={isSearching}
          onClick={handleSearch}
        />
      </InputGroup>
    </Center>
  )
}
