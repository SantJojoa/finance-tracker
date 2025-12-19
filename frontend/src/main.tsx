
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext.tsx'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Login from './pages/Login.tsx'
import Layout from './components/layout/Layout.tsx'
import LandingPage from './pages/LandingPage.tsx'
import Register from './pages/Register.tsx'
import AboutPage from './pages/About.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Transactions from './pages/Transactions.tsx'
import Categories from './pages/Cateogories.tsx'
import PaymentMethods from './pages/PaymentMethods.tsx'
import AdminPage from './pages/Admin.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<AboutPage />} />
            {/* Aquí irán las demás rutas */}

            <Route
              path='/dashboard'
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
            </Route>
            <Route
              path='/transactions'
              element={
                <ProtectedRoute>
                  <Transactions />
                </ProtectedRoute>
              }
            >
            </Route>

            <Route
              path='/categories'
              element={
                <ProtectedRoute>
                  <Categories />
                </ProtectedRoute>
              }
            >

            </Route>
            <Route
              path='/payment-methods'
              element={
                <ProtectedRoute>
                  <PaymentMethods />
                </ProtectedRoute>
              }
            >
            </Route>
            <Route
              path='/admin'
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            >
            </Route>

          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
