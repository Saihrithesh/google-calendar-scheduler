import { useEffect, useState } from 'react'
import api from '../../api/axios'
import { useNavigate } from 'react-router-dom'

export default function Me() {
  const [me, setMe] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/auth/me').then(res => setMe(res.data))
  }, [])

  if (!me) return null

  const goDashboard = () => {
    if (me.role === 'ADMIN') {
      navigate('/dashboard/admin')
    } else {
      navigate('/dashboard/user')
    }
  }

  return (
    <div className="card">
      <h3>{me.email}</h3>
      <p>Role: {me.role}</p>
      <button className="primary" onClick={goDashboard}>
        Go to Dashboard
      </button>
    </div>
  )
}
