import React, { createContext, useContext, useEffect, useState } from "react"
import type { Product } from "@/lib/api"

type CartContextType = {
  cart: Product[]
  wishlist: Product[]
  addToCart: (p: Product) => void
  removeFromCart: (id: number) => void
  addToWishlist: (p: Product) => void
  removeFromWishlist: (id: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_KEY = "shopflow_cart_v1"
const WISHLIST_KEY = "shopflow_wishlist_v1"

// Helper function to load from localStorage safely
const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") return defaultValue
  try {
    const raw = localStorage.getItem(key)
    if (raw) {
      return JSON.parse(raw) as T
    }
  } catch (e) {
    console.error(`Error loading ${key} from localStorage:`, e)
  }
  return defaultValue
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Initialize state directly from localStorage
  const [cart, setCart] = useState<Product[]>(() => loadFromStorage(CART_KEY, []))
  const [wishlist, setWishlist] = useState<Product[]>(() => loadFromStorage(WISHLIST_KEY, []))

  // Listen for storage changes (e.g., from other tabs)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CART_KEY && e.newValue) {
        try {
          setCart(JSON.parse(e.newValue))
        } catch (err) {
          console.error("Error parsing cart from storage event:", err)
        }
      }
      if (e.key === WISHLIST_KEY && e.newValue) {
        try {
          setWishlist(JSON.parse(e.newValue))
        } catch (err) {
          console.error("Error parsing wishlist from storage event:", err)
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  // persist cart to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart))
      } catch (e) {
        console.error("Error saving cart to localStorage:", e)
      }
    }
  }, [cart])

  // persist wishlist to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))
      } catch (e) {
        console.error("Error saving wishlist to localStorage:", e)
      }
    }
  }, [wishlist])

  const addToCart = (p: Product) => {
    setCart((prev) => {
      if (prev.find((x) => x.id === p.id)) return prev
      return [...prev, p]
    })
  }

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id))
  }

  const addToWishlist = (p: Product) => {
    setWishlist((prev) => {
      if (prev.find((x) => x.id === p.id)) return prev
      return [...prev, p]
    })
  }

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <CartContext.Provider
      value={{ cart, wishlist, addToCart, removeFromCart, addToWishlist, removeFromWishlist }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return {
    cart: ctx.cart,
    addToCart: ctx.addToCart,
    removeFromCart: ctx.removeFromCart,
  }
}

export function useWishlist() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useWishlist must be used within CartProvider")
  return {
    wishlist: ctx.wishlist,
    addToWishlist: ctx.addToWishlist,
    removeFromWishlist: ctx.removeFromWishlist,
  }
}

export default CartContext

