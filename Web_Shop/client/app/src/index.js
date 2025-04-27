import React from 'react'
import ReactDOM from 'react-dom/client'
import { createContext } from 'react'
import App from './App'
import UserStore from './store/UserStore'
import ProductStore from './store/ProductStore'

export const Context = React.createContext(null) // Контекст
export const ContextProduct = React.createContext(null) // Контекст для продуктов

const root = ReactDOM.createRoot(document.getElementById('root'))

const userStore = new UserStore() // Создаем инстанс класса UserStore
const productStore = new ProductStore() // Создаем инстанс класса ProductStore
root.render(
  <Context.Provider value={{ user: userStore }}>
    <ContextProduct.Provider value={{ product: productStore }}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ContextProduct.Provider>
  </Context.Provider>
)
