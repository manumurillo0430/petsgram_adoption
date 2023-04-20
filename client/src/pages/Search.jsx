import React, { useState } from 'react'
import { useSearchContext } from '../context/SearchContext'
import {
  Box,
  Flex,
  Center,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TabPanels,
  useColorModeValue,
} from '@chakra-ui/react'
import { Divider } from 'antd'
import AdvancedSearchFilterCriteria from '../components/search/AdvancedSearchFilterCriteria'
import GridViewPets from '../components/pet/GridViewPets'
import FullViewPets from '../components/pet/FullViewPets'
import SearchToggle from '../components/search/SearchToggle'
import { userLocation } from '../utils/globals'

export default function Search() {
  const {
    petsArray,
    isLoadingPetList,
    advancedSearch,
    usersLikes,
    toggleAdvancedSearch,
  } = useSearchContext()
  const theme = useColorModeValue('dark', 'light')

  const [viewTab, setViewTab] = useState('grid')
  return (
    <Box w="100%" p={0} m={0}>
      <Flex flexDirection="column">
        <Center
          flexDirection="column"
          backgroundColor={theme === 'light' ? '#1c1f2bc7' : '#ffffff96'}
        >
          <Divider style={{ border: 'none', margin: '0.4rem' }} />
          <AdvancedSearchFilterCriteria
            advancedSearch={advancedSearch}
            searchResults={petsArray}
          />

          {petsArray.length === 0 ? null : (
            <SearchToggle
              toggleAdvancedSearch={toggleAdvancedSearch}
              advancedSearch={advancedSearch}
            />
          )}

          <Divider style={{ border: 'none', margin: '0.5rem' }} />
        </Center>

        {!isLoadingPetList && (
          <Box>
            <Tabs isFitted>
              <Divider style={{ border: 'none', margin: '0.3rem' }} />
              <TabList>
                <Tab fontWeight="semibold" onClick={() => setViewTab('grid')}>
                  GRID VIEW
                </Tab>
                <Tab fontWeight="semibold" onClick={() => setViewTab('full')}>
                  FULL VIEW
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel mb={6}>
                  <GridViewPets
                    cardSize={25}
                    usersLikes={usersLikes}
                    petsArray={petsArray}
                    viewTab={viewTab}
                    location={userLocation(window.location.pathname)}
                  />
                </TabPanel>
                <TabPanel justifyContent="center">
                  <Center flexDirection="column" w="90%">
                    <Divider style={{ border: 'none', margin: '0.3rem' }} />
                    <FullViewPets
                      petsArray={petsArray}
                      usersLikes={usersLikes}
                      viewTab={viewTab}
                    />
                  </Center>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        )}
      </Flex>
    </Box>
  )
}
