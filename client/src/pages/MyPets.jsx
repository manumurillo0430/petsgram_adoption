import React, { useState, useEffect } from 'react'
import { Box, Tab, TabList, TabPanel, Tabs, TabPanels } from '@chakra-ui/react'
import GridViewPets from '../components/pet/GridViewPets'
import { useSearchContext } from '../context/SearchContext'
import { Divider } from 'antd'
import '../components/search/search.css'
import { useAuthContext } from '../context/AuthContext'

export default function MyPets() {
  const {
    user_id,
    getCurrentUser,
    petsUserAdopted,
    petsUserFostered,
    petsUserLiked,
    petsUserSaved,
  } = useAuthContext()
  const { getAllPets } = useSearchContext()
  const [petsTabArray, setPetsTabArray] = useState([])
  const [tab, setTab] = useState('fostered')

  useEffect(() => {
    async function fetchPets() {
      try {
        const allPets = await getAllPets()
        await getCurrentUser(user_id)
        if (allPets && petsUserFostered) {
          const filteredPets = allPets.filter((pet) =>
            petsUserFostered.includes(pet.pet_id),
          )
          setPetsTabArray(filteredPets)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchPets()
  }, [])

  const handleTabChange = async (tabSelected) => {
    try {
      setTab(tabSelected)
      if (tabSelected === 'liked') {
        const allPets = await getAllPets()
        setPetsTabArray(
          allPets?.filter((pet) => petsUserLiked.includes(pet.pet_id)),
        )
      }
      if (tabSelected === 'saved') {
        const allPets = await getAllPets()
        setPetsTabArray(
          allPets?.filter((pet) => petsUserSaved.includes(pet.pet_id)),
        )
      }
      if (tabSelected === 'fostered') {
        const allPets = await getAllPets()
        setPetsTabArray(
          allPets?.filter((pet) => petsUserFostered.includes(pet.pet_id)),
        )
      }
      if (tabSelected === 'adopted') {
        const allPets = await getAllPets()
        setPetsTabArray(
          allPets?.filter((pet) => petsUserAdopted.includes(pet.pet_id)),
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box width="100%">
      <Tabs isFitted>
        <Divider style={{ border: 'none', margin: '0.3rem' }} />
        <TabList>
          <Tab
            onClick={() => handleTabChange('fostered')}
            fontWeight="semibold"
          >
            My Fostered Pets
          </Tab>
          <Tab onClick={() => handleTabChange('saved')} fontWeight="semibold">
            Saved Pets
          </Tab>
          <Tab onClick={() => handleTabChange('liked')} fontWeight="semibold">
            Liked Pets
          </Tab>
          <Tab onClick={() => handleTabChange('adopted')} fontWeight="semibold">
            My Adopted Pets
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <GridViewPets cardSize={25} petsArray={petsTabArray} tab={tab} />
          </TabPanel>
          <TabPanel>
            <GridViewPets cardSize={25} petsArray={petsTabArray} tab={tab} />
          </TabPanel>
          <TabPanel>
            <GridViewPets cardSize={25} petsArray={petsTabArray} tab={tab} />
          </TabPanel>
          <TabPanel>
            <GridViewPets cardSize={25} petsArray={petsTabArray} tab={tab} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
