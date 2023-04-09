import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import PetCardFull from './PetCardFull'

export default function FullViewPets({ petsArray, usersLikes, viewTab }) {
  return (
    <Box w="80%">
      {petsArray?.length ? (
        petsArray.map((pet) => {
          const userInfoLikes = usersLikes?.find(
            (like) => like[0] === pet.pet_id,
          )?.[1]

          return (
            <PetCardFull
              key={pet.pet_id}
              pet={pet}
              status={pet.adoptionStatus ? pet.adoptionStatus : ''}
              userInfoLikes={userInfoLikes}
              viewTab={viewTab}
            />
          )
        })
      ) : (
        <Text>Sorry, there are no results that match your criteria.</Text>
      )}
    </Box>
  )
}
