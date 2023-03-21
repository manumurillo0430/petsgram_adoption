import { Grid, Text } from '@chakra-ui/react'
import PetCardGrid from './PetCardGrid'

export default function GridViewPets({ petsArray, cardSize, tab, usersLikes }) {
  return (
    <Grid
      templateColumns={`repeat(auto-fit, minmax(${cardSize}rem, ${cardSize}rem))`}
      justifyContent="center"
      my={7}
      gap={8}
    >
      {petsArray?.length > 0 ? (
        petsArray.map((pet) => {
          const userInfoLikes = usersLikes?.find(
            (like) => like[0] === pet.pet_id,
          )?.[1]

          return (
            <PetCardGrid
              pet={pet}
              tab={tab}
              cardSize={cardSize}
              status={pet.adoptionStatus ? pet.adoptionStatus : ''}
              userInfoLikes={userInfoLikes !== undefined && userInfoLikes}
            />
          )
        })
      ) : (
        <Text>Sorry, there are no results that match your criteria.</Text>
      )}
    </Grid>
  )
}
