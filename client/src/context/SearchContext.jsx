import { createContext, useContext, useEffect, useState, useReducer } from 'react'
import { DeleteReq, GetReq, GetReqQuery, PostReq, PutReq } from '../utils/api'
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
    const [petsArray, setPetsArray] = useState({})
    const [isLoadingPetList, setIsLoadingPetList] = useState(true)
    const [advancedSearch, setAdvancedSearch] = useState(true)
    const [typeFilter, setTypeFilter] = useState('Type')
    const [adpotionStatusFilter, setAdpotionStatusFilter] = useState('Adoption Status')
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
        const awaitGetFilteredPetsByCriteria = async () => await getFilteredPetsByCriteria()
        awaitGetFilteredPetsByCriteria()
    }, [])

    const getAllPets = async () => {
        try {
            const res = await GetReq(`/pet`)
            if (res) {
                setIsLoadingPetList(false)
                setPetsArray(res)
                return res
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getUserLikes = async () => {
        try {
            console.log('hols')
            const res = await GetReq('/')
            console.log(res, res.user_likes)
            if (res) {
                setUsersLikes(res.user_likes)
                console.log(usersLikes)
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
        if (filterSelection.adoptionStatus === 'Adoption Status' || filterSelection.adoptionStatus === 'Any') {
            setFilterSelection({ ...filterSelection, adoptionStatus: '' })
        }
        if (filterSelection.type === 'Type' || filterSelection.type === 'Any') filterSelection.type = ''
    }

    const updatingAdoptionStatus = async (user_id, pet_id, adoptionStatus) => {
        try {
            const res = await PostReq(`/pet/adoptionStatus`, { user_id, pet_id, adoptionStatus })
            console.log(res)
            if (res) {
                if (adoptionStatus === 'Fostered') {
                    currentUser.pets.fostered = res.myFosteredPetsIds
                }
                if (adoptionStatus === 'Adopted') {
                    currentUser.pets.adopted = res.myAdoptedPetsIds
                }
            }
        } catch (error) {}
    }
    // /pet/users/:user_id

    const returnPet = async (user_id, pet_id, adoptionStatus) => {
        console.log("I'm about to send the request to the back-end")
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
        console.log("I'm about to send the request to the back-end")
        try {
            const res = await PostReq(`/pet/like/`, { user_id: user_id, pet_id: pet_id })
            if (res) {
                console.log(res)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deletePet = async (pet_id) => {
        console.log(pet_id)
        try {
            const res = await DeleteReq(`/pet/${pet_id}/save`, { pet_id: pet_id })
            if (res) {
            }
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
