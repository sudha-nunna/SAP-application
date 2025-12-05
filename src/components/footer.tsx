import { ShoppingBag, Github, Twitter, Linkedin } from "lucide-react"
import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">ShopFlow</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              Discover amazing products from around the world. Your one-stop shop for quality items at great prices.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Connect</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} ShopFlow. Built with React + Vite & FakeStoreAPI.
          </p>
        </div>
      </div>
    </footer>
  )
}

