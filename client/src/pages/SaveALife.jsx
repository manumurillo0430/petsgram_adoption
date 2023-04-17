import React from 'react'
import { userLocation } from '../utils/globals'
import { Box } from '@chakra-ui/react'
import PetForm from '../components/admin/AddNewPetForm'

export default function SaveALife() {
  const userRole = localStorage.getItem('userRole')
  const location = userLocation(window.location.pathname)

  return (
    <>
      <Box w="100%">{userRole && <PetForm location={location} />}</Box>
    </>
  )
}
