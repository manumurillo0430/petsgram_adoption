import React from 'react'
import { NavLink } from 'react-router-dom'
import { Avatar, Tooltip, Link } from '@chakra-ui/react'
import './ProfileCard.css'

export default function PetAvatar({ id, picture, label }) {
  return (
    <Tooltip label={label} placement="top">
      <Link as={NavLink} to={`/pet/${id}`}>
        <Avatar size="lg" ml={4} mb={1} src={picture} />
      </Link>
    </Tooltip>
  )
}
