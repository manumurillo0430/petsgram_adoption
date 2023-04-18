import React from 'react'
import { userLocation } from '../utils/globals'
import { Box, Heading } from '@chakra-ui/react'
import PetForm from '../components/admin/AddNewPetForm'

export default function SaveALife() {
  const userRole = localStorage.getItem('userRole')
  const location = userLocation(window.location.pathname)
  console.log(location)

  return (
    <>
      <Box w="70%">
        {location === 'savealife' && (
          <Heading textAlign="center" size="lg" mt={2} p={0}>
            Fill this form and save a life
          </Heading>
        )}
        {userRole && <PetForm location={location} />}
      </Box>
    </>
  )
}
