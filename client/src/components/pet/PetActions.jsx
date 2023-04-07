import React, { useState, useEffect } from 'react'
import { Text, Flex, Tooltip, Spinner, Button } from '@chakra-ui/react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot'
import { useSearchContext } from '../../context/SearchContext'
import { useAuthContext } from '../../context/AuthContext'
import FavoriteIcon from '@mui/icons-material/Favorite'
import BookmarkIcon from '@mui/icons-material/Bookmark'

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
    deletePet,
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
  const [adopt, setAdopt] = useState(false)
  const [likesCounterText, setLikesCounterText] = useState(false)

  const isAdoptedByCurrentUser =
    status === 'Adopted' && petsUserAdopted.includes(pet.pet_id)
  const isFosteredByCurrentUser =
    status === 'Fostered' && petsUserFostered.includes(pet.pet_id)
  const isFosteredByOthers =
    status === 'Fostered' && !petsUserFostered.includes(pet.pet_id)
  const isAdoptedByOthers = status === 'Adopted' && !isAdoptedByCurrentUser

  const handleLike = async () => {
    setLikesCounterText(true)
    console.log(likesCounterText, 'likecounter')
    if (location !== 'search' && tab === 'liked') {
      setTimeout(() => {
        setCleanOfList(true)
      }, 400)
    }
    // console.log(pet)
    // console.log(pet.pet_id)
    setIsLiked(!isLiked)
    setHeart(!heart)
    await userLikedPet(pet.pet_id, currentUser?.user?.user_id, location)
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
    if (location !== 'search' && tab === 'saved') {
      setTimeout(() => {
        setCleanOfList(true)
      }, 400)
    }
    setSave(!save)
    await userUnsavedPet(currentUser?.user_id, pet.pet_id)
  }

  const handleAdoptionStatus = async (e) => {
    if (location !== 'search' && tab === 'fostered') {
      setTimeout(() => {
        setCleanOfList(true)
      }, 400)
    }
    if (e.target.textContent === 'Foster') {
      setAdoptionStatus('Fostered')
      setStatus('Fostered')
      await updatingAdoptionStatus(currentUser?.user_id, pet.pet_id, 'Fostered')
    }
    if (e.target.textContent == 'Adopt') {
      setAdopt(true)
      setAdoptionStatus('Adopted')
      setStatus('Adopted')
      await updatingAdoptionStatus(currentUser?.user_id, pet.pet_id, 'Adopted')
    }
  }

  const handleReturn = async () => {
    if (location !== 'search' && tab === 'adopted') {
      setTimeout(() => {
        setCleanOfList(true)
      }, 400)
    }
    setAdoptionStatus('Available')
    setStatus('Available')
    await returnPet(currentUser?.user_id, pet.pet_id, pet.adoptionStatus)
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
        <PetLikesText isLiked={isLiked} userInfoLikes={userInfoLikes} />
      </Flex>

      <Flex w="100%">
        {status === 'Available' && (
          <>
            <PetButtonStatus label="Adopt" onClick={handleAdoptionStatus} />
            <PetButtonStatus label="Foster" onClick={handleAdoptionStatus} />
          </>
        )}
        {isFosteredByCurrentUser && (
          <>
            <PetButtonStatus label="Adopt" onClick={handleAdoptionStatus} />
            <PetButtonStatus label="Return" onClick={handleReturn} />
          </>
        )}
        {isAdoptedByCurrentUser && (
          <PetButtonStatus label="Return" onClick={handleReturn} />
        )}
        {adopt && <PetButtonStatus label="Return" onClick={handleReturn} />}
        {isFosteredByOthers && (
          <PetButtonStatus label="Adopt" onClick={handleAdoptionStatus} />
        )}
        {isAdoptedByOthers && !adopt && (
          <>
            <PetButtonStatus
              label="Adopt"
              onClick={handleAdoptionStatus}
              isDisabled={true}
            />
            <PetButtonStatus
              label="Foster"
              onClick={handleAdoptionStatus}
              isDisabled={true}
            />
          </>
        )}

        {/* <PetButtonStatus
          display={textLeftButton() === 0 ? 'none' : ''}
          label={textLeftButton()}
          isDisabled={
            pet.adoptionStatus === 'Adopted' &&
            petsUserAdopted.includes(pet.pet_id) === false
              ? true
              : false
          }
          onClick={handleAdoptionStatus}
          ml
          mr={2}
        />
        <PetButtonStatus
          display={textRightButton() === 0 ? 'none' : ''}
          label={textRightButton()}
          isDisabled={
            pet.adoptionStatus === 'Adopted' &&
            !petsUserAdopted.includes(pet.pet_id)
              ? true
              : false
          }
          onClick={handleAdoptionStatus}
        />
        <PetButtonStatus
          display={textBigButton() === 0 ? 'none' : ''}
          label={textBigButton()}
          isDisabled={
            pet.adoptionStatus === 'Adopted' &&
            !petsUserAdopted.includes(pet.pet_id)
              ? true
              : false
          }
          onClick={
            textBigButton() === 'Adopt' ? handleAdoptionStatus : handleReturn
          }
          ml={2}
        /> */}
        {/* 
        <Button flex="1" variant="ghost" onClick={handleDelete}>
          Delete
        </Button> */}
      </Flex>
    </Flex>
  )
}
