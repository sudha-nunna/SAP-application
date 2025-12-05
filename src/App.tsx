import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './components/cart-context'
import { ThemeProvider } from './components/theme-provider'
import { Navbar } from './components/navbar'
import { Footer } from './components/footer'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import WishlistPage from './pages/WishlistPage'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="shopflow-ui-theme">
        <CartProvider>
          <div className="font-sans antialiased min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App

