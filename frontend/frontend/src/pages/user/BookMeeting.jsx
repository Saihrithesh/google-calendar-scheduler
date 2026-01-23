import { useState } from 'react'
import api from '../../api/axios'
import toast from 'react-hot-toast'

export default function BookMeeting() {
  const [date, setDate] = useState('')
  const [slots, setSlots] = useState([])
  const [selected, setSelected] = useState(null)
  const [purpose, setPurpose] = useState('')
  const [availabilityId, setAvailabilityId] = useState(null)
  const [loading, setLoading] = useState(false)

  const checkAvailability = async () => {
    if (!date) {
      toast.error('Select a date first')
      return
    }

    try {
      setLoading(true)
      setSelected(null)
      setSlots([])
      setAvailabilityId(null)

      const res = await api.get(`/availability/check?date=${date}`)

      setAvailabilityId(res.data.availability_id)
      setSlots(res.data.slots || [])

      if (!res.data.slots || res.data.slots.length === 0) {
        toast('No slots available for this date')
      }
    } catch (err) {
      toast.error('Failed to fetch slots',err)
    } finally {
      setLoading(false)
    }
  }

  const book = async () => {
    if (!availabilityId) {
      toast.error('Check availability first')
      return
    }

    if (!selected) {
      toast.error('Select a slot')
      return
    }

    try {
      const res = await api.post(
        `/bookings?availability_id=${availabilityId}&slot=${selected}&purpose=${purpose}`
      )

      toast.success('Meeting booked 🎉')

      if (res.data?.meet_link) {
        window.open(res.data.meet_link, '_blank')
      }

      // reset after booking
      setSelected(null)
      setPurpose('')
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Booking failed')
    }
  }

  return (
    <div className="card">
      <h3>Book Meeting</h3>

      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={e => {
            setDate(e.target.value)
            setSlots([])
            setSelected(null)
            setAvailabilityId(null)
          }}
        />
      </div>

      <button className="primary" onClick={checkAvailability} disabled={loading}>
        {loading ? 'Checking...' : 'Check Availability'}
      </button>

      <div className="slots-grid">
        {slots.length === 0 && !loading && (
          <p>No slots available</p>
        )}

        {slots.map(s => (
          <div
            key={s}
            className={`slot ${selected === s ? 'selected' : ''}`}
            onClick={() => setSelected(s)}
          >
            {s}
          </div>
        ))}
      </div>

      {selected && (
        <>
          <div className="form-group">
            <label>Purpose</label>
            <input
              value={purpose}
              onChange={e => setPurpose(e.target.value)}
              placeholder="Meeting purpose"
            />
          </div>

          <button className="primary" onClick={book}>
            Book Meeting
          </button>
        </>
      )}
    </div>
  )
}
