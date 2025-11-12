import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css' // Your Tailwind styles
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Router'
import AuthProvider from './providers/AuthProvider'
import ThemeProvider from './providers/ThemeProvider'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <ThemeProvider>  
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>  
    </AuthProvider>
  </React.StrictMode>,
)