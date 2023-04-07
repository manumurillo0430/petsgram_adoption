import React from 'react'
import { Text } from '@chakra-ui/react'

export default function PetLikesText({ isLiked, userInfoLikes }) {
  const numberOfLikes = userInfoLikes?.length

  let likesText = ''

  if (isLiked) {
    if (numberOfLikes === 0) {
      likesText = (
        <>
          <b>You</b> like this pet
        </>
      )
    } else if (numberOfLikes === 1) {
      likesText = (
        <>
          <b>You</b> and one more user like this pet
        </>
      )
    } else if (numberOfLikes > 1) {
      likesText = (
        <>
          <b>You</b> and {numberOfLikes} more users like this pet
        </>
      )
    }
  } else {
    if (numberOfLikes === 1) {
      likesText = 'One user likes this pet'
    } else if (numberOfLikes > 1) {
      likesText = `${numberOfLikes} users like this pet`
    }
  }

  return (
    <Text fontSize="0.83rem" minHeight="1.5rem">
      {likesText}
    </Text>
  )
}
