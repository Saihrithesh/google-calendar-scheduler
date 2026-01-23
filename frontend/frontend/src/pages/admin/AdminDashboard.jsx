import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Availability from './Availability'
import Reports from './Reports'

export default function AdminDashboard() {
  return (
    <>
      <Navbar role="ADMIN" />

      <Routes>
        {/* 👈 DEFAULT ADMIN PAGE */}
        <Route index element={<Navigate to="availability" replace />} />

        
        <Route path="availability" element={<Availability />} />
        <Route path="reports" element={<Reports />} />
      </Routes>
    </>
  )
}
