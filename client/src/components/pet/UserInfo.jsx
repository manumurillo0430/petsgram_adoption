import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Flex, Avatar, Text, Button } from '@chakra-ui/react'
import { Divider } from 'antd'
import { minWidth } from '@mui/system'
export default function UserInfo({ user }) {
  console.log(user)
  let navigate = useNavigate()
  return (
    <>
      <Flex justifyContent="space-between">
        <Flex>
          <Avatar src={user.picture} />
          <Text alignSelf="center" ml={5}>
            {user.firstname} {user.lastname}
          </Text>
        </Flex>
        <Button
          colorScheme="blue"
          isDisabled={user.is_private ? true : false}
          onClick={() => navigate(`/profile/${user.user_id}`)}
          minW="7rem"
        >
          {user.is_private ? 'Private' : 'See more'}
        </Button>
      </Flex>
      <Divider style={{ border: 'none', margin: '0.5rem' }} />
    </>
  )
}
