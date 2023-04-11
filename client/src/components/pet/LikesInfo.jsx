import React from 'react'
import { Flex } from '@chakra-ui/react'
import UserInfo from './UserInfo'

export default function LikesInfo({ toggleModal, userInfoLikes }) {
  console.log(userInfoLikes)
  return (
    <>
      <Flex flexDirection="column">
        {userInfoLikes?.map((user) => {
          return <UserInfo user={user} />
        })}
      </Flex>
    </>
  )
}
