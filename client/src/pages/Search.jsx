import React, { useState, useEffect } from 'react'
import {
  Box,
  Flex,
  Center,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TabPanels,
  Text,
} from '@chakra-ui/react'
import BasicSearchFilterCriteria from '../components/search/BasicSearchFilterCriteria'
import AdvancedSearchFilterCriteria from '../components/search/AdvancedSearchFilterCriteria'
import GridViewPets from '../components/pet/GridViewPets'
import SocialMediaViewPets from '../components/pet/SocialMediaViewPets'
import { useSearchContext } from '../context/SearchContext'
import { Divider } from 'antd'
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
                    <SocialMediaViewPets
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
