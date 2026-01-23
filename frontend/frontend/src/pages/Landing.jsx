import { Link, Navigate } from 'react-router-dom'
import { getUserFromToken } from '../utils/auth'
import '../styles/styles.css'
import '../styles/buttons.css'
import '../styles/card.css'

export default function Landing() {
  const user = getUserFromToken()

  // 🔥 AUTO REDIRECT IF LOGGED IN
  if (user) {
    return (
      <Navigate
        to={user.role === 'ADMIN'
          ? '/dashboard/admin'
          : '/dashboard/user'}
        replace
      />
    )
  }

  return (
    <div className="landing-v2">
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />

      <section className="hero">
        <span className="hero-badge">🚀 Smart Scheduling</span>

        <h1 className="hero-title">
          Schedule Meetings <br />
          <span>Without the Back-and-Forth</span>
        </h1>

        <p className="hero-subtitle">
          Real-time availability, automatic Google Meet links,
          and admin-level control — all in one place.
        </p>

        <div className="hero-actions">
          <Link to="/register" className="btn primary large">
            Get Started Free
          </Link>

          <Link to="/login" className="btn ghost large">
            Login
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="glass-card">
          <h3>⚡ Instant Slot Detection</h3>
          <p>Automatically generates valid 30-minute slots.</p>
        </div>

        <div className="glass-card">
          <h3>📅 Google Meet Automation</h3>
          <p>Meetings created directly in Google Calendar.</p>
        </div>

        <div className="glass-card">
          <h3>📈 Admin Analytics</h3>
          <p>Export booking data as CSV or Excel.</p>
        </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Calendar Scheduler</p>
      </footer>
    </div>
  )
}
