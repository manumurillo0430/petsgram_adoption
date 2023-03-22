import React, { useState, useEffect } from 'react'
import { Card, CardBody, Text, Divider } from '@chakra-ui/react'
import { useSearchContext } from '../../context/SearchContext'
import { useAuthContext } from '../../context/AuthContext'
import PetAvatar from './PetAvatar'
import './ProfileCard.css'

export default function MyPetsCard() {
  const {
    petsUserAdopted,
    petsUserFostered,
    petsUserLiked,
    petsUserSaved,
  } = useAuthContext()
  const { getAllPets } = useSearchContext()
  const [petsArray, setPetsArray] = useState([])

  useEffect(() => {
    async function fetchPets() {
      try {
        const allPets = await getAllPets()
        setPetsArray(allPets)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPets()
  }, [])

  return (
    <>
      <Card maxW="md">
        <CardBody>
          <Text fontWeight="500" fontSize="xl" mb={3}>
            My Fostered Pets:
          </Text>
          {petsArray?.length &&
            petsArray
              .filter((pet) => petsUserFostered.includes(pet.pet_id))
              .map((pet) => (
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
            My Adopted Pets:
          </Text>
          {petsArray?.length &&
            petsArray
              .filter((pet) => petsUserAdopted.includes(pet.pet_id))
              .map((pet) => (
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
          {petsArray?.length &&
            petsArray
              .filter((pet) => petsUserLiked.includes(pet.pet_id))
              .map((pet) => (
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
          {petsArray?.length &&
            petsArray
              .filter((pet) => petsUserSaved.includes(pet.pet_id))
              .map((pet) => (
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