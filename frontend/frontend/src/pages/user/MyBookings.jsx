import { useEffect, useState } from 'react'
import api from '../../api/axios'
import toast from 'react-hot-toast'

export default function MyBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const loadBookings = async () => {
    try {
      setLoading(true)
      const res = await api.get('/bookings/my') // ✅ correct endpoint
      setBookings(res.data || [])
    } catch {
      toast.error('Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBookings()
  }, [])

  const cancel = async (id) => {
    try {
      await api.delete(`/bookings/${id}`)
      toast.success('Booking cancelled')

      // 🔥 instant UI update
      setBookings(prev => prev.filter(b => b.id !== id))
    } catch {
      toast.error('Cancel failed')
    }
  }

  return (
    <div className="card">
      <h3>My Bookings</h3>

      {loading && <p>Loading bookings...</p>}
      {!loading && bookings.length === 0 && <p>No bookings yet</p>}

      {!loading &&
        bookings.map(b => (
          <div key={b.id} className="list-item">
            <div>
              {/* ✅ FIXED HERE */}
              <strong>{b.date} — {b.slot}</strong>

              <div className="list-meta">{b.purpose}</div>

              <a href={b.meet_link} target="_blank" rel="noreferrer">
                Join Meet
              </a>
            </div>

            <button className="danger" onClick={() => cancel(b.id)}>
              Cancel
            </button>
          </div>
        ))}
    </div>
  )
}
