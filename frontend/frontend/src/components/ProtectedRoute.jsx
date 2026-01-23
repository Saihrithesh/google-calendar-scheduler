import { Navigate, Outlet } from 'react-router-dom'
import { getToken, getUserFromToken } from '../utils/auth'

export default function ProtectedRoute({ role, children }) {
  const token = getToken()
  const user = getUserFromToken()

  if (!token || !user) {
    return <Navigate to="/login" replace />
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />
  }

  return children ? children : <Outlet />
}
