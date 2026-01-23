import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import BookMeeting from './BookMeeting'
import MyBookings from './MyBookings'
import CancelBooking from './CancelBooking'

export default function UserDashboard() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* default */}
        <Route index element={<Navigate to="book" replace />} />

        {/* 🔥 RELATIVE PATHS ONLY */}
        <Route path="book" element={<BookMeeting />} />
        <Route path="my-bookings" element={<MyBookings />} />
        <Route path="cancel" element={<CancelBooking />} />
      </Routes>
    </>
  )
}
