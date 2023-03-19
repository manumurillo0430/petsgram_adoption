import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

export default function PrivateRouteAdmin({ children }) {
  const { isActiveSession } = useAuthContext()
  console.log(isActiveSession)

  if (!isActiveSession) {
    return <Navigate to="/" replace />
  } else {
    return children
  }
}
