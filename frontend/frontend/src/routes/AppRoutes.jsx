console.log('🔥 AppRoutes mounted', window.location.pathname)

import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from '../pages/Landing'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Me from '../pages/auth/Me'
import UserDashboard from '../pages/user/UserDashboard'
import AdminDashboard from '../pages/admin/AdminDashboard'
import ProtectedRoute from '../components/ProtectedRoute'

export default function AppRoutes() {
  return (
    <Routes>
      {/* 🌍 LANDING — NEVER REDIRECT */}
      <Route path="/" element={<Landing />} />
      

      {/* 🔐 AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 👤 PROFILE */}
      <Route
        path="/me"
        element={
          <ProtectedRoute>
            <Me />
          </ProtectedRoute>
        }
      />

      {/* 👥 USER DASHBOARD */}
      <Route
        path="/dashboard/user/*"
        element={
          <ProtectedRoute role="USER">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* 🛠 ADMIN DASHBOARD */}
      <Route
        path="/dashboard/admin/*"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* ❌ FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
