import React, { useState, useEffect } from 'react'
import { Text } from '@chakra-ui/react'

export default function PetLikesText({ isLiked, userInfoLikes }) {
  const [updatedLikes, setUpdatedLikes] = useState(userInfoLikes?.length)

  useEffect(() => {
    setUpdatedLikes(userInfoLikes?.length)
  }, [userInfoLikes])

  useEffect(() => {
    if (isLiked) {
      setUpdatedLikes((prevLikes) => prevLikes + 1)
    } else {
      setUpdatedLikes((prevLikes) => prevLikes - 1)
    }
  }, [isLiked])

  let likesText = ''

  if (isLiked) {
    if (updatedLikes === 1) {
      likesText = (
        <>
          <b>You</b> like this pet
        </>
      )
    } else if (updatedLikes > 1) {
      likesText = (
        <>
          <b>You</b> and {updatedLikes - 1} more users like this pet
        </>
      )
    }
  } else {
    if (updatedLikes === 1) {
      likesText = 'One user likes this pet'
    } else if (updatedLikes > 1) {
      likesText = `${updatedLikes} users like this pet`
    }
  }

  return (
    <Text fontSize="0.83rem" minHeight="1.5rem">
      {likesText}
    </Text>
  )
}
