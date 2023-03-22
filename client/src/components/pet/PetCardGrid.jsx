import { useState, useEffect, React } from 'react'
import {
  Card,
  CardHeader,
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
} from '@chakra-ui/react'
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined'
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined'
import { useNavigate } from 'react-router-dom'
import { petStatusColor } from '../../utils/globals'
import { petStatusBgColor } from '../../utils/globals'
import { Divider } from 'antd'
import './PetCardGrid.css'
import '../search/search.css'
import PetActionsGrid from './PetActions'
import { useAuthContext } from '../../context/AuthContext'

export default function PetCardGrid({ pet, status, tab, userInfoLikes }) {
  const location = window.location.pathname.split('/')
  const userLocation = location[location.length - 1]
  let navigate = useNavigate()
  const { currentUser } = useAuthContext()
  const [adoptionStatus, setAdoptionStatus] = useState(status)

  useEffect(() => {
    setAdoptionStatus(status)
  }, [status])

  const [cleanOffList, setCleanOfList] = useState(false)
  return (
    <Card
      display={userLocation !== 'search' && cleanOffList ? 'none' : ''}
      justify="space-between"
      maxW="md"
    >
      <CardHeader flexDirection="row nowrap">
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="nowrap">
            <Avatar
              color="#121212"
              style={
                adoptionStatus === status
                  ? petStatusBgColor(status)
                  : petStatusBgColor(adoptionStatus)
              }
              name={pet.name}
              src=""
            />
            <Box>
              <Heading size="md">{pet.name}</Heading>
              <Divider style={{ border: 'none', margin: '0.3rem' }} />
              <Text
                whiteSpace="nowrap"
                fontSize="0.93rem"
                fontWeight="500"
                size="xs"
              >
                Adoption Status:&nbsp;
                <Box
                  as="span"
                  fontSize="0.93rem"
                  fontWeight="500"
                  size="xs"
                  style={
                    adoptionStatus === status
                      ? petStatusColor(status)
                      : petStatusColor(adoptionStatus)
                  }
                >
                  {adoptionStatus === status ? status : adoptionStatus}
                </Box>
              </Text>
            </Box>
          </Flex>
          {currentUser?.role && (
            <Tooltip label="Edit pet information" placement="top">
              <IconButton
                icon={<ModeEditOutlinedIcon />}
                p="0.1rem"
                fontSize="0.7rem"
                pet={pet}
                variant="ghost"
                colorScheme="gray"
                aria-label="See more"
                userInfoLikes={userInfoLikes}
                onClick={() => navigate(`/admin/editpet/${pet.pet_id}`)}
              />
            </Tooltip>
          )}
          <Tooltip label="See full information" placement="top">
            <IconButton
              p="0.1rem"
              icon={<TextSnippetOutlinedIcon />}
              mr={1}
              fontSize="0.7rem"
              pet={pet}
              variant="ghost"
              colorScheme="gray"
              aria-label="See more"
              onClick={() => navigate(`/pet/${pet?.pet_id}`)}
            />
          </Tooltip>
        </Flex>
      </CardHeader>
      <Image
        src={pet.picture}
        alt={pet.name}
        h="15rem"
        objectFit="cover"
        objectPosition="top"
        w="100%"
      />
      {currentUser.user_id && (
        <CardFooter
          // justify="start"
          alignItems="center"
          flexWrap="nowrap"
          pt={0}
          sx={{
            '& > button': {
              minW: '136px',
            },
          }}
        >
          <PetActionsGrid
            setAdoptionStatus={setAdoptionStatus}
            setCleanOfList={setCleanOfList}
            userLocation={userLocation}
            pet={pet}
            status={status}
            tab={tab}
            userInfoLikes={userInfoLikes}
          />
        </CardFooter>
      )}
    </Card>
  )
}
