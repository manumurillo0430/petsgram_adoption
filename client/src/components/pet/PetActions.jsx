import React, { useState, useEffect } from 'react'
import {
  Text,
  Flex,
  Tooltip,
  Spinner,
  useDisclosure,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot'
import { useSearchContext } from '../../context/SearchContext'
import { useAuthContext } from '../../context/AuthContext'
import FavoriteIcon from '@mui/icons-material/Favorite'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import { userNames } from '../../utils/globals'
import PetButtonStatus from './PetButtonStatus'
import PetButtonsSaveLike from './PetButtonsSaveLike'
import LikesInfoModal from './LikesInfoModal'
import PetLikesText from './PetLikesText'
import './PetCardGrid.css'

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

  const [status, setStatus] = useState(pet?.adoptionStatus)
  useEffect(() => {
    setStatus(pet?.adoptionStatus)
  }, [pet?.adoptionStatus])

  const [heart, setHeart] = useState(petsUserLiked?.includes(pet?.pet_id))
  const [save, setSave] = useState(petsUserSaved?.includes(pet?.pet_id))
  const [justAdopted, setJustAdopted] = useState(false)
  const [justFostered, setJustFostered] = useState(false)
  const [adopting, setAdopting] = useState(false)
  const [fostering, setFostering] = useState(false)
  const [returning, setReturning] = useState(false)

  const isAdoptedByCurrentUser =
    status === 'Adopted' && petsUserAdopted.includes(pet?.pet_id)
  const isFosteredByCurrentUser =
    status === 'Fostered' && petsUserFostered.includes(pet?.pet_id)
  const isFosteredByOthers =
    status === 'Fostered' && !petsUserFostered.includes(pet?.pet_id)
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
    await userLikedPet(pet?.pet_id, currentUser?.user?.user_id, location)
    await addLike(user_id, pet?.pet_id)
  }

  // const handleDelete = async () => {
  //   await deletePet(pet.pet_id, currentUser?.user?.user_id)
  // }

  const handleSave = async () => {
    setSave(!save)
    await userSavedPet(user_id, pet?.pet_id)
  }

  const handleUnsave = async () => {
    if (location !== 'search' && tab === 'saved') {
      setTimeout(() => {
        setCleanOfList(true)
      }, 300)
    }
    setSave(!save)
    await userUnsavedPet(user_id, pet?.pet_id)
  }

  const handleAdoptionStatus = async (e) => {
    if (location !== 'search' && tab === 'fostered') {
      setTimeout(() => {
        setCleanOfList(true)
      }, 300)
    }
    if (e.target.textContent === 'Foster') {
      setFostering(true)
      await updatingAdoptionStatus(user_id, pet?.pet_id, 'Fostered')
      setFostering(false)
      setJustFostered(true)
      setAdoptionStatus('Fostered')
      setStatus('Fostered')
    }
    if (e.target.textContent === 'Adopt') {
      setAdopting(true)
      await updatingAdoptionStatus(user_id, pet?.pet_id, 'Adopted')
      setAdopting(false)
      setJustAdopted(true)
      setAdoptionStatus('Adopted')
      setStatus('Adopted')
    }
  }

  const handleReturn = async () => {
    if (location !== 'search' && tab === 'adopted') {
      setTimeout(() => {
        setCleanOfList(true)
      }, 300)
    }
    setReturning(true)
    await returnPet(user_id, pet?.pet_id, pet?.adoptionStatus)
    setReturning(false)
    setAdoptionStatus('Available')
    setStatus('Available')
  }
  const [isLiked, setIsLiked] = useState(
    userInfoLikes && userInfoLikes?.some((users) => users?.user_id === user_id),
  )
  const { isOpen, onToggle } = useDisclosure()
  const toggleModal = () => onToggle()

  const theme = useColorModeValue('dark', 'light')

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
          <Link
            color={theme === 'dark' ? 'black' : 'white'}
            onClick={toggleModal}
          >
            <Text>
              <PetLikesText isLiked={heart} userInfoLikes={userInfoLikes} />
            </Text>
          </Link>
        </Tooltip>
      </Flex>
      <LikesInfoModal
        isOpen={isOpen}
        toggleModal={toggleModal}
        userInfoLikes={userInfoLikes}
      />

      <Flex w="100%">
        {status === 'Available' && (
          <>
            <PetButtonStatus
              label={!adopting ? 'Adopt' : <Spinner />}
              mr={2}
              onClick={handleAdoptionStatus}
              isDisabled={!fostering ? false : true}
            />
            <PetButtonStatus
              label={!fostering ? 'Foster' : <Spinner />}
              ml={2}
              onClick={handleAdoptionStatus}
              isDisabled={!adopting ? false : true}
            />
          </>
        )}
        {isFosteredByCurrentUser && (
          <>
            <PetButtonStatus
              label={!adopting ? 'Adopt' : <Spinner />}
              mr={2}
              onClick={handleAdoptionStatus}
              isDisabled={!returning ? false : true}
            />
            <PetButtonStatus
              label={!returning ? 'Return' : <Spinner />}
              ml={2}
              onClick={handleReturn}
              isDisabled={!adopting ? false : true}
            />
          </>
        )}
        {isAdoptedByCurrentUser && (
          <PetButtonStatus
            label={!returning ? 'Return' : <Spinner />}
            onClick={handleReturn}
          />
        )}
        {isFosteredByOthers && (
          <>
            <PetButtonStatus
              label={!adopting ? 'Adopt' : <Spinner />}
              isDisabled={!returning ? false : true}
              mr={2}
              onClick={handleAdoptionStatus}
            />
            <PetButtonStatus
              display={isJustFoster ? '' : 'none'}
              label={!returning ? 'Return' : <Spinner />}
              isDisabled={!adopting ? false : true}
              ml={2}
              onClick={handleReturn}
            />
          </>
        )}
        {isAdoptedByOthers && (
          <>
            <PetButtonStatus
              label={!adopting ? 'Adopt' : <Spinner />}
              mr={2}
              onClick={handleAdoptionStatus}
              isDisabled={true}
              display={!isJustAdopted ? '' : 'none'}
            />
            <PetButtonStatus
              label={!fostering ? 'Foster' : <Spinner />}
              ml={2}
              onClick={handleAdoptionStatus}
              isDisabled={true}
              display={!isJustAdopted ? '' : 'none'}
            />
            <PetButtonStatus
              label={!returning ? 'Return' : <Spinner />}
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
