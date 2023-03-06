import { useState, useEffect, React, useRef, useLayoutEffect } from 'react'
import {
    Card,
    CardHeader,
    useToast,
    CardFooter,
    Text,
    Button,
    Image,
    Box,
    Flex,
    Avatar,
    Heading,
    IconButton,
    Tooltip,
    Tag,
    TagLabel,
    useColorMode,
    Stack,
    CardBody,
    Center,
    useMediaQuery,
} from '@chakra-ui/react'
import { petStatusBgColor } from '../../utils/globals'
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot'
import { useSearchContext } from '../../context/SearchContext'
import { useAuthContext } from '../../context/AuthContext'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import { Spinner } from '@chakra-ui/react'
import './PetCardGrid.css'
import { HeartFilled } from '@ant-design/icons'

import '../search/search.css'
import { useSearchParams } from 'react-router-dom'
import PetActionsFull from './PetActionsFull'
import PetTag from './PetTag'
import PetActionsGrid from './PetActionsGrid'
export default function PetCardFull({ pet, status, userInfoLikes, viewTab }) {
    console.log(pet, 'cardFull')
    const theme = useColorMode('dark', 'light')
    const [isSmallerThan1400] = useMediaQuery('(max-width: 1400px)')
    const [adoptionStatus, setAdoptionStatus] = useState(status)
    useEffect(() => {
        setAdoptionStatus(status)
    }, [status])

    return (
        <Card
            direction={isSmallerThan1400 ? { base: 'row', sm: 'column' } : { base: 'column', sm: 'row' }}
            overflow="scroll"
            variant="outline"
            mb={8}
            bgColor={theme === 'dark' && '#121212'}
            style={{ overflowWrap: 'break-word' }}
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
                <CardBody>
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
                    <Flex mt={2}>
                        <PetTag label={pet?.type} />
                        <PetTag label={pet?.breed} />
                        <PetTag label={pet?.color} />
                        <PetTag label={pet?.hypoallergenic === 0 ? 'No hypoallergenic' : 'Hypoallergenic'} />
                        <PetTag label={`${pet?.height}cm`} />
                        <PetTag label={`${pet?.weight}kg`} />
                    </Flex>
                </CardBody>
                <CardFooter>
                    <PetActionsGrid
                        pet={pet}
                        status={status}
                        userInfoLikes={userInfoLikes}
                        viewTab={viewTab}
                        // setAdoptionStatus={setAdoptionStatus}
                    />
                </CardFooter>
            </Stack>
        </Card>
    )
}
