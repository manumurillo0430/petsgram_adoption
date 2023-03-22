import React, { useState } from 'react'
import { Text, Flex, Tooltip, Spinner, Button } from '@chakra-ui/react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot'
import { useSearchContext } from '../../context/SearchContext'
import { useAuthContext } from '../../context/AuthContext'
import FavoriteIcon from '@mui/icons-material/Favorite'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import PetButtonSM from './PetButtonsSaveLike'
import PetButtonStatus from './PetButtonStatus'
import { userLocation } from '../../utils/globals'
import './PetCardGrid.css'
import PetButtonsSaveLike from './PetButtonsSaveLike'

export default function PetActionsGrid({
  setCleanOfList,
  pet,
  status,
  tab,
  userInfoLikes,
  setAdoptionStatus,
}) {
  const {
    currentUser,
    user_id,
    isActiveSession,
    petsUserAdopted,
    petsUserFostered,
    petsUserLiked,
    petsUserSaved,
    setPetsUserAdopted,
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

  const [newAdoptionStatus, setNewAdoptionStatus] = useState(status)
  const [heart, setHeart] = useState(true)
  const [save, setSave] = useState(true)

  const handleLike = async () => {
    if (
      userLocation(window.location.pathname) !== 'search' &&
      tab === 'liked'
    ) {
      setTimeout(() => {
        setCleanOfList(true)
      }, 400)
    }
    setHeart(!heart)
    await userLikedPet(
      pet.pet_id,
      currentUser?.user?.user_id,
      userLocation(window.location.pathname),
    )
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
    if (
      userLocation(window.location.pathname) !== 'search' &&
      tab === 'saved'
    ) {
      setTimeout(() => {
        setCleanOfList(true)
      }, 400)
    }
    setSave(!save)
    await userUnsavedPet(currentUser?.user_id, pet.pet_id)
  }

  const handleAdoptionStatus = async (e) => {
    if (
      userLocation(window.location.pathname) !== 'search' &&
      tab === 'fostered'
    ) {
      setTimeout(() => {
        setCleanOfList(true)
      }, 400)
    }
    if (e.target.textContent === 'Foster') {
      setNewAdoptionStatus('Fostered')
      setAdoptionStatus('Fostered')
      await updatingAdoptionStatus(currentUser?.user_id, pet.pet_id, 'Fostered')
    }
    if (e.target.textContent == 'Adopt') {
      setPetsUserAdopted([...petsUserLiked, pet.pet_id])
      setNewAdoptionStatus('Adopted')
      setAdoptionStatus('Adopted')
      await updatingAdoptionStatus(currentUser?.user_id, pet.pet_id, 'Adopted')
    }
  }

  const handleReturn = async () => {
    if (
      userLocation(window.location.pathname) !== 'search' &&
      tab === 'adopted'
    ) {
      setTimeout(() => {
        setCleanOfList(true)
      }, 400)
    }
    setNewAdoptionStatus('Available')
    setAdoptionStatus('Available')
    await returnPet(currentUser?.user_id, pet.pet_id, status)
  }

  const isLiked =
    userInfoLikes && userInfoLikes.some((users) => users.user_id === user_id)

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
        {petsUserLiked !== 0 &&
        petsUserLiked?.includes(pet.pet_id) &&
        isActiveSession ? (
          <Tooltip label={heart ? 'Unlike' : 'Like'} placement="bottom">
            <PetButtonSM
              color={heart ? '#f78991' : ''}
              icon={heart ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              action={handleLike}
            />
          </Tooltip>
        ) : (
          <Tooltip label={!heart ? 'Unlike' : 'Like'} placement="bottom">
            <PetButtonsSaveLike
              color={!heart ? '#f78991' : ''}
              icon={!heart ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              action={handleLike}
            />
          </Tooltip>
        )}
        {petsUserSaved === 0 && isActiveSession && (
          <PetButtonsSaveLike
            label={save ? 'Unsave' : 'Save'}
            icon={<BookmarkIcon />}
            action={handleSave}
          />
        )}
        {petsUserSaved !== 0 &&
        petsUserSaved?.includes(pet.pet_id) &&
        isActiveSession ? (
          <PetButtonsSaveLike
            label={save ? 'Unsave' : 'Save'}
            icon={save ? <BookmarkIcon /> : <TurnedInNotIcon />}
            action={handleUnsave}
          />
        ) : (
          <PetButtonsSaveLike
            label={!save ? 'Unsave' : 'Save'}
            icon={!save ? <BookmarkIcon /> : <TurnedInNotIcon />}
            action={handleSave}
          />
        )}
      </Flex>
      <Flex>
        {userInfoLikes?.length === 1 && isLiked ? (
          <Text fontSize="0.83rem">
            <b>You</b> like this pet
          </Text>
        ) : (
          <Text
            display={!isLiked && userInfoLikes?.length > 0 ? ' ' : 'none'}
            fontSize="0.83rem"
          >
            {userInfoLikes?.length}&nbsp;
            {userInfoLikes?.length === 1 ? 'person likes' : 'people like'} this
            pet
          </Text>
        )}
        <Text
          display={isLiked && userInfoLikes?.length > 1 ? ' ' : 'none'}
          fontSize="0.83rem"
        >
          <b>You</b>&nbsp;
          {userInfoLikes?.length > 1 && isLiked
            ? `and ${userInfoLikes?.length - 1} more person like`
            : 'people like'}
          &nbsp;
          {userInfoLikes?.length === 1 ? 'person likes' : 'people like'} this
          pet
        </Text>
        {userInfoLikes?.length === 0 ||
          (userInfoLikes?.length === undefined && (
            <Text fontSize="0.83rem">
              <br />
            </Text>
          ))}
      </Flex>
      <Flex w="100%">
        {isActiveSession &&
          newAdoptionStatus === 'Adopted' &&
          petsUserAdopted.includes(pet.pet_id) === true && (
            <PetButtonStatus label="Return" onClick={handleReturn} />
          )}

        {isActiveSession &&
          newAdoptionStatus === 'Adopted' &&
          petsUserAdopted.includes(pet.pet_id) === false && (
            <Flex width="100%">
              <PetButtonStatus mr={2} ml={0} label="Adopt" isDisabled={true} />
              <PetButtonStatus mr={0} ml={2} label="Foster" isDisabled={true} />
            </Flex>
          )}
        {isActiveSession &&
          newAdoptionStatus === 'Fostered' &&
          petsUserFostered.includes(pet.pet_id) === true && (
            <Flex width="100%">
              <PetButtonStatus
                mr={2}
                ml={0}
                label="Adopt"
                labelTooltip={`Would you like to adopt ${pet.name}, who is currently available for adoption after being fostered?`}
                onClick={handleAdoptionStatus}
              />
              <PetButtonStatus
                mr={0}
                ml={2}
                label="Return"
                onClick={handleReturn}
              />
            </Flex>
          )}
        {isActiveSession &&
          newAdoptionStatus === 'Fostered' &&
          petsUserFostered.includes(pet.pet_id) === false && (
            <PetButtonStatus label="Adopt" onClick={handleAdoptionStatus} />
          )}

        {isActiveSession && newAdoptionStatus === 'Available' && (
          <>
            <PetButtonStatus
              mr={2}
              ml={0}
              label="Adopt"
              onClick={handleAdoptionStatus}
            />
            <PetButtonStatus
              mr={0}
              ml={2}
              label="Foster"
              onClick={handleAdoptionStatus}
            />
          </>
        )}
        {/* <Button flex="1" variant="ghost" onClick={handleDelete}>
          Delete
        </Button> */}
      </Flex>
    </Flex>
  )
}
