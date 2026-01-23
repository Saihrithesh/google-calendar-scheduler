import { jwtDecode } from 'jwt-decode'

export const getToken = () => {
  return localStorage.getItem('token')
}

export const getUserFromToken = () => {
  const token = getToken()
  if (!token) return null

  try {
    const decoded = jwtDecode(token)

    // 🔥 NORMALIZE ROLE HERE (IMPORTANT)
    return {
      ...decoded,
      role: decoded.role?.toUpperCase(),
    }
  } catch (err) {
    console.error('Invalid token', err)
    return null
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  window.location.href = '/'
}
