import { useEffect, useState } from 'react'
import api from '../../api/axios'
import toast from 'react-hot-toast'

export default function CancelBooking() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [cancelingId, setCancelingId] = useState(null)

  const load = async () => {
    try {
      setLoading(true)
      const res = await api.get('/bookings/my')
      setBookings(res.data || [])
    } catch {
      toast.error('Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const cancel = async (id) => {
    try {
      setCancelingId(id)
      await api.delete(`/bookings/${id}`)
      toast.success('Booking cancelled')

      // 🔥 instant UI update (no flicker)
      setBookings(prev => prev.filter(b => b.id !== id))
    } catch {
      toast.error('Cancel failed')
    } finally {
      setCancelingId(null)
    }
  }

  return (
    <div className="card">
      <h3>Cancel Booking</h3>

      {loading && <p>Loading bookings...</p>}

      {!loading && bookings.length === 0 && <p>No bookings</p>}

      {!loading &&
        bookings.map(b => (
          <div key={b.id}>
            <p>
              {b.date} — {b.slot}
            </p>

            <button
              style={{ background: '#ef4444' }}
              disabled={cancelingId === b.id}
              onClick={() => cancel(b.id)}
            >
              {cancelingId === b.id ? 'Cancelling...' : 'Cancel'}
            </button>

            <hr />
          </div>
        ))}
    </div>
  )
}
