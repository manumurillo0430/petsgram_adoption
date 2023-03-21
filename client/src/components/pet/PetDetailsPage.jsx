import React from 'react'
import { Center, Text } from '@chakra-ui/react'
import { GetReq } from '../../utils/api'
import { useEffect, useState } from 'react'
import { userLocation } from '../../utils/globals'
import PetCardFull from './PetCardFull'

export default function PetDetailsPage({ userInfoLikes, viewTab }) {
  const [pet, setPet] = useState({})
  const [serverMessage, setServerMessage] = useState(false)
  useEffect(() => {
    const getPetById = async () => {
      try {
        const res = await GetReq(
          `/pet/${userLocation(window.location.pathname)}`,
        )
        if (res.ok) {
          setServerMessage(false)
          setPet(res.pet)
        }
      } catch (error) {
        console.log(error)
        setServerMessage(error.response.data)
      }
    }
    getPetById()
  }, [])

  return (
    <Center m={6} w="70%">
      {!serverMessage ? (
        <PetCardFull
          pet={pet}
          status={pet.adoptionStatus ? pet.adoptionStatus : ''}
          userInfoLikes={userInfoLikes}
          viewTab={viewTab}
        />
      ) : (
        <Text>{serverMessage}</Text>
      )}
    </Center>
  )
}
