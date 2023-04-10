import React from 'react'
import { Navigate } from 'react-router-dom'

export default function PrivateRouteUser({ children }) {
  const jsonUserAuth = localStorage.getItem('userAuth')
  const userAuth = JSON.parse(jsonUserAuth)

  if (!userAuth?.user_id) return <Navigate to="/" replace />
  else return children
}
