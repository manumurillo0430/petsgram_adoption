import { Box, Divider } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import MyPetsCard from '../components/profile/MyPetsCard'
import ProfileCard from '../components/profile/ProfileCard'
import { useAuthContext } from '../context/AuthContext'
import { userLocation } from '../utils/globals'
import { Spinner } from '@chakra-ui/react'

export default function ProfileDetails() {
  const { isActiveSession, getUserById } = useAuthContext()

  const [user, setUser] = useState(null)
  const [userPets, setUserPets] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        setIsLoading(true)

        const userInfo = await getUserById(
          Number(userLocation(window.location.pathname)),
        )
        console.log(userInfo, 'hola')
        if (userInfo) {
          setIsLoading(false)
          setUser(userInfo.user)
          setUserPets(userInfo.pets)
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchUserDetails()
  }, [Number(userLocation(window.location.pathname))])

  return (
    <>
      {isActiveSession && (
        <Box pb={6}>
          <Box display="Flex" m={6}>
            {isLoading ? (
              <Spinner />
            ) : user ? (
              <ProfileCard user={user} />
            ) : null}
            <Divider m={6} orientation="vertical" />
            {isLoading ? (
              <Spinner />
            ) : user ? (
              <MyPetsCard userPets={userPets} />
            ) : null}
          </Box>
        </Box>
      )}
    </>
  )
}
