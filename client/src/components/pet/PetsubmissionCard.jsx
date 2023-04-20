import { useState, useEffect, React } from 'react'
import {
  Card,
  CardFooter,
  Text,
  Image,
  Flex,
  Avatar,
  Heading,
  useColorMode,
  Stack,
  CardBody,
  Center,
  useMediaQuery,
} from '@chakra-ui/react'
import { petStatusBgColor } from '../../utils/globals'
import PetTag from './PetTag'
import './PetCardGrid.css'
import '../search/search.css'
export default function PetsubmissionCard({ pet }) {
  const theme = useColorMode('dark', 'light')
  const [isSmallerThan1400] = useMediaQuery('(max-width: 1500px)')
  const [isSmallerThan980] = useMediaQuery('(max-width: 980px)')
  return (
    <Card
      direction={
        isSmallerThan1400
          ? { base: 'row', sm: 'column' }
          : { base: 'column', sm: 'row' }
      }
      variant="outline"
      mb={8}
      overflowWrap="break-word"
      style={{ backgroundColor: theme === 'dark' && '#011529' }}
    >
      <Image
        objectFit="cover"
        maxW={isSmallerThan1400 ? '100%' : { base: '30rem', sm: '30rem' }}
        maxH={isSmallerThan1400 ? '50vh' : ''}
        src={pet?.picture}
        alt={pet?.name}
        borderBottomRightRadius="40%"
      />

      <Stack w={isSmallerThan1400 ? '100%' : { base: '100%', md: '70%' }} p={4}>
        <CardBody textAlign="initial">
          <Center placeContent="start" mb={4}>
            <Avatar
              color="#121212"
              size="md"
              style={petStatusBgColor(pet?.adoptionStatus)}
              name={pet?.name}
              mr={3}
            />
            <Heading alignContent="end" size="md">
              {pet?.name}
            </Heading>
          </Center>

          <Text mt={2}>
            <b>Bio:</b>
          </Text>
          <Text>{pet?.bio}</Text>
          <Text mt={2}>
            <b>Dietary:</b>
          </Text>
          <Text>{pet?.dietary}</Text>
          <Text mt={2}>
            <b>Relevant Information:</b>
          </Text>
          <Flex
            w={isSmallerThan980 ? '10rem' : ''}
            flexDirection={isSmallerThan980 ? 'column' : ''}
            mt={2}
          >
            <PetTag label={pet?.type} />
            <PetTag label={pet?.breed} />
            <PetTag label={pet?.color} />
            <PetTag
              label={
                pet?.hypoallergenic === 0
                  ? 'No hypoallergenic'
                  : 'Hypoallergenic'
              }
            />
            <PetTag label={`${pet?.height}cm`} />
            <PetTag label={`${pet?.weight}kg`} />
          </Flex>
          <Text mt={2}>
            <b>Adoption Status:</b>
          </Text>
          <Text>{pet?.request}</Text>
        </CardBody>
        <CardFooter></CardFooter>
      </Stack>
    </Card>
  )
}
