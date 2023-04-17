import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Text, Container, Flex, Button } from '@chakra-ui/react'
import { Divider } from 'antd'
import { useAuthContext } from '../../context/AuthContext'
import Ourfeatures from './Ourfeatures'

export default function HomeTemplate() {
  let navigate = useNavigate()
  const { currentUser, isActiveSession } = useAuthContext()

  return (
    <Container w="100%" h="100vh" display="flex" mt="12rem">
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

          <Button
            onClick={() => navigate('/search')}
            w="60%"
            colorScheme="blue"
            type="submit"
          >
            {isActiveSession
              ? `${currentUser.firstname} continue your journey...`
              : 'Start your journey...'}
          </Button>
          <Divider style={{ border: 'none', margin: '0.4rem' }} />
          {isActiveSession && (
            <Text fontSize="0.95rem">
              We are really happy to see you again!
            </Text>
          )}
        </Container>
      </Flex>
    </Container>
  )
}
