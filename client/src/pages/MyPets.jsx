import React, { useState, useEffect } from 'react'
import { Box, Tab, TabList, TabPanel, Tabs, TabPanels } from '@chakra-ui/react'
import GridViewPets from '../components/pet/GridViewPets'
import { useSearchContext } from '../context/SearchContext'
import { Divider } from 'antd'
import '../components/search/search.css'
import { useAuthContext } from '../context/AuthContext'
import { userLocation } from '../utils/globals'
import PetSubmissions from '../components/pet/PetSubmissions'

export default function MyPets() {
  const {
    petsUserAdopted,
    petsUserFostered,
    petsUserLiked,
    petsUserSaved,
    petsRequested,
  } = useAuthContext()

  const [tab, setTab] = useState('fostered')

  const handleTabChange = async (tabSelected) => {
    setTab(tabSelected)
  }

  return (
    <Box width="100%">
      <Tabs isFitted>
        <Divider style={{ border: 'none', margin: '0.3rem' }} />
        <TabList>
          <Tab onClick={() => handleTabChange('saved')} fontWeight="semibold">
            Saved Pets
          </Tab>
          <Tab onClick={() => handleTabChange('liked')} fontWeight="semibold">
            Liked Pets
          </Tab>
          <Tab
            onClick={() => handleTabChange('fostered')}
            fontWeight="semibold"
          >
            My Fostered Pets
          </Tab>
          <Tab onClick={() => handleTabChange('adopted')} fontWeight="semibold">
            My Adopted Pets
          </Tab>

          <Tab onClick={() => handleTabChange('request')} fontWeight="semibold">
            My Uploaded Pets
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <GridViewPets
              cardSize={25}
              petsArray={petsUserSaved}
              tab={tab}
              location={userLocation(window.location.pathname)}
            />
          </TabPanel>
          <TabPanel>
            <GridViewPets
              cardSize={25}
              petsArray={petsUserLiked}
              tab={tab}
              location={userLocation(window.location.pathname)}
            />
          </TabPanel>
          <TabPanel>
            <GridViewPets
              cardSize={25}
              petsArray={petsUserFostered}
              tab={tab}
              location={userLocation(window.location.pathname)}
            />
          </TabPanel>
          <TabPanel>
            <GridViewPets
              cardSize={25}
              petsArray={petsUserAdopted}
              tab={tab}
              location={userLocation(window.location.pathname)}
            />
          </TabPanel>

          <TabPanel textAlign="-webkit-center">
            <PetSubmissions
              location={userLocation(window.location.pathname)}
              tab={tab}
              petsRequested={petsRequested}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
