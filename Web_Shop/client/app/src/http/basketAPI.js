import { $authHost, $host } from '.' 

export const fetchBasket = async (userId) => {
    const { data } = await $host.get(`/api/basket/${userId}`);
    return data;
};

export const addToBasket = async (userId, deviceId) => {
    const { data } = await $host.post('/api/basket', { userId, deviceId });
    return data;
};

export const removeFromBasket = async (userId, deviceId) => {
    const { data } = await $host.delete('/api/basket', { data: { userId, deviceId } });
    return data;
};

export const clearBasket = async (userId) => {
    const { data } = await $host.delete(`/api/basket/clear/${userId}`);
    return data;
};
