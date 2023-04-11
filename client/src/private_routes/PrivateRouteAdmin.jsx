import { Navigate } from 'react-router-dom'

export default function PrivateRouteAdmin({ children }) {
  const role = localStorage.getItem('userRole')

  if (!role) return <Navigate to="/" replace />
  else return children
}
