import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './reduxs/store.js'
import { CartProvider } from './context/CartContext.jsx'
const storedUser = JSON.parse(localStorage.getItem('user'));
const userId = storedUser?.id || 'guest';
createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <Provider store={store}>

      <CartProvider userId={userId}>
        <App />
      </CartProvider>
    </Provider>
  </React.StrictMode>
)
