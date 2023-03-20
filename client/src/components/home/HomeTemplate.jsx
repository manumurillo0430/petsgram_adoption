import React from 'react'
import { useEffect } from 'react'
import { Text, Container, Flex, Image, Heading, Button } from '@chakra-ui/react'
import { Divider } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { PostReq, GetReq } from '../../utils/api'
import { useAuthContext } from '../../context/AuthContext'
import axios from 'axios'
import Ourfeatures from './Ourfeatures'

export default function HomeTemplate() {
  const { currentUser } = useAuthContext()
  console.log(currentUser)
  const { clearCurrentUser } = useAuthContext()
  let navigate = useNavigate()

  useEffect(() => {
    const awaitGetPets = async () => await getAllPets()
    awaitGetPets()
  }, [])

  const getAllPets = async () => {
    try {
      const res = await GetReq('/pet')
      console.log(res)
      // if (res) {
      //   res.pets.map(async (pet) => {
      //     try {
      //       await PostReq('/pet', pet)
      //     } catch (error) {
      //       console.error(error)
      //     }
      //   })
      // }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container w="100%" h="100vh" display="flex">
      <Flex justifyContent="space-around">
        <Container w="100%" display="flex" flexDirection="column">
          <Text w="100%" fontSize="3xl" fontWeight="semibold">
            Save a life and expand your family...
          </Text>
          <Divider style={{ border: 'none', margin: '0.3rem' }} />
          <Text fontSize="xl" w="100%">
            Discover and Connect with Adorable Pets on Our Unique Adoption
            Platform with Social Media options Features:
          </Text>
          <Divider style={{ border: 'none', margin: '0.6rem' }} />
          <Divider style={{ border: 'none', margin: '0.3rem' }} />
          <Ourfeatures
            feature="Discover and Rescue"
            text="Browse and save pets by name, breed, age, and more."
          />

          <Ourfeatures
            feature="Socialize&nbsp;with&nbsp;Pets"
            text="Follow them and connect with other pet lovers."
          />
          <Ourfeatures
            feature="Adopt&nbsp;or&nbsp;Foster"
            text="Apply with our expert guidance."
          />
          <Ourfeatures
            feature="Enjoy and be part"
            feature2="of community"
            text="Join and stay connected with your favorite pets. Get notified of new pets for adoption or fostering."
          />

          <Button
            onClick={() => navigate('/search')}
            mw="100%"
            colorScheme="blue"
            type="submit"
          >
            Start your journey...
          </Button>
        </Container>
      </Flex>
    </Container>
  )
}
