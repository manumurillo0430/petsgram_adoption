import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

export default function PrivateRouteUser({ children }) {
  const { isActiveSession } = useAuthContext()
  console.log('isActiveSession', isActiveSession) // add this line for debugging
  if (!isActiveSession) return <Navigate to="/" replace />
  else return children
}
