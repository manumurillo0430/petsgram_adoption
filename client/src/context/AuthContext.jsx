import { createContext, useContext, useEffect, useState } from 'react'
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
  petsRequested: [],
  setPetsRequested: () => {},
  setIsActiveSession: () => {},
  setPetsUserAdopted: () => {},
  setPetsUserLiked: () => {},
  setPetsUserSaved: () => {},
  setPetsUserFostered: () => {},
  verifyUser: () => {},
  getCurrentUser: () => {},
  userLikedPet: () => {},
  userSavedPet: () => {},
  userUnsavedPet: () => {},
  getPetsUserLiked: () => {},
  getPetsUserSaved: () => {},
  getUserById: () => {},
})

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({})
  const [petsUserAdopted, setPetsUserAdopted] = useState([])
  const [petsUserFostered, setPetsUserFostered] = useState([])
  const [petsUserLiked, setPetsUserLiked] = useState([])
  const [petsUserSaved, setPetsUserSaved] = useState([])
  const [petsRequested, setPetsRequested] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isActiveSession, setIsActiveSession] = useState(false)
  const [user_id, setUser_id] = useState()

  useEffect(() => {
    const awaitGetCurrentUser = async () => {
      try {
        const res = await GetReq(`/user/${user_id}`)
        if (res.ok) {
          localStorage.setItem('userRole', res.user.role)
          setIsActiveSession(true)
          setIsLoading(false)
          setCurrentUser(res.user)
          setPetsUserAdopted(res.pets.adopted)
          setPetsUserFostered(res.pets.fostered)
          setPetsUserSaved(res.pets.saved)
          setPetsUserLiked(res.pets.liked)
          setPetsRequested(res.pets.requested)
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

  useEffect(() => {
    const checkUserAuth = async () => {
      await verifyUser()
    }
    checkUserAuth()
  }, [])

  const verifyUser = async () => {
    try {
      const res = await GetReq('')
      if (res.ok) {
        setIsActiveSession(true)
        setUser_id(res.user_id)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const userAuth = localStorage.getItem('userAuth')
    if (userAuth) {
      const { user_id, isActiveSession } = JSON.parse(userAuth)
      setIsActiveSession(isActiveSession)
      setUser_id(user_id)
    }
  }, [])

  const getCurrentUser = async (user_id) => {
    try {
      const res = await GetReq(`/user/${user_id}`)
      if (res) {
        localStorage.setItem('userRole', res.user.role)
        setCurrentUser(res.user)
        setPetsUserAdopted(res.pets.adopted)
        setPetsUserFostered(res.pets.fostered)
        setPetsUserSaved(res.pets.saved)
        setPetsUserLiked(res.pets.liked)
        setPetsRequested(res.pets.requested)
        setIsActiveSession(true)
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  const getUserById = async (user_id) => {
    try {
      const res = await GetReq(`/user/${user_id}`)
      if (res.ok) {
        return res
      }
    } catch (error) {
      console.log(error)
    }
  }

  const userLikedPet = async (pet_id, user_id) => {
    try {
      const res = await PutReq(`/user/like/${user_id}`, { pet_id })
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
      if (res) {
        setPetsUserSaved(res.savedPets)
      }
    } catch (error) {}
  }
  const userUnsavedPet = async (user_id, pet_id) => {
    try {
      const res = await DeleteReq(`/user/unsave/${user_id}`, { pet_id })
      if (res) {
        getCurrentUser(user_id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const clearCurrentUser = async () => {
    localStorage.removeItem('userAuth')
    localStorage.removeItem('userRole')
    setCurrentUser({})
    setIsActiveSession(false)
  }
  return (
    <AuthContext.Provider
      value={{
        isActiveSession,
        currentUser,
        user_id,
        isLoading,
        petsUserAdopted,
        petsUserFostered,
        petsUserLiked,
        petsUserSaved,
        petsRequested,
        setIsActiveSession,
        setPetsRequested,
        setPetsUserAdopted,
        setPetsUserLiked,
        setPetsUserSaved,
        setPetsUserFostered,
        verifyUser,
        clearCurrentUser,
        getCurrentUser,
        userLikedPet,
        userSavedPet,
        userUnsavedPet,
        getPetsUserLiked,
        getPetsUserSaved,
        getUserById,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)

export default AuthProvider
