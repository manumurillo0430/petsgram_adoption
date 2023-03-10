import { useState, useEffect, React } from 'react'
import { Text, Flex, Tooltip } from '@chakra-ui/react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot'
import { useSearchContext } from '../../context/SearchContext'
import { useAuthContext } from '../../context/AuthContext'
import FavoriteIcon from '@mui/icons-material/Favorite'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import { Spinner } from '@chakra-ui/react'
import './PetCardGrid.css'
import { useMediaQuery } from '@mui/material'
import PetButtonSM from './PetButtonSM'
import PetButtonStatus from './PetButtonStatus'
export default function PetActionsGrid({ setCleanOfList, pet, status, tab, userInfoLikes }) {
    const location = window.location.pathname.split('/')
    const userLocation = location[location.length - 1]
    const {
        currentUser,
        user_id,
        isActiveSession,
        petsUserAdopted,
        petsUserFostered,
        petsUserLiked,
        petsUserSaved,
        userLikedPet,
        userSavedPet,
        userUnsavedPet,
    } = useAuthContext()

    const { deletePet, updatingAdoptionStatus, addLike, returnPet } = useSearchContext()

    // useEffect(() => {
    //     setAdoptionStatus(status)
    // }, [status])

    const [newAdoptionStatus, setNewAdoptionStatus] = useState(status)
    const [heart, setHeart] = useState(true)
    const [save, setSave] = useState(true)

    const handleLike = async () => {
        console.log(userLocation)
        if (userLocation !== 'search' && tab === 'liked') {
            setTimeout(() => {
                setCleanOfList(true)
            }, 400)
        }
        console.log(pet)
        console.log(pet.pet_id)
        setHeart(!heart)
        await userLikedPet(pet.pet_id, currentUser?.user?.user_id)
        await addLike(user_id, pet.pet_id)
    }

    const handleDelete = async () => {
        await deletePet(pet.pet_id, currentUser?.user?.user_id)
    }

    const handleSave = async () => {
        setSave(!save)
        await userSavedPet(currentUser?.user_id, pet.pet_id)
    }

    const handleUnsave = async () => {
        if (userLocation !== 'search' && tab === 'saved') {
            setTimeout(() => {
                setCleanOfList(true)
            }, 400)
        }
        setSave(!save)
        await userUnsavedPet(currentUser?.user_id, pet.pet_id)
    }

    const handleAdoptionStatus = async (e) => {
        if (userLocation !== 'search' && tab === 'fostered') {
            setTimeout(() => {
                setCleanOfList(true)
            }, 400)
        }
        if (e.target.textContent === 'Foster') {
            console.log(e.target.textContent)
            setNewAdoptionStatus('Fostered')
            // setAdoptionStatus('Fostered')
            await updatingAdoptionStatus(currentUser?.user_id, pet.pet_id, 'Fostered')
        }
        if (e.target.textContent == 'Adopt') {
            setNewAdoptionStatus('Adopted')
            // setAdoptionStatus('Adopted')
            await updatingAdoptionStatus(currentUser?.user_id, pet.pet_id, 'Adopted')
        }
    }

    const handleReturn = async () => {
        if (userLocation !== 'search' && tab === 'adopted') {
            setTimeout(() => {
                setCleanOfList(true)
            }, 400)
        }
        console.log("I'm clicking to return this pet")
        setNewAdoptionStatus('Available')
        // setAdoptionStatus('Available')
        await returnPet(currentUser?.user_id, pet.pet_id, status)
    }

    let isLiked = userInfoLikes && userInfoLikes.some((users) => users.user_id === user_id)

    return (
        <Flex flexDir="column" width="100%">
            <Flex w="100%" wrap="wrap" justify="start" gap={2}>
                {petsUserLiked === 0 && isActiveSession && (
                    <Tooltip label={heart ? 'Unlike' : 'Like'} placement="bottom">
                        <PetButtonSM
                            color={heart ? '#f78991' : ''}
                            icon={!heart ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            action={handleLike}
                        />
                    </Tooltip>
                )}
                {petsUserLiked !== 0 && petsUserLiked?.includes(pet.pet_id) && isActiveSession ? (
                    <Tooltip label={heart ? 'Unlike' : 'Like'} placement="bottom">
                        <PetButtonSM
                            color={heart ? '#f78991' : ''}
                            icon={heart ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            action={handleLike}
                        />
                    </Tooltip>
                ) : (
                    <Tooltip label={!heart ? 'Unlike' : 'Like'} placement="bottom">
                        <PetButtonSM
                            color={!heart ? '#f78991' : ''}
                            icon={!heart ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            action={handleLike}
                        />
                    </Tooltip>
                )}
                {petsUserSaved === 0 && isActiveSession && (
                    <PetButtonSM label={save ? 'Unsave' : 'Save'} icon={<BookmarkIcon />} action={handleSave} />
                )}
                {petsUserSaved !== 0 && petsUserSaved?.includes(pet.pet_id) && isActiveSession ? (
                    <PetButtonSM
                        label={save ? 'Unsave' : 'Save'}
                        icon={save ? <BookmarkIcon /> : <TurnedInNotIcon />}
                        action={handleUnsave}
                    />
                ) : (
                    <PetButtonSM
                        label={!save ? 'Unsave' : 'Save'}
                        icon={!save ? <BookmarkIcon /> : <TurnedInNotIcon />}
                        action={handleSave}
                    />
                )}
            </Flex>
            <Flex>
                {userInfoLikes?.length > 0 && isLiked ? (
                    <Text fontSize="0.83rem">
                        <b>You</b> and{' '}
                        {userInfoLikes?.length - 1 === 1
                            ? 'one more person like this pet '
                            : `${userInfoLikes?.length} more person like this pet`}
                    </Text>
                ) : (
                    <Text display={!userInfoLikes || userInfoLikes?.length === 0 ? 'none' : ''} fontSize="0.83rem">
                        {userInfoLikes?.length} person like this pet
                    </Text>
                )}
                {userInfoLikes?.length === 0 ||
                    (userInfoLikes?.length === undefined && (
                        <Text fontSize="0.83rem">{`Be the first to show your love to ${pet.name} by liking it!`}</Text>
                    ))}
            </Flex>
            <Flex w="100%">
                {isActiveSession &&
                    newAdoptionStatus === 'Adopted' &&
                    petsUserAdopted.includes(pet.pet_id) === true && (
                        <PetButtonStatus label=" Return" onClick={handleReturn} />
                    )}

                {isActiveSession && newAdoptionStatus === 'Adopted' && petsUserAdopted.includes(pet.pet_id) === false && (
                    <Flex width="100%">
                        <PetButtonStatus mr={2} ml={0} label="Adopt" isDisabled={true} />
                        <PetButtonStatus mr={0} ml={2} label="Foster" isDisabled={true} />
                    </Flex>
                )}
                {isActiveSession && newAdoptionStatus === 'Fostered' && petsUserFostered.includes(pet.pet_id) === true && (
                    <Flex width="100%">
                        <PetButtonStatus
                            mr={2}
                            ml={0}
                            label="Adopt"
                            labelTooltip={`Would you like to adopt ${pet.name}, who is currently available for adoption after being fostered?`}
                            onClick={handleAdoptionStatus}
                        />
                        <PetButtonStatus mr={0} ml={2} label="Return" onClick={handleReturn} />
                    </Flex>
                )}
                {isActiveSession &&
                    newAdoptionStatus === 'Fostered' &&
                    petsUserFostered.includes(pet.pet_id) === false && (
                        <PetButtonStatus label="Adopt" onClick={handleAdoptionStatus} />
                    )}

                {isActiveSession && newAdoptionStatus === 'Available' && (
                    <>
                        <PetButtonStatus mr={2} ml={0} label="Adopt" onClick={handleAdoptionStatus} />
                        <PetButtonStatus mr={0} ml={2} label="Foster" onClick={handleAdoptionStatus} />
                    </>
                )}
            </Flex>
        </Flex>
    )
}
