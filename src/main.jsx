import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css' // Tailwind CSS styles
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Router' // Your router file
import AuthProvider from './providers/AuthProvider' // Import AuthProvider
// Import React Toastify (for alerts)
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap your router with the provider */}
      <RouterProvider router={router} />
      <Toaster /> {/* Add Toaster for alerts */}
    </AuthProvider>
  </React.StrictMode>,
)