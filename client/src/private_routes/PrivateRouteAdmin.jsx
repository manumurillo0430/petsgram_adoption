import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

export default function PrivateRouteAdmin({ children }) {
  const { currentUser } = useAuthContext()
  console.log(currentUser.role, 'role')
  if (currentUser.role !== 1) {
    return <Navigate to="/" replace />
  } else {
    return children
  }
}
