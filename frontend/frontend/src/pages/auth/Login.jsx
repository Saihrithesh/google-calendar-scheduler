import { useState } from 'react'
import api from '../../api/axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const login = async () => {
    if (!email || !password) {
      toast.error('Email and password required')
      return
    }

    try {
      setLoading(true)

      const res = await api.post('/auth/login', {
        email,
        password,
      })

      // 🔥 IMPORTANT: overwrite any old token
      localStorage.setItem('token', res.data.access_token)

      toast.success('Login successful')

      // ✅ ALWAYS go to /me
      navigate('/me', { replace: true })
    } catch (err) {
      toast.error(
        err.response?.data?.detail || 'Login failed'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <h2>Login</h2>

      <div className="form-group">
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <button
        className="primary"
        onClick={login}
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  )
}
