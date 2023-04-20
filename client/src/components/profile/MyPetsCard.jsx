import React from 'react'
import { Card, CardBody, Text, Divider } from '@chakra-ui/react'
import PetAvatar from './PetAvatar'
import './ProfileCard.css'

export default function MyPetsCard({ userPets }) {
  return (
    <>
      <Card maxW="md">
        <CardBody>
          <Text fontWeight="500" fontSize="xl" mb={3}>
            My Fostered Pets:
          </Text>
          {userPets?.fostered?.length &&
            userPets?.fostered?.map((pet) => (
              <PetAvatar
                key={pet.pet_id}
                label={pet.name}
                id={pet.pet_id}
                picture={pet.picture}
              />
            ))}
        </CardBody>
        <Divider orientation="horizontal" />
        <CardBody>
          <Text fontWeight="500" fontSize="xl" mb={3}>
            My Adopted Pets:
          </Text>
          {userPets?.adopted?.length &&
            userPets.adopted?.map((pet) => (
              <PetAvatar
                label={pet.name}
                id={pet.pet_id}
                picture={pet.picture}
              />
            ))}
        </CardBody>
        <Divider orientation="horizontal" />
        <CardBody>
          <Text fontWeight="500" fontSize="xl" mb={3}>
            My Liked Pets:
          </Text>
          {userPets?.liked?.length &&
            userPets?.liked?.map((pet) => (
              <PetAvatar
                label={pet.name}
                id={pet.pet_id}
                picture={pet.picture}
              />
            ))}
        </CardBody>
        <Divider orientation="horizontal" />
        <CardBody>
          <Text fontWeight="500" fontSize="xl" mb={3}>
            My Saved Pets:
          </Text>
          {userPets?.saved?.length &&
            userPets?.saved?.map((pet) => (
              <PetAvatar
                label={pet.name}
                id={pet.pet_id}
                picture={pet.picture}
              />
            ))}
        </CardBody>
      </Card>
    </>
  )
}
