import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { Toaster } from 'react-hot-toast'
import './styles/styles.css'
import './styles/global.css'
import './styles/card.css'
import './styles/buttons.css'
import './styles/forms.css'
import './styles/navbar.css'
import './styles/slots.css'
import './styles/list.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position="top-right" />
    </BrowserRouter>
  </React.StrictMode>
)

