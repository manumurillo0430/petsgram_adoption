import { Navigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../context/AuthContext'
export default function PrivateRouteUser({ children }) {
  const { isActiveSession } = useAuthContext()

  if (!isActiveSession) return <Navigate to="/" replace />
  else return children
}
