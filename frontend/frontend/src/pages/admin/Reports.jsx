import api from '../../api/axios'
import toast from 'react-hot-toast'

export default function Reports() {
  const download = async (type) => {
    const t = toast.loading('Downloading...')

    try {
      // ✅ FIXED ENDPOINTS
      const res = await api.get(`/reports/${type}`, {
        responseType: 'blob',
      })

      const blob = new Blob([res.data])
      const url = window.URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = `bookings.${type === 'csv' ? 'csv' : 'xlsx'}`
      document.body.appendChild(a)
      a.click()
      a.remove()

      toast.success('Download complete', { id: t })
    } catch (err) {
      console.error(err)
      toast.error('Download failed', { id: t })
    }
  }

  return (
    <div className="card">
      <h3>Reports</h3>

      <button className="primary" onClick={() => download('csv')}>
        Download CSV
      </button>

      <button className="secondary" onClick={() => download('excel')}>
        Download Excel
      </button>
    </div>
  )
}
