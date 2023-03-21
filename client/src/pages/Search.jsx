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
} from '@chakra-ui/react'
import { Divider } from 'antd'
import BasicSearchFilterCriteria from '../components/search/BasicSearchFilterCriteria'
import AdvancedSearchFilterCriteria from '../components/search/AdvancedSearchFilterCriteria'
import GridViewPets from '../components/pet/GridViewPets'
import FullViewPets from '../components/pet/FullViewPets'
import SearchToggle from '../components/search/SearchToggle'

export default function Search() {
  const {
    petsArray,
    isLoadingPetList,
    advancedSearch,
    usersLikes,
    toggleAdvancedSearch,
  } = useSearchContext()

  const [viewTab, setViewTab] = useState('grid')

  return (
    <Box w="100%">
      <Divider style={{ border: 'none', margin: '1rem' }} />
      <Divider style={{ border: 'none', margin: '1rem' }} />
      <Flex flexDirection="column">
        <Center flexDirection="column">
          <BasicSearchFilterCriteria
            advancedSearch={advancedSearch}
            searchResults={petsArray}
          />
          {advancedSearch ? (
            <AdvancedSearchFilterCriteria
              advancedSearch={advancedSearch}
              searchResults={petsArray}
            />
          ) : null}
          <SearchToggle
            toggleAdvancedSearch={toggleAdvancedSearch}
            advancedSearch={advancedSearch}
          />
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
                <TabPanel>
                  <GridViewPets
                    cardSize={25}
                    usersLikes={usersLikes}
                    petsArray={petsArray}
                    viewTab={viewTab}
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
