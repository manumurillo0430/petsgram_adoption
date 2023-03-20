import { Box, Divider } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import MyPetsCard from '../components/profile/MyPetsCard'
import ProfileCard from '../components/profile/ProfileCard'
import { useAuthContext } from '../context/AuthContext'

export default function ProfileDetails() {
  const location = window.location.pathname.split('/')
  const userLocation = Number(location[location.length - 1])
  const { isActiveSession, getUserById } = useAuthContext()
  const [user, setUser] = useState(userLocation)
  useEffect(() => {
    // if (userLocation.user_id !== userLocation) {
    async function fetchUserDetails() {
      try {
        const userInfo = await getUserById(userLocation)
        console.log(userInfo, userLocation, 'hey hey')
        setUser(userInfo.user)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchUserDetails()
    // } else {
    //   setUser(userLocation)
    //   console.log(user, 'this is my users')
    // }
  }, [])

  console.log(userLocation)
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
