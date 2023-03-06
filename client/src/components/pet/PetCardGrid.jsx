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
    IconButton,
    Tooltip,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { petStatusColor } from '../../utils/globals'
import { petStatusBgColor } from '../../utils/globals'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import './PetCardGrid.css'
import '../search/search.css'
import PetActionsGrid from '../pet/PetActionsGrid'

export default function PetCardGrid({ pet, status, tab, userInfoLikes }) {
    const location = window.location.pathname.split('/')
    const userLocation = location[location.length - 1]
    let navigate = useNavigate()

    const [adoptionStatus, setAdoptionStatus] = useState(status)
    useEffect(() => {
        setAdoptionStatus(status)
    }, [status])

    const [cleanOffList, setCleanOfList] = useState(false) // This state is created while the user is on their page.
    return (
        <Card display={userLocation !== 'search' && cleanOffList ? 'none' : ''} justify="space-between" maxW="md">
            <CardHeader flexDirection="row nowrap">
                <Flex spacing="4">
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="nowrap">
                        <Avatar
                            color="#121212"
                            style={
                                adoptionStatus === status ? petStatusBgColor(status) : petStatusBgColor(adoptionStatus)
                            }
                            name={pet.name}
                            src=""
                        />
                        <Box>
                            <Heading size="md">{pet.name}</Heading>

                            <Text whiteSpace="nowrap" fontSize="0.93rem" fontWeight="500" size="xs">
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

                    <Tooltip label="See more" placement="top">
                        <IconButton
                            pet={pet}
                            icon={<MoreHorizIcon />}
                            variant="ghost"
                            colorScheme="gray"
                            aria-label="See more"
                            onClick={() => navigate(`/pet/${pet?.pet_id}`)}
                        />
                    </Tooltip>
                    <Tooltip label="Edit pet information" placement="top">
                        <Button
                            pet={pet}
                            variant="ghost"
                            colorScheme="gray"
                            aria-label="See more"
                            onClick={() => navigate(`/admin/editpet/${pet.pet_id}`)}
                        >
                            Edit pet
                        </Button>
                    </Tooltip>
                </Flex>
            </CardHeader>
            <Image src={pet.picture} alt={pet.name} h="15rem" objectFit="cover" objectPosition="top" w="100%" />

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
                    // setAdoptionStatus={setAdoptionStatus}
                    setCleanOfList={setCleanOfList}
                    userLocation={userLocation}
                    pet={pet}
                    status={status}
                    tab={tab}
                    userInfoLikes={userInfoLikes}
                />

                {/* <Button flex='1'   variant='ghost' onClick={handleDelete}>
          Delete
        </Button> */}
            </CardFooter>
        </Card>
    )
}
