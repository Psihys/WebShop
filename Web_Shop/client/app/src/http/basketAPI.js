import { $authHost, $host } from '.' 

export const fetchBasket = async () => {
    const { data } = await $authHost.get('/api/basket');
    return data;
};

export const addToBasket = async (deviceId) => {
    const { data } = await $authHost.post('/api/basket', { deviceId: Number(deviceId) });
    return data;
};

export const removeFromBasket = async (deviceId) => {
    const { data } = await $authHost.delete(`/api/basket/remove/${deviceId}`);
    return data;
};

export const clearBasket = async () => {
    const { data } = await $authHost.delete('/api/basket/clear');
    return data;
};

export const updateBasketQuantity = async (deviceId, quantity) => {
  const { data } = await $authHost.put(`/api/basket/quantity/${deviceId}`, { quantity });
  return data;
};
