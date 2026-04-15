import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Layouts
import MainLayout from './layouts/MainLayout'
import ScrollToTop from './components/ScrollToTop'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import ProductDetails from './pages/ProductDetails'
import Support from './pages/Support'
import AddressBook from './pages/AddressBook'

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="cart" element={<Cart />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders" element={<Orders />} />
            <Route path="support" element={<Support />} />
            <Route path="addresses" element={<AddressBook />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  )
}

export default App
