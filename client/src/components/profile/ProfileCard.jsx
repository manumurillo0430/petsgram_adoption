import React from 'react'
import {
  Card,
  CardBody,
  Text,
  Image,
  Box,
  Flex,
  Avatar,
  Heading,
  IconButton,
  Link,
  Spinner,
} from '@chakra-ui/react'
import { noProfilePictureDark, noProfilePetLight } from '../../utils/globals'
import { Divider } from 'antd'
import './ProfileCard.css'

export default function ProfileCard({ user }) {
  return (
    <>
      <Card maxW="md">
        {user == undefined && <Spinner />}
        <Image
          alt={`${user?.firstname} ${user?.lastname}`}
          src={user?.picture === '' ? noProfilePictureDark : user?.picture}
          maxHeight="25rem"
          objectFit="cover"
          objectPosition="top"
          alignSelf={user.picture == '' && 'center'}
          w={user?.picture == '' ? '60%' : '100%'}
        />
        <Divider style={{ border: 'none', margin: '0.3rem' }} />
        <CardBody
          display="flex"
          flexDirection="column"
          justifyContent="space-evenly"
        >
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name={`${user?.firstname} ${user?.lastname}`} />
              <Box>
                <Heading size="md">
                  {`${user?.firstname} ${user?.lastname}`}
                </Heading>
                <Text display="flex">
                  <Text Text fontWeight="600">
                    With us from:&nbsp;&nbsp;
                  </Text>
                  {new Date(user?.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
              </Box>
            </Flex>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              icon={''}
            />
          </Flex>

          <Divider style={{ border: 'none', margin: '0.5rem' }} />
          <Text display="flex">
            <Text fontWeight="600">E-mail:&nbsp;&nbsp;</Text>
            <Link href={`mailto:${user?.email}`}>{user?.email}</Link>
          </Text>
          <Divider style={{ border: 'none', margin: '0.5rem' }} />
          <Text display="flex">
            <Text fontWeight="600">Number:&nbsp;&nbsp;</Text>
            {user?.phonenumber}
          </Text>
          <Divider style={{ border: 'none', margin: '0.5rem' }} />
          <Text display="flex">
            <Text fontWeight="600">Role:&nbsp;&nbsp;</Text>
            {user?.role === true ? 'Adminstrator' : 'User'}
          </Text>
          <Divider style={{ border: 'none', margin: '0.5rem' }} />
          <Text display="flex">
            <Text fontWeight="600">Bio:&nbsp;&nbsp;</Text>
            {user?.bio}
          </Text>
        </CardBody>
      </Card>
    </>
  )
}
