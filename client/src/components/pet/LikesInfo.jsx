import React from 'react'
import { Flex } from '@chakra-ui/react'

import UserInfo from './UserInfo'

export default function LikesInfo({ userInfoLikes }) {
  return (
    <>
      <Flex flexDirection="column">
        {userInfoLikes?.map((user) => {
          return (
            <>
              <Flex flexDirection="column">
                <UserInfo user={user} />
              </Flex>
            </>
          )
        })}
      </Flex>
    </>
  )
}
