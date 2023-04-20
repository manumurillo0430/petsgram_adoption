import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import PetsubmissionCard from './PetsubmissionCard'
export default function PetSubmissions({ petsRequested, tab }) {
  return (
    <Box w="80%" justifyContent="center">
      {petsRequested?.length ? (
        petsRequested?.map((pet) => {
          return (
            <PetsubmissionCard
              tab={tab}
              pet={pet}
              status={pet.adoptionStatus ? pet.adoptionStatus : ''}
            />
          )
        })
      ) : (
        <Text>Sorry, there are no results that match your criteria.</Text>
      )}
    </Box>
  )
}
