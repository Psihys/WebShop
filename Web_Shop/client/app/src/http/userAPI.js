import { $authHost, $host } from "."; // Импортируйте $authHost и $host
import { jwtDecode } from "jwt-decode";

export const registration = async (email, password) => {
  const { data } = await $host.post('/api/user/registration', { email, password, role: 'ADMIN' });
  return jwtDecode(data.token); // Декодируем и возвращаем данные
}

export const login = async (email, password) => {
    const { data } = await $host.post('/api/user/login', { email, password }) // Исправьте на правильный путь
    return jwtDecode(data.token); // Декодируем и возвращаем данные
}

export const check = async () => {
    const response = await $authHost.get('/api/auth/check');
    return response.data;
}
