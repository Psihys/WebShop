import React, { useContext } from 'react'
import { checkRole } from '../http/userAPI.js'
import { Routes, Route, Navigate } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes.js'
import { Context } from '../index.js'
import Admin from '../pages/Admin.js'
import { ADMIN_ROUTE } from '../utils/consts.js'

const AppRouter = () => {
  const { user } = useContext(Context)

  console.log('Current user:', user)
  console.log('User role:', user.user?.role)
  console.log('Is admin?', user.user?.role === 'ADMIN')

  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route
        path={ADMIN_ROUTE}
        element={
          user.isAuth &&
          user.user?.role &&
          user.user.role.toUpperCase() === 'ADMIN' ? (
            <Admin />
          ) : (
            <Navigate to='/' replace />
          )
        }
      />

      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}

export default AppRouter
