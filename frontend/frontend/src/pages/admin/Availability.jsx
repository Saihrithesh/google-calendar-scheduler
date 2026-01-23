import { useState } from 'react'
import api from '../../api/axios'

export default function Availability() {
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const createAvailability = async (e) => {
    e.preventDefault()

    setError(null)
    setSuccess(null)

    if (!date || !startTime || !endTime) {
      setError('All fields are required')
      return
    }

    if (startTime >= endTime) {
      setError('Start time must be before end time')
      return
    }

    try {
      await api.post(
        `/availability/?date=${date}&start_time=${startTime}&end_time=${endTime}`
      )

      setSuccess('Availability created successfully ✅')
      setDate('')
      setStartTime('')
      setEndTime('')
    } catch (err) {
      console.error(err.response?.data)
      setError('Failed to create availability')
    }
  }

  return (
    <div className="card">
      <h3>Create Availability</h3>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={createAvailability}>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />

        <label>Start Time</label>
        <input
          type="time"
          value={startTime}
          onChange={e => setStartTime(e.target.value)}
        />

        <label>End Time</label>
        <input
          type="time"
          value={endTime}
          onChange={e => setEndTime(e.target.value)}
        />

        <button type="submit">Create Availability</button>
      </form>
    </div>
  )
}
