import React, { useEffect, useState } from 'react';
import { fetchBasket, removeFromBasket, clearBasket } from '../services/basketAPI';

const BasketPage = ({ user }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchBasket(user.id).then(data => setItems(data));
    }, [user.id]);

    const handleRemove = async (deviceId) => {
        await removeFromBasket(user.id, deviceId);
        setItems(items.filter(i => i.deviceId !== deviceId));
    };

    const handleClear = async () => {
        await clearBasket(user.id);
        setItems([]);
    };

    return (
        <div>
            <h2>Корзина</h2>
            {items.length === 0 && <p>Корзина пуста</p>}
            <ul>
                {items.map(({ id, device }) => (
                    <li key={id}>
                        <img src={process.env.REACT_APP_API_URL + device.img} width={100} alt="" />
                        <span>{device.name} — {device.price} грн</span>
                        <button onClick={() => handleRemove(device.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
            {items.length > 0 && (
                <div>
                    <button onClick={handleClear}>Очистить корзину</button>
                </div>
            )}
        </div>
    );
};

export default BasketPage;
