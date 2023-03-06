import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
export default function PrivateRouteUser({ children }) {
  const { isActiveSession, user_id } = useAuthContext()
  console.log(isActiveSession, typeof user_id, 'isActiveSession')

  if (typeof user_id !== 'number') {
    console.log(typeof user_id)
    return <Navigate to="/" replace />
  } else return children
}
