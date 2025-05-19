import { $authHost, $host } from '.' // Импортируйте $authHost и $host
import { jwtDecode } from 'jwt-decode'

export const registration = async (email, password) => {
  const { data } = await $host.post('/api/user/registration', {
    email,
    password,
    role: 'User',
  })
  localStorage.setItem('token', data.token)
  return jwtDecode(data.token) // Декодируем и возвращаем данные
}

export const login = async (email, password) => {
  const { data } = await $host.post('/api/user/login', { email, password }) // Исправьте на правильный путь
  localStorage.setItem('token', data.token)
  return jwtDecode(data.token) // Декодируем и возвращаем данные
}

export const check = async () => {
  try {
    const { data } = await $authHost.get('/api/user/auth')
    localStorage.setItem('token', data.token)
    const decodedUser = jwtDecode(data.token)
    
    // Store user role in localStorage for easy access
    localStorage.setItem('userRole', decodedUser.role)
    
    return decodedUser
  } catch (error) {
    // Clear token if authentication fails
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
    throw error
  }
}

// Simple function to check if current user is admin
export const checkRole = (requiredRole) => {
  const token = localStorage.getItem('token')
  if (!token) return false
  
  try {
    const decoded = jwtDecode(token)
    return decoded.role === requiredRole
  } catch (e) {
    console.error('Error decoding token:', e)
    return false
  }
}