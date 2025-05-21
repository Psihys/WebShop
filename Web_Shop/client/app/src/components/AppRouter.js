// In AppRouter.js
import React, { useContext, useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { publicRoutes } from '../routes.js'
import { Context } from '../index.js'
import Admin from '../pages/Admin.js'
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE } from '../utils/consts.js'
import Basket from '../pages/Basket.js'

const AppRouter = () => {
  const { user } = useContext(Context)
  const [hasToken, setHasToken] = useState(false)
  
  useEffect(() => {
    // Check if token exists and update state
    const token = localStorage.getItem('token')
    console.log('Token in localStorage:', token)
    setHasToken(token !== null)
  }, [])
  
  console.log('Has token:', hasToken)
  console.log('User auth state:', user.isAuth)
  
  return (
    <Routes>
      {/* Public routes - for all users */}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      
      {/* Protected routes - only for authenticated users */}
      <Route
        path={BASKET_ROUTE}
        element={
          hasToken ? (
            <Basket />
          ) : (
            <Navigate to={LOGIN_ROUTE} replace />
          )
        }
      />
      
      {/* Admin route - only for admin users */}
      <Route
        path={ADMIN_ROUTE}
        element={
          hasToken && user.user?.role === 'ADMIN' ? (
            <Admin />
          ) : (
            <Navigate to='/' replace />
          )
        }
      />
      
      {/* Catch-all route - redirect to home */}
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}

export default AppRouter
