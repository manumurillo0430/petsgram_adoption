import React from 'react'
import { Flex, Box, VStack, Center, Text } from '@chakra-ui/react'
import { GetReq } from '../../utils/api'
import { useEffect, useState } from 'react'
import { useSearchContext } from '../../context/SearchContext'
import PetCardFull from './PetCardFull'
export default function PetDetailsPage() {
    const pathArray = window.location.pathname.split('/')
    const pet_id = pathArray[pathArray.length - 1]
    console.log(pet_id)
    const [pet, setPet] = useState({})
    const [serverMessage, setServerMessage] = useState(false)
    useEffect(() => {
        const getPetById = async () => {
            try {
                const res = await GetReq(`/pet/${pet_id}`)
                if (res) {
                    setServerMessage(false)
                    setPet(res)
                }
            } catch (error) {
                console.log(error)
                setServerMessage(error.response.data)
            }
        }

        getPetById()
    }, [])
    console.log(pet)
    return (
        <Center mr={6} ml={6} w="70%">
            {!serverMessage ? <PetCardFull pet={pet} /> : <Text>{serverMessage}</Text>}
        </Center>
    )
}
