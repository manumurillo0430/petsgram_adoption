import { createContext, useContext, useEffect, useState } from 'react'
import { DeleteReq, GetReq, GetReqQuery, PostReq } from '../utils/api'
import { Outlet } from 'react-router-dom'
import { useAuthContext } from './AuthContext'

const SearchContext = createContext({
  typeFilter: 'Type',
  adpotionStatusFilter: 'Adoption Status',
  isLoadingPetList: true,
  usersLikes: [],
  petsArray: [],
  filterSelection: {},
  advancedSearch: false,
  setAdpotionStatusFilter: () => {},
  setTypeFilter: () => {},
  setFilterSelection: () => {},
  getAllPets: () => {},
  getFilteredPetsByCriteria: () => {},
  toggleAdvancedSearch: () => {},
  deletePet: () => {},
  updatingAdoptionStatus: () => {},
  returnPet: () => {},
  addLike: () => {},
  getUserLikes: () => {},
})

function SearchProvider() {
  const { currentUser } = useAuthContext()
  const [petsArray, setPetsArray] = useState([])
  const [isLoadingPetList, setIsLoadingPetList] = useState(true)
  const [advancedSearch, setAdvancedSearch] = useState(true)
  const [typeFilter, setTypeFilter] = useState('Type')
  const [adpotionStatusFilter, setAdpotionStatusFilter] = useState(
    'Adoption Status',
  )
  const [usersLikes, setUsersLikes] = useState([])
  const [filterSelection, setFilterSelection] = useState({
    type: '',
    name: '',
    adoptionStatus: '',
    minHeight: '',
    maxHeight: '',
    minWeight: '',
    maxWeight: '',
  })

  useEffect(() => {
    const awaitGetPets = async () => await getAllPets()
    awaitGetPets()
  }, [])

  useEffect(() => {
    const awaiToggleAdvancedSearch = () => toggleAdvancedSearch()
    awaiToggleAdvancedSearch()
  }, [])

  useEffect(() => {
    const awaitGetUserLikes = async () => await getUserLikes()
    awaitGetUserLikes()
  }, [])

  useEffect(() => {
    const awaitGetFilteredPetsByCriteria = async () =>
      await getFilteredPetsByCriteria()
    awaitGetFilteredPetsByCriteria()
  }, [])

  const getAllPets = async () => {
    try {
      const res = await GetReq(`/pet`)
      if (res.ok) {
        setIsLoadingPetList(false)
        setPetsArray(res.pets)
        return res.pets
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getUserLikes = async () => {
    try {
      const res = await GetReq('/')
      if (res) {
        setUsersLikes(res.user_likes)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getFilteredPetsByCriteria = async (userFilterSelection) => {
    try {
      const res = await GetReqQuery('/pet/userSearch', userFilterSelection)
      if (res) {
        setIsLoadingPetList({})
        setIsLoadingPetList(false)
        setPetsArray(res)
      }
    } catch (error) {
      setPetsArray(error)
    }
  }

  const toggleAdvancedSearch = () => {
    setAdvancedSearch(!advancedSearch)
    setAdpotionStatusFilter('Adoption Status')
    setTypeFilter('Type')
    setFilterSelection({ type: '', adoptionStatus: '' })
    if (
      filterSelection.adoptionStatus === 'Adoption Status' ||
      filterSelection.adoptionStatus === 'Any'
    ) {
      setFilterSelection({ ...filterSelection, adoptionStatus: '' })
    }
    if (filterSelection.type === 'Type' || filterSelection.type === 'Any')
      filterSelection.type = ''
  }

  const updatingAdoptionStatus = async (user_id, pet_id, adoptionStatus) => {
    try {
      const res = await PostReq(`/pet/adoptionStatus`, {
        user_id,
        pet_id,
        adoptionStatus,
      })
      if (res.ok) {
        if (adoptionStatus === 'Fostered') {
          currentUser.pets.fostered = res.myFosteredPetsIds
        }
        if (adoptionStatus === 'Adopted') {
          currentUser.pets.adopted = res.myAdoptedPetsIds
        }
      }
    } catch (error) {}
  }

  const returnPet = async (user_id, pet_id, adoptionStatus) => {
    console.log(user_id, pet_id, adoptionStatus)
    try {
      const res = await DeleteReq('/pet/return', {
        user_id: user_id,
        pet_id: pet_id,
        adoptionStatus: adoptionStatus,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const addLike = async (user_id, pet_id) => {
    try {
      const res = await PostReq(`/pet/like/`, {
        user_id: user_id,
        pet_id: pet_id,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const deletePet = async (pet_id) => {
    try {
      const res = await DeleteReq(`/pet/delete`, { pet_id: pet_id })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SearchContext.Provider
      value={{
        typeFilter,
        adpotionStatusFilter,
        usersLikes,
        petsArray,
        isLoadingPetList,
        advancedSearch,
        filterSelection,
        getUserLikes,
        deletePet,
        setAdpotionStatusFilter,
        setTypeFilter,
        setFilterSelection,
        getAllPets,
        getFilteredPetsByCriteria,
        toggleAdvancedSearch,
        addLike,
        updatingAdoptionStatus,
        returnPet,
        setUsersLikes,
      }}
    >
      <Outlet />
    </SearchContext.Provider>
  )
}

export const useSearchContext = () => useContext(SearchContext)

export default SearchProvider
