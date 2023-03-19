import { Container } from '@chakra-ui/react'
import React from 'react'
import PetForm from '../components/admin/PetForm'

export default function AddNewPet() {
  return (
    <>
      <Container w="100%">
        <PetForm />
      </Container>
    </>
  )
}
