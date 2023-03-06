import { createContext, useContext, useEffect, useState, useReducer } from 'react'
import { DeleteReq, GetReq } from '../utils/api'
import { PutReq } from '../utils/api'

const AuthContext = createContext({
    isLoading: true,
    isActiveSession: false,
    currentUser: {},
    petsUserSaved: [],
    petsUserAdopted: [],
    petsUserFostered: [],
    petsUserLiked: [],
    verifyUser: () => {},
    getCurrentUser: () => {},
    userLikedPet: () => {},
    userSavedPet: () => {},
    userUnsavedPet: () => {},
    getPetsUserLiked: () => {},
    getPetsUserSaved: () => {},
})

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({})
    const [petsUserAdopted, setPetsUserAdopted] = useState([])
    const [petsUserFostered, setPetsUserFostered] = useState([])
    const [petsUserLiked, setPetsUserLiked] = useState([])
    const [petsUserSaved, setPetsUserSaved] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isActiveSession, setIsActiveSession] = useState(false)
    const [user_id, setUser_id] = useState(undefined)

    useEffect(() => {
        const awaitVerifyUser = async () => await verifyUser()
        awaitVerifyUser() // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const awaitGetCurrentUser = async () => {
            try {
                const res = await GetReq(`/user/${user_id}`)
                if (res) {
                    setCurrentUser(res.user)
                    setPetsUserAdopted(res.pets.adopted)
                    setPetsUserFostered(res.pets.fostered)
                    setPetsUserSaved(res.pets.saved)
                    setPetsUserLiked(res.pets.liked)
                    setIsActiveSession(true)
                }
            } catch (error) {
                console.log(error)
            }
            setIsLoading(false)
        }
        if (user_id) {
            awaitGetCurrentUser(user_id)
        }
    }, [user_id])

    const verifyUser = async () => {
        try {
            const res = await GetReq('')
            console.log(res)
            if (res.ok) setUser_id(res.user_id)
        } catch (error) {
            if (error.response.status === 401) {
                setIsActiveSession(false)
            } else console.log(error)
        }
    }
    const getCurrentUser = async (user_id) => {
        try {
            const res = await GetReq(`/user/${user_id}`)
            if (res) {
                setCurrentUser(res.user)
                setPetsUserAdopted(res.pets.adopted)
                setPetsUserFostered(res.pets.fostered)
                setPetsUserSaved(res.pets.saved)
                setPetsUserLiked(res.pets.liked)
                setIsActiveSession(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const userLikedPet = async (pet_id, user_id) => {
        try {
            const res = await PutReq(`/user/like/${user_id}`, { pet_id })
            if (res) {
                setPetsUserLiked(res.likesUpdated)
                console.log(petsUserLiked)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getPetsUserLiked = async (user_id) => {
        try {
            const res = await GetReq(`/user/likes/${user_id}`)
            if (res) {
                setPetsUserLiked(res.likesUpdated)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const userSavedPet = async (user_id, pet_id) => {
        try {
            const res = await PutReq(`/user/save/${user_id}`, { pet_id })
            console.log(res)
            if (res) {
                setPetsUserSaved(res.savedPetsIdsListUpdated)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getPetsUserSaved = async (user_id) => {
        try {
            const res = await GetReq(`/user/save/${user_id}`)
            console.log(res)
            if (res) {
                setPetsUserSaved(res.savedPets)
            }
        } catch (error) {}
    }
    const userUnsavedPet = async (user_id, pet_id) => {
        try {
            const res = await DeleteReq(`/user/unsave/${user_id}`, { pet_id })
            console.log(res)
            if (res) {
                getCurrentUser(user_id)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const clearCurrentUser = async () => {
        setCurrentUser({})
        setIsActiveSession(false)
    }

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                user_id,
                isLoading,
                isActiveSession,
                petsUserAdopted,
                petsUserFostered,
                petsUserLiked,
                petsUserSaved,
                verifyUser,
                clearCurrentUser,
                getCurrentUser,
                userLikedPet,
                userSavedPet,
                userUnsavedPet,
                getPetsUserLiked,
                getPetsUserSaved,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)

export default AuthProvider
