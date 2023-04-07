import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

export default function PrivateRouteUser({ children }) {
  const { isActiveSession } = useAuthContext()
  const userAuth = localStorage.getItem('userAuth')
  const isAuthenticated =
    isActiveSession || (userAuth && JSON.parse(userAuth).isActiveSession)

  if (!isAuthenticated) return <Navigate to="/" replace />
  else return children
}
