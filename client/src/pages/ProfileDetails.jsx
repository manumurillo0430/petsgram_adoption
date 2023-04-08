import { Box, Divider } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import MyPetsCard from '../components/profile/MyPetsCard'
import ProfileCard from '../components/profile/ProfileCard'
import { useAuthContext } from '../context/AuthContext'
import { userLocation } from '../utils/globals'
import { Spinner } from '@chakra-ui/react'

export default function ProfileDetails() {
  const { isActiveSession, getUserById, getCurrentUser } = useAuthContext()
  const [user, setUser] = useState(
    Number(userLocation(window.location.pathname)),
  )
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    async function fetchUserDetails() {
      try {
        setIsLoading(true)
        const userInfo = await getUserById(
          userLocation(window.location.pathname),
        )
        if (userInfo) {
          setIsLoading(false)
          setUser(userInfo.user)
        }
        const userPets = await getCurrentUser(
          userLocation(window.location.pathname),
        )
        if (userPets) {
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchUserDetails()
  }, [])

  return (
    <>
      {isActiveSession && (
        <Box>
          <Box display="Flex" m={6}>
            {isLoading ? <Spinner /> : <ProfileCard user={user} />}
            <Divider m={6} orientation="vertical" />
            {isLoading ? <Spinner /> : <MyPetsCard user={user} />}
          </Box>
        </Box>
      )}
    </>
  )
}
