import { Grid, Text, Flex } from '@chakra-ui/react'
import PetCardGrid from './PetCardGrid'

export default function GridViewPets({
  petsArray,
  cardSize,
  tab,
  usersLikes,
  location,
}) {
  return (
    <Grid
      templateColumns={`repeat(auto-fit, minmax(${cardSize}rem, ${cardSize}rem))`}
      justifyContent="center"
      my={7}
      gap={8}
    >
      {petsArray?.length > 0 ? (
        petsArray?.map((pet) => {
          const userInfoLikes = usersLikes?.find(
            (like) => like[0] === pet.pet_id,
          )?.[1]

          return (
            <PetCardGrid
              key={pet.pet_id}
              pet={pet}
              tab={tab}
              cardSize={cardSize}
              status={pet.adoptionStatus ? pet.adoptionStatus : ''}
              userInfoLikes={userInfoLikes !== undefined && userInfoLikes}
              location={location}
            />
          )
        })
      ) : (
        <Flex justifyContent="center" alignItems="center">
          {location === 'search' &&
            'Sorry, there are no results that match your criteria.'}
          <Text>
            {petsArray?.length === 0 &&
              location === 'mypets' &&
              'Sorry, there are no pets in this list.'}
          </Text>
        </Flex>
      )}
    </Grid>
  )
}
