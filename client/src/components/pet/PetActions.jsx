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
import { useSearchContext } from '../../context/SearchContext'
import { useAuthContext } from '../../context/AuthContext'
import { userNames } from '../../utils/globals'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot'
import FavoriteIcon from '@mui/icons-material/Favorite'
import BookmarkIcon from '@mui/icons-material/Bookmark'
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
    setPetsUserAdopted,
    setPetsUserSaved,
    setPetsUserLiked,
    setPetsUserFostered,
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

  const [heart, setHeart] = useState(
    petsUserLiked?.some((likedPet) => likedPet.pet_id === pet?.pet_id),
  )
  const [save, setSave] = useState(
    petsUserSaved?.some((savedPet) => savedPet.pet_id === pet?.pet_id),
  )
  const [justAdopted, setJustAdopted] = useState(false)
  const [justFostered, setJustFostered] = useState(false)
  const [adopting, setAdopting] = useState(false)
  const [fostering, setFostering] = useState(false)
  const [returning, setReturning] = useState(false)

  const isAdoptedByCurrentUser =
    status === 'Adopted' &&
    petsUserAdopted.some((adoptedPet) => adoptedPet.pet_id === pet?.pet_id)
  const isFosteredByCurrentUser =
    status === 'Fostered' &&
    petsUserFostered.some((fosteredPet) => fosteredPet.pet_id === pet?.pet_id)

  const isFosteredByOthers =
    status === 'Fostered' &&
    !petsUserFostered.some((fosteredPet) => fosteredPet.pet_id === pet?.pet_id)

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
    if (!heart) {
      setPetsUserLiked([...petsUserLiked, pet])
    }
    await userLikedPet(pet?.pet_id, currentUser?.user?.user_id, location)
    await addLike(user_id, pet?.pet_id)
  }

  // const handleDelete = async () => {
  //   await deletePet(pet.pet_id, currentUser?.user?.user_id)
  // }

  const handleSave = async () => {
    setSave(!save)
    await userSavedPet(user_id, pet?.pet_id)
    setPetsUserSaved([...petsUserSaved, pet])
  }

  const handleUnsave = async () => {
    if (location !== 'search' && tab === 'saved') {
      setTimeout(() => {
        setCleanOfList(true)
      }, 300)
    }
    setSave(!save)
    await userUnsavedPet(user_id, pet?.pet_id)
    const updatedPetsUserFostered = petsUserSaved.filter(
      (savedPet) => savedPet.pet_id !== pet?.pet_id,
    )
    setPetsUserSaved(updatedPetsUserFostered)
  }

  const handleAdoptionStatus = async (e) => {
    if (location !== 'search' && tab === 'fostered') {
      setTimeout(() => {
        setCleanOfList(true)
      }, 300)
    }
    if (e.target.textContent === 'Foster') {
      setFostering(true)
      const fostering = await updatingAdoptionStatus(
        user_id,
        pet?.pet_id,
        'Fostered',
      )
      setFostering(false)
      setJustFostered(true)
      setAdoptionStatus('Fostered')
      setStatus('Fostered')
      setPetsUserFostered([...petsUserFostered, fostering?.pet])
    }
    if (e.target.textContent === 'Adopt') {
      setAdopting(true)
      const adopting = await updatingAdoptionStatus(
        user_id,
        pet?.pet_id,
        'Adopted',
      )
      setAdopting(false)
      setJustAdopted(true)
      setAdoptionStatus('Adopted')
      setStatus('Adopted')
      setPetsUserAdopted([...petsUserAdopted, adopting?.pet])
    }
  }

  const handleReturn = async () => {
    if (location !== 'search' && tab === 'adopted') {
      setTimeout(() => {
        setCleanOfList(true)
      }, 300)
    }
    setReturning(true)
    await returnPet(user_id, pet?.pet_id, status)
    setReturning(false)
    setAdoptionStatus('Available')
    setStatus('Available')
    if (status === 'Adopted') {
      const updatedPetsUserAdopted = petsUserAdopted.filter(
        (adoptedPet) => adoptedPet.pet_id !== pet?.pet_id,
      )
      setPetsUserAdopted(updatedPetsUserAdopted)
    } else if (status === 'Fostered') {
      const updatedPetsUserFostered = petsUserFostered.filter(
        (fosteredPet) => fosteredPet.pet_id !== pet?.pet_id,
      )
      setPetsUserFostered(updatedPetsUserFostered)
    }
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
