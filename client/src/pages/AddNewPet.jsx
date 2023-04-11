import React, { useState, useEffect } from 'react'
import { userLocation } from '../utils/globals'
import { Box } from '@chakra-ui/react'
import { GetReq } from '../utils/api'
import PetForm from '../components/Admin/PetForm'

export default function AddNewPet() {
  const userRole = localStorage.getItem('userRole')
  const location = userLocation(window.location.pathname)
  const [pet, setPet] = useState(false)
  useEffect(() => {
    const getPetById = async () => {
      try {
        if (location !== 'new') {
          const res = await GetReq(`/pet/${location}`)
          if (res.ok) {
            setPet(res.pet)
          }
        } else return
      } catch (error) {
        console.log(error)
      }
    }
    getPetById()
  }, [location !== 'new'])

  return (
    <>
      <Box w="100%">
        {userRole && <PetForm pet={pet} location={location} />}
      </Box>
    </>
  )
}
