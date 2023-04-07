import { Box } from '@chakra-ui/react'
import React from 'react'
import PetForm from '../components/admin/PetForm'

export default function AddNewPet() {
  const userRole = localStorage.getItem('userRole')
  return (
    <>
      <Box w="100%">{userRole && <PetForm />}</Box>
    </>
  )
}
