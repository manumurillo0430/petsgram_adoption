import React, { useState, useEffect } from 'react'
import { Text, Flex, Tooltip } from '@chakra-ui/react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot'
import { useSearchContext } from '../../context/SearchContext'
import { useAuthContext } from '../../context/AuthContext'
import FavoriteIcon from '@mui/icons-material/Favorite'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import { userNames } from '../../utils/globals'
import PetButtonStatus from './PetButtonStatus'
import './PetCardGrid.css'
import PetButtonsSaveLike from './PetButtonsSaveLike'
import PetLikesText from './PetLikesText'

export default function PetActionsGrid({
  setCleanOfList,
  pet,
  setAdoptionStatus,
  tab,
  userInfoLikes,
  location,
}) {
  const {
    currentUser,
    user_id,
    petsUserAdopted,
    petsUserFostered,
    petsUserLiked,
    petsUserSaved,
    userLikedPet,
    userSavedPet,
    userUnsavedPet,
  } = useAuthContext()

  const {
    // deletePet,
    updatingAdoptionStatus,
    addLike,
    returnPet,
  } = useSearchContext()

  const [status, setStatus] = useState(pet.adoptionStatus)
  useEffect(() => {
    setStatus(pet.adoptionStatus)
  }, [pet.adoptionStatus])

  const [heart, setHeart] = useState(petsUserLiked?.includes(pet.pet_id))
  const [save, setSave] = useState(petsUserSaved?.includes(pet.pet_id))
  const [justAdopted, setJustAdopted] = useState(false)
  const [justFostered, setJustFostered] = useState(false)

  const isAdoptedByCurrentUser =
    status === 'Adopted' && petsUserAdopted.includes(pet.pet_id)
  const isFosteredByCurrentUser =
    status === 'Fostered' && petsUserFostered.includes(pet.pet_id)
  const isFosteredByOthers =
    status === 'Fostered' && !petsUserFostered.includes(pet.pet_id)
  const isAdoptedByOthers = status === 'Adopted' && !isAdoptedByCurrentUser
  const isJustAdopted = status === 'Adopted' && justAdopted === true
  const isJustFoster = status === 'Fostered' && justFostered === true

  const handleLike = async () => {
    if (location !== 'search' && tab === 'liked') {
      setTimeout(() => {
        setCleanOfList(true)
      }, 300)
    }
    setIsLiked(!isLiked)
    setHeart(!heart)
    await userLikedPet(pet.pet_id, currentUser?.user?.user_id, location)
    await addLike(user_id, pet.pet_id)
  }

  // const handleDelete = async () => {
  //   await deletePet(pet.pet_id, currentUser?.user?.user_id)
  // }

  const handleSave = async () => {
    setSave(!save)
    await userSavedPet(user_id, pet.pet_id)
  }

  const handleUnsave = async () => {
    if (location !== 'search' && tab === 'saved') {
      setTimeout(() => {
        setCleanOfList(true)
      }, 300)
    }
    setSave(!save)
    await userUnsavedPet(user_id, pet.pet_id)
  }

  const handleAdoptionStatus = async (e) => {
    if (location !== 'search' && tab === 'fostered') {
      setTimeout(() => {
        setCleanOfList(true)
      }, 300)
    }
    if (e.target.textContent === 'Foster') {
      setJustFostered(true)
      setAdoptionStatus('Fostered')
      setStatus('Fostered')
      await updatingAdoptionStatus(user_id, pet.pet_id, 'Fostered')
    }
    if (e.target.textContent === 'Adopt') {
      setJustAdopted(true)
      setAdoptionStatus('Adopted')
      setStatus('Adopted')
      await updatingAdoptionStatus(user_id, pet.pet_id, 'Adopted')
    }
  }

  const handleReturn = async () => {
    if (location !== 'search' && tab === 'adopted') {
      setTimeout(() => {
        setCleanOfList(true)
      }, 300)
    }
    setAdoptionStatus('Available')
    setStatus('Available')
    await returnPet(user_id, pet.pet_id, pet.adoptionStatus)
  }
  const [isLiked, setIsLiked] = useState(
    userInfoLikes && userInfoLikes.some((users) => users.user_id === user_id),
  )

  return (
    <Flex flexDir="column" width="100%">
      <Flex w="100%" wrap="wrap" justify="start" gap={2}>
        <PetButtonsSaveLike
          color={heart ? '#f78991' : ''}
          icon={heart ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          action={handleLike}
        />
        <PetButtonsSaveLike
          label={save ? 'Unsave' : 'Save'}
          icon={save ? <BookmarkIcon /> : <TurnedInNotIcon />}
          action={save ? handleUnsave : handleSave}
        />
      </Flex>
      <Flex>
        <Tooltip hasArrow label={userNames({ users: userInfoLikes })}>
          <Text>
            <PetLikesText isLiked={heart} userInfoLikes={userInfoLikes} />
          </Text>
        </Tooltip>
      </Flex>

      <Flex w="100%">
        {status === 'Available' && (
          <>
            <PetButtonStatus
              label="Adopt"
              mr={2}
              onClick={handleAdoptionStatus}
            />
            <PetButtonStatus
              label="Foster"
              ml={2}
              onClick={handleAdoptionStatus}
            />
          </>
        )}
        {isFosteredByCurrentUser && (
          <>
            <PetButtonStatus
              label="Adopt"
              mr={2}
              onClick={handleAdoptionStatus}
            />
            <PetButtonStatus label="Return" ml={2} onClick={handleReturn} />
          </>
        )}
        {isAdoptedByCurrentUser && (
          <PetButtonStatus label="Return" onClick={handleReturn} />
        )}
        {isFosteredByOthers && (
          <>
            <PetButtonStatus
              label="Adopt"
              mr={2}
              onClick={handleAdoptionStatus}
            />
            <PetButtonStatus
              display={isJustFoster ? '' : 'none'}
              label="Return"
              ml={2}
              onClick={handleReturn}
            />
          </>
        )}
        {isAdoptedByOthers && (
          <>
            <PetButtonStatus
              label="Adopt"
              mr={2}
              onClick={handleAdoptionStatus}
              isDisabled={true}
              display={!isJustAdopted ? '' : 'none'}
            />
            <PetButtonStatus
              label="Foster"
              ml={2}
              onClick={handleAdoptionStatus}
              isDisabled={true}
              display={!isJustAdopted ? '' : 'none'}
            />
            <PetButtonStatus
              label="Return"
              ml={2}
              onClick={handleReturn}
              display={isJustAdopted ? '' : 'none'}
            />
          </>
        )}
      </Flex>
    </Flex>
  )
}
