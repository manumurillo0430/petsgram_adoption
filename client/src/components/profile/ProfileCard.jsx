import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Button,
  Image,
  Box,
  Flex,
  Avatar,
  Heading,
  Tooltip,
  IconButton,
  Link,
} from '@chakra-ui/react'
import { Divider } from 'antd'
import './ProfileCard.css'

export default function ProfileCard({ user }) {
  console.log(user)
  return (
    <>
      <Card maxW="md">
        <Image
          alt={`${user.firstname} ${user.lastname}`}
          src={user.picture}
          maxHeight="25rem"
          objectFit="cover"
          objectPosition="top"
          w="100%"
        />
        <Divider style={{ border: 'none', margin: '0.3rem' }} />
        <CardBody
          display="flex"
          flexDirection="column"
          justifyContent="space-evenly"
        >
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name={`${user.firstname} ${user.lastname}`} />
              <Box>
                <Heading size="md">
                  {`${user.firstname} ${user.lastname}`}
                </Heading>
                <Text display="flex">
                  <Text Text fontWeight="600">
                    With us from:&nbsp;&nbsp;
                  </Text>
                  {new Date(user.created_at).toLocaleDateString('en-US', {
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
            <Link href={`mailto:${user.email}`}>{user.email}</Link>
          </Text>
          <Divider style={{ border: 'none', margin: '0.5rem' }} />
          <Text display="flex">
            <Text fontWeight="600">Number:&nbsp;&nbsp;</Text>
            {user.phonenumber}
          </Text>
          <Divider style={{ border: 'none', margin: '0.5rem' }} />
          <Text display="flex">
            <Text fontWeight="600">Role:&nbsp;&nbsp;</Text>
            {user.role === 1 ? 'Adminstrator' : 'User'}
          </Text>
          <Divider style={{ border: 'none', margin: '0.5rem' }} />
          <Text display="flex">
            <Text fontWeight="600">Bio:&nbsp;&nbsp;</Text>
            {user.bio}
          </Text>
        </CardBody>
      </Card>
    </>
  )
}
