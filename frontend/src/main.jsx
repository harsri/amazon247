import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { AddressProvider } from './context/AddressContext'

import App from './App.jsx'
import './index.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <AddressProvider>
            <App />
          </AddressProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
