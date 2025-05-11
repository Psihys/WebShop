import { $authHost, $host } from '.' // Импортируйте $authHost и $host
import { jwtDecode } from 'jwt-decode'

export const registration = async (email, password) => {
  const { data } = await $host.post('/api/user/registration', {
    email,
    password,
    role: 'ADMIN',
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
  const { data } = await $authHost.get('/api/user/auth')
  localStorage.setItem('token', data.token)
  return jwtDecode(data.token)
}
