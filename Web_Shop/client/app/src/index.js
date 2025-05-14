import React from 'react'
import ReactDOM from 'react-dom/client'
import { createContext } from 'react'
import App from './App'
import UserStore from './store/UserStore'
import ProductStore from './store/ProductStore'
import BasketStore from './store/BasketStore'



export const Context = React.createContext(null) // Контекст
export const ContextProduct = React.createContext(null) // Контекст для продуктов
export const ContextBasket = React.createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'))

const userStore = new UserStore() // Создаем инстанс класса UserStore
const productStore = new ProductStore() // Создаем инстанс класса ProductStore
const basketStore = new BasketStore()

console.log(process.env.REACT_APP_API_URL);

root.render(
  <Context.Provider value={{ user: userStore }}>
    <ContextProduct.Provider value={{ product: productStore }}>
      <ContextBasket.Provider value={{ basket: basketStore }}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
      </ContextBasket.Provider>
    </ContextProduct.Provider>
  </Context.Provider>
)
