import { useEffect, useState } from 'react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { petTypes, petStatus } from '../../utils/globals'
import { useSearchContext } from '../../context/SearchContext'
import { Divider } from 'antd'
import {
  Flex,
  Input,
  Center,
  InputGroup,
  Button,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Spinner,
  Box,
} from '@chakra-ui/react'

import * as yup from 'yup'
import { Formik } from 'formik'
import FilterSlider from './FilterSlider'

export default function AdvancedSearchFilterCriteria({
  searchResults,
  advancedSearch,
}) {
  const {
    getFilteredPetsByCriteria,
    setFilterSelection,
    filterSelection,
    typeFilter,
    setTypeFilter,
    adpotionStatusFilter,
    setAdpotionStatusFilter,
  } = useSearchContext()

  const [minHeight, setMinHeight] = useState(0)
  const [maxHeight, setMaxHeight] = useState(100)

  const [minWeight, setMinWeight] = useState(0)
  const [maxWeight, setMaxWeight] = useState(100)

  const [petName, setPetName] = useState()
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

  const handleSliderChangeHeight = (values) => {
    setMinHeight(values[0])
    setMaxHeight(values[1])
  }

  const handleSliderChangeWeight = (values) => {
    setMinWeight(values[0])
    setMaxWeight(values[1])
  }

  useEffect(() => {
    setFilterSelection({
      ...filterSelection,
      minHeight: minHeight,
      maxHeight: maxHeight,
      minWeight: minWeight,
      maxWeight: maxWeight,
      name: petName,
    })
  }, [petName, minHeight, minWeight, maxHeight, maxWeight])

  const weightHeightShema = yup.object().shape({
    type: yup.string(),
    name: yup.string(),
    adoptionStatus: yup.string(),
    minHeight: yup.number(),
    maxHeight: yup.number(),
    minWeight: yup.number(),
    maxWeight: yup.number(),
  })

  return (
    <Formik
      initialValues={{
        name: '',
        adoptionStatus: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
      }}
      validationSchema={weightHeightShema}
      onSubmit={async (values, { resetForm }) => {
        try {
          if (
            filterSelection.adoptionStatus === 'Adoption Status' ||
            filterSelection.adoptionStatus === 'Any'
          ) {
            filterSelection.adoptionStatus = ''
          }
          if (
            filterSelection.type === 'Type' ||
            filterSelection.type === 'Any'
          ) {
            filterSelection.type = ''
          }

          setFilterSelection({
            type: filterSelection.type,
            name: petName,
            adoptionStatus: filterSelection.adoptionStatus,
            minHeight: minHeight,
            maxHeight: maxHeight,
            minWeight: minWeight,
            maxWeight: maxWeight,
          })
          await getFilteredPetsByCriteria(filterSelection)
        } catch (error) {}
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Center>
            <Flex
              mt={2}
              w="100%"
              alignContent="center"
              placeItems="center"
              flexDirection="column"
            >
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
                        {adpotionStatusFilter === ''
                          ? 'Any'
                          : adpotionStatusFilter}
                      </MenuButton>
                      <MenuList>
                        <MenuItem onClick={() => handleStatus('Any')}>
                          Any
                        </MenuItem>
                        {petStatus.map((status) => (
                          <MenuItem
                            key={status}
                            onClick={() => handleStatus(status)}
                          >
                            {status}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  </Flex>
                  <Divider style={{ border: 'none', margin: '0.4rem' }} />
                </Box>
              </InputGroup>
              {advancedSearch ? (
                <>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Search for a pet by name..."
                    px={6}
                    onChange={(e) => setPetName(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === 'Enter' ? handleSubmit() : null
                    }
                  />
                  <Flex my={4} alignContent="center" flexDirection="row">
                    <FilterSlider
                      min={minHeight}
                      max={maxHeight}
                      onSliderChange={handleSliderChangeHeight}
                      filter="height"
                    />
                    <FilterSlider
                      min={minWeight}
                      max={maxWeight}
                      onSliderChange={handleSliderChangeWeight}
                      filter="weight"
                    />
                  </Flex>
                </>
              ) : (
                ''
              )}

              <Button
                w="50%"
                aria-label="Search"
                colorScheme="blue"
                onClick={handleSubmit}
              >
                {searchResults.length == 0 ? <Spinner /> : 'Search'}
              </Button>
            </Flex>
          </Center>
        </form>
      )}
    </Formik>
  )
}
