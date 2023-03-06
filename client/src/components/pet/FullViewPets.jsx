import { useState, useEffect, React } from 'react'
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
} from '@chakra-ui/react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useNavigate } from 'react-router-dom'
import { petStatusColor } from '../../utils/globals'
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
import { useMediaQuery } from '@mui/material'

import '../search/search.css'
import { useSearchParams } from 'react-router-dom'
export default function PetCardSocialMedia({ pet, status }) {
    console.log(pet)
    const theme = useColorMode('dark', 'light')
    const [adoptionStatus, setAdoptionStatus] = useState(status)
    useEffect(() => {
        setAdoptionStatus(status)
    }, [status])
    return (
        <Card
            direction={{ base: 'column', md: 'row' }}
            variant="outline"
            mb={8}
            w="80%"
            minH="8rem"
            bgColor={theme === 'dark' && '#121212'}
        >
            <Image objectFit="cover" maxW={{ base: '9rem', sm: '10rem' }} src={pet?.picture} alt={pet?.name} />

            <Stack w={{ base: '100%', sm: '50%' }} p={0}>
                <CardBody p={2}>
                    <Center placeContent="start" mb={4}>
                        <Heading alignContent="end" size="sm">
                            {pet?.name}
                        </Heading>
                    </Center>
                </CardBody>
            </Stack>
        </Card>
    )
}
