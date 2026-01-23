import { Link, useNavigate } from 'react-router-dom'
import { logout, getUserFromToken } from '../utils/auth'

export default function Navbar() {
  const navigate = useNavigate()
  const user = getUserFromToken()

  const role = user?.role  // already normalized to ADMIN / USER

  const doLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <h2>Scheduler</h2>

      <div className="nav-links">
        {role === 'USER' && (
          <>
            <Link to="/dashboard/user/book">Book</Link>
            <Link to="/dashboard/user/my-bookings">My Bookings</Link>
            <Link to="/dashboard/user/cancel">Cancel Booking</Link>
          </>
        )}

        {role === 'ADMIN' && (
          <>
            <Link to="/dashboard/admin/availability">Availability</Link>
            <Link to="/dashboard/admin/reports">Reports</Link>
          </>
        )}

        <button className="secondary" onClick={doLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
