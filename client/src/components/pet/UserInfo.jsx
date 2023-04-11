import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Flex, Avatar, Text, Button } from '@chakra-ui/react'
export default function UserInfo({ user }) {
  console.log(user)
  let navigate = useNavigate()
  return (
    <Flex>
      <Avatar src={user.picture} />
      <Text>
        {user.firstname} {user.lastname}
      </Text>
      <Button
        colorScheme="blue"
        isDisabled={user.is_private ? true : false}
        onClick={() => navigate(`/profile/${user.user_id}`)}
      >
        See Profile
      </Button>
    </Flex>
  )
}
