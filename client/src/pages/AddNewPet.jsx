import { Box } from '@chakra-ui/react'
import React from 'react'
import PetForm from '../components/admin/PetForm'

export default function AddNewPet() {
  return (
    <>
      <Box w="100%">
        <PetForm />
      </Box>
    </>
  )
}
