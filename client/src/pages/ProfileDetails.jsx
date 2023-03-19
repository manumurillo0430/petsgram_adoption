import { Box, Container, Divider } from '@chakra-ui/react'
import React from 'react'
import MyPetsCard from '../components/profile/MyPetsCard'
import ProfileCard from '../components/profile/ProfileCard'
import { useAuthContext } from '../context/AuthContext'

export default function ProfileDetails() {
  const { currentUser, isActiveSession } = useAuthContext()
  return (
    <>
      {isActiveSession && (
        <Box>
          <Box display="Flex" m={6}>
            <ProfileCard user={currentUser} />
            <Divider m={6} orientation="vertical" />
            <MyPetsCard user={currentUser} />
          </Box>
        </Box>
      )}
    </>
  )
}
