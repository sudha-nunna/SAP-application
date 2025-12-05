import { Link, useLocation } from "react-router-dom"
import { ShoppingBag, Home, Package, Menu, X, Heart, Moon, Sun } from "lucide-react"
import { useState } from "react"
import { useCart, useWishlist } from "@/components/cart-context"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  
  // Get the actual applied theme (light/dark)
  const getActualTheme = () => {
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
    return theme
  }
  
  const actualTheme = getActualTheme()
  
  const toggleTheme = () => {
    const current = getActualTheme()
    setTheme(current === "light" ? "dark" : "light")
  }
  
  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Products", icon: Package },
    { href: "/cart", label: "Cart", icon: ShoppingBag },
    { href: "/wishlist", label: "Wishlist", icon: Heart },
  ]
  const { cart } = useCart()
  const { wishlist } = useWishlist()
  const cartCount = cart.length
  const wishlistCount = wishlist.length

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-primary text-primary-foreground group-hover:scale-105 transition-transform">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">ShopFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = location.pathname === link.href || (link.href === "/products" && location.pathname.startsWith("/products"))
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                  )}
                >
                  <div className="relative flex items-center gap-2">
                        <Icon className={cn(
                          "h-4 w-4",
                          link.href === "/wishlist" && wishlistCount > 0 ? "text-rose-600 fill-rose-600" : "",
                        )} />
                    {link.label}
                    {link.href === "/cart" && cartCount > 0 && (
                      <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs rounded-full bg-amber-500 text-white">
                        {cartCount}
                      </span>
                    )}
                    {link.href === "/wishlist" && wishlistCount > 0 && (
                      <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs rounded-full bg-amber-500 text-white">
                        {wishlistCount}
                      </span>
                    )}
                  </div>
                </Link>
              )
            })}
            
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="ml-2"
              aria-label="Toggle theme"
            >
              {actualTheme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {actualTheme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon
                const isActive =
                  location.pathname === link.href || (link.href === "/products" && location.pathname.startsWith("/products"))
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                    )}
                  >
                    <div className="relative flex items-center gap-3">
                      <Icon className={cn(
                        "h-5 w-5",
                        link.href === "/wishlist" && wishlistCount > 0 ? "text-rose-600 fill-rose-600" : "",
                      )} />
                        {link.label}
                      {link.href === "/cart" && cartCount > 0 && (
                        <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs rounded-full bg-destructive text-destructive-foreground">
                          {cartCount}
                        </span>
                      )}
                      {link.href === "/wishlist" && wishlistCount > 0 && (
                        <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs rounded-full bg-amber-500 text-white">
                          {wishlistCount}
                        </span>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

