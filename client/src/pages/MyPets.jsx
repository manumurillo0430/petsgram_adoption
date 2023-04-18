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
    user_id,
    getCurrentUser,
    petsUserAdopted,
    petsUserFostered,
    petsUserLiked,
    petsUserSaved,
    petsRequested,
  } = useAuthContext()
  const { getAllPets } = useSearchContext()
  const [petsTabArray, setPetsTabArray] = useState([])
  const [tab, setTab] = useState('fostered')

  const updatePetsTabArray = async (tabSelected) => {
    try {
      const allPets = await getAllPets()

      if (tabSelected === 'liked') {
        setPetsTabArray(
          allPets?.filter((pet) => petsUserLiked.includes(pet.pet_id)),
        )
      } else if (tabSelected === 'saved') {
        setPetsTabArray(
          allPets?.filter((pet) => petsUserSaved.includes(pet.pet_id)),
        )
      } else if (tabSelected === 'fostered') {
        setPetsTabArray(
          allPets?.filter((pet) => petsUserFostered.includes(pet.pet_id)),
        )
      } else if (tabSelected === 'adopted') {
        setPetsTabArray(
          allPets?.filter((pet) => petsUserAdopted.includes(pet.pet_id)),
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    async function fetchPets() {
      try {
        await getCurrentUser(user_id)
        updatePetsTabArray('fostered')
      } catch (error) {
        console.log(error)
      }
    }
    fetchPets()
  }, [])

  const handleTabChange = async (tabSelected) => {
    setTab(tabSelected)
    updatePetsTabArray(tabSelected)
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
              petsArray={petsTabArray}
              tab={tab}
              location={userLocation(window.location.pathname)}
            />
          </TabPanel>
          <TabPanel>
            <GridViewPets
              cardSize={25}
              petsArray={petsTabArray}
              tab={tab}
              location={userLocation(window.location.pathname)}
            />
          </TabPanel>
          <TabPanel>
            <GridViewPets
              cardSize={25}
              petsArray={petsTabArray}
              tab={tab}
              location={userLocation(window.location.pathname)}
            />
          </TabPanel>
          <TabPanel>
            <GridViewPets
              cardSize={25}
              petsArray={petsTabArray}
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
