import { Box, Divider } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import MyPetsCard from '../components/profile/MyPetsCard'
import ProfileCard from '../components/profile/ProfileCard'
import { useAuthContext } from '../context/AuthContext'
import { userLocation } from '../utils/globals'

export default function ProfileDetails() {
  const { isActiveSession, getUserById } = useAuthContext()
  const [user, setUser] = useState(
    Number(userLocation(window.location.pathname)),
  )
  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const userInfo = await getUserById(
          userLocation(window.location.pathname),
        )
        console.log(userInfo, userLocation(window.location.pathname), 'hey hey')
        setUser(userInfo.user)
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
            <ProfileCard user={user} />
            <Divider m={6} orientation="vertical" />
            <MyPetsCard user={user} />
          </Box>
        </Box>
      )}
    </>
  )
}
